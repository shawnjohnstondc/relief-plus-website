"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authenticate } from "@/lib/time-card/auth";
import { currentPayPeriod, chicagoLocalDateTimeToInstant, dollarsToCents, hoursToMinutes, payPeriodForDate } from "@/lib/time-card/payroll";
import { addManualPunch, addPaidHolidayForEmployees, addPaidTime, adminClockEmployee, clockIn, clockOut, correctPunch, setEmployeePayRate, voidPunch } from "@/lib/time-card/repository";
import { requireRole } from "@/lib/time-card/security";
import { getSession, revokeCurrentSession } from "@/lib/time-card/session";
import { adjustmentSchema, adminClockSchema, correctionSchema, loginSchema, manualPunchSchema, paidHolidaySchema, payRateSchema, periodSchema, voidEntrySchema } from "@/lib/time-card/validation";

function messageUrl(path: string, type: "error" | "success", message: string) {
  return `${path}?${type}=${encodeURIComponent(message)}`;
}

function localDateTime(value: FormDataEntryValue | null) {
  try { return chicagoLocalDateTimeToInstant(String(value)); }
  catch { return new Date(Number.NaN); }
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({ loginIdentifier: formData.get("loginIdentifier"), pin: formData.get("pin") });
  if (!parsed.success) redirect(messageUrl("/time-card", "error", "Select your name and enter a four-digit PIN."));
  const result = await authenticate(parsed.data.loginIdentifier, parsed.data.pin);
  if (!result.ok) redirect(messageUrl("/time-card", "error", result.message));
  redirect(result.role === "ADMIN" ? "/time-card/admin" : "/time-card");
}

export async function logoutAction() {
  await revokeCurrentSession();
  redirect("/time-card");
}

export async function clockAction(formData: FormData) {
  const session = requireRole(await getSession(), "EMPLOYEE");
  try {
    if (formData.get("intent") === "in") await clockIn(session.userId);
    else await clockOut(session.userId);
  } catch (error) {
    const message = error instanceof Error && /already|open punch/.test(error.message) ? error.message : "The clock could not be updated. Please try again.";
    redirect(messageUrl("/time-card", "error", message));
  }
  revalidatePath("/time-card");
  redirect(messageUrl("/time-card", "success", `Clock ${formData.get("intent") === "in" ? "in" : "out"} recorded.`));
}

async function adminSession() {
  return requireRole(await getSession(), "ADMIN");
}

function adminRedirect(period: string, type: "error" | "success", message: string, employeeId?: string): never {
  const params = new URLSearchParams({ period, [type]: message });
  if (employeeId) params.set("employee", employeeId);
  redirect(`/time-card/admin?${params}`);
}

export async function addMissedTimeAction(formData: FormData) {
  const session = await adminSession();
  const period = periodSchema.catch(currentPayPeriod().start).parse(formData.get("period"));
  const employeeId = String(formData.get("employeeId") || "");
  const parsed = manualPunchSchema.safeParse({ employeeId, clockIn: localDateTime(formData.get("clockIn")), clockOut: localDateTime(formData.get("clockOut")), reason: formData.get("reason") });
  if (!parsed.success) adminRedirect(period, "error", "Enter valid clock times and a reason.", employeeId);
  try {
    await addManualPunch({ actorId: session.userId, ...parsed.data });
  } catch { adminRedirect(period, "error", "Unable to add missed time. Confirm the employee and times, then try again.", employeeId); }
  revalidatePath("/time-card/admin");
  adminRedirect(period, "success", "Missed time added and audited.", employeeId);
}

export async function correctPunchAction(formData: FormData) {
  const session = await adminSession();
  const period = periodSchema.catch(currentPayPeriod().start).parse(formData.get("period"));
  const employeeId = String(formData.get("employeeId") || "");
  const parsed = correctionSchema.safeParse({ employeeId, entryId: formData.get("entryId"), clockIn: localDateTime(formData.get("clockIn")), clockOut: localDateTime(formData.get("clockOut")), reason: formData.get("reason") });
  if (!parsed.success) adminRedirect(period, "error", "Enter valid corrected times and a reason.", employeeId);
  try {
    await correctPunch({ actorId: session.userId, ...parsed.data });
  } catch { adminRedirect(period, "error", "Unable to correct that punch. Confirm the entry and try again.", employeeId); }
  revalidatePath("/time-card/admin");
  adminRedirect(period, "success", "Punch corrected and audited.", employeeId);
}

