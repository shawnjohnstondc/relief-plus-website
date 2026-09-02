import { payrollCsv } from "@/lib/time-card/csv";
import { currentPayPeriod, payPeriodForDate } from "@/lib/time-card/payroll";
import { adminPayroll } from "@/lib/time-card/repository";
import { requireRole } from "@/lib/time-card/security";
import { getSession } from "@/lib/time-card/session";

export async function GET(request: Request) {
  try { requireRole(await getSession(), "ADMIN"); } catch { return new Response("Unauthorized", { status: 401, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } }); }
  const raw = new URL(request.url).searchParams.get("period");
  let period;
  try { period = raw ? payPeriodForDate(raw) : currentPayPeriod(); } catch { period = currentPayPeriod(); }
  const payroll = await adminPayroll(period);
  const body = payrollCsv(period, payroll.map((row) => ({ name: row.employee.name, totals: row.totals })));
  return new Response(body, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="relief-plus-payroll-${period.start}.csv"`, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
}