export async function voidPunchAction(formData: FormData) {
  const session = await adminSession();
  const period = periodSchema.catch(currentPayPeriod().start).parse(formData.get("period"));
  const employeeId = String(formData.get("employeeId") || "");
  const parsed = voidEntrySchema.safeParse({ entryId: formData.get("entryId"), reason: formData.get("reason") });
  if (!parsed.success) adminRedirect(period, "error", "A valid punch and reason are required.", employeeId);
  try { await voidPunch({ actorId: session.userId, employeeId, ...parsed.data }); }
  catch { adminRedirect(period, "error", "Unable to void that punch. Confirm the entry and try again.", employeeId); }
  revalidatePath("/time-card/admin");
  adminRedirect(period, "success", "Punch voided and audit history retained.", employeeId);
}

export async function addHolidayAction(formData: FormData) {
  const session = await adminSession();
  const period = periodSchema.catch(currentPayPeriod().start).parse(formData.get("period"));
  const parsed = paidHolidaySchema.safeParse({ employeeIds: formData.getAll("employeeIds"), payrollDate: formData.get("payrollDate"), minutes: Number(formData.get("minutes")), note: formData.get("note"), reason: formData.get("reason") });
  if (!parsed.success) adminRedirect(period, "error", "Enter valid holiday details and select at least one employee.");
  if (parsed.data.payrollDate < period || parsed.data.payrollDate > payPeriodForDate(period).end) adminRedirect(period, "error", "The holiday date must be within the selected pay period.");
  try { await addPaidHolidayForEmployees({ actorId: session.userId, ...parsed.data }); }
  catch { adminRedirect(period, "error", "Unable to add the holiday. It may already exist for one of the selected employees."); }
  revalidatePath("/time-card/admin");
  adminRedirect(period, "success", "Paid holiday added and audited.");
}

export async function addAdjustmentAction(formData: FormData) {
  const session = await adminSession();
  const period = periodSchema.catch(currentPayPeriod().start).parse(formData.get("period"));
  const employeeId = String(formData.get("employeeId") || "");
  let minutes = 0;
  try { minutes = hoursToMinutes(String(formData.get("hours") || "")); } catch { /* validation below */ }
  const parsed = adjustmentSchema.safeParse({ employeeId, payrollDate: formData.get("payrollDate"), minutes, reason: formData.get("reason") });
  if (!parsed.success) adminRedirect(period, "error", "Enter signed hours that convert to whole minutes, a date, and a reason.", employeeId);
  if (parsed.data.payrollDate < period || parsed.data.payrollDate > payPeriodForDate(period).end) adminRedirect(period, "error", "The adjustment date must be within the selected pay period.", employeeId);
  try { await addPaidTime({ actorId: session.userId, employeeId, type: "ADJUSTMENT", payrollDate: parsed.data.payrollDate, minutes: parsed.data.minutes, note: parsed.data.reason, reason: parsed.data.reason }); }
  catch { adminRedirect(period, "error", "Unable to add the adjustment. Confirm the employee and try again.", employeeId); }
  revalidatePath("/time-card/admin");
  adminRedirect(period, "success", "Adjustment added and audited.", employeeId);
}

export async function setPayRateAction(formData: FormData) {
  const session = await adminSession();
  const period = periodSchema.catch(currentPayPeriod().start).parse(formData.get("period"));
  const employeeId = String(formData.get("employeeId") || "");
  let hourlyRateCents = 0;
  try { hourlyRateCents = dollarsToCents(String(formData.get("hourlyRate") || "")); } catch { /* validation below */ }
  const parsed = payRateSchema.safeParse({ employeeId, hourlyRateCents, effectiveDate: formData.get("effectiveDate"), reason: formData.get("reason") });
  if (!parsed.success) adminRedirect(period, "error", "Enter a valid hourly rate, effective date, and reason.", employeeId);
  try { await setEmployeePayRate({ actorId: session.userId, ...parsed.data }); }
  catch { adminRedirect(period, "error", "Unable to save the pay rate. Confirm the employee and try again.", employeeId); }
  revalidatePath("/time-card/admin");
  adminRedirect(period, "success", "Hourly rate saved with effective-date history and audit record.", employeeId);
}

export async function adminClockAction(formData: FormData) {
  const session = await adminSession();
  const period = periodSchema.catch(currentPayPeriod().start).parse(formData.get("period"));
  const employeeId = String(formData.get("employeeId") || "");
  const parsed = adminClockSchema.safeParse({ employeeId, intent: formData.get("intent"), reason: formData.get("reason") || undefined });
  if (!parsed.success) adminRedirect(period, "error", "The administrative clock request was invalid.", employeeId);
  try { await adminClockEmployee({ actorId: session.userId, ...parsed.data }); }
  catch (error) { adminRedirect(period, "error", error instanceof Error ? error.message : "Unable to update the employee clock.", employeeId); }
  revalidatePath("/time-card/admin");
  adminRedirect(period, "success", `Administrative clock ${parsed.data.intent} recorded using server time and audited.`, employeeId);
}
