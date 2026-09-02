import {
  PAY_PERIOD_ANCHOR,
  PAY_PERIOD_LENGTH_DAYS,
  TIME_CARD_TIME_ZONE,
} from "./constants";
import type { EmployeePayRate, GrossPayEstimate, PaidTimeEntry, PayPeriod, PayrollTotals, TimeEntry } from "./types";

const DAY_MS = 86_400_000;

function parseDate(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) throw new Error("Expected an ISO calendar date.");

  const [, year, month, day] = match;
  const timestamp = Date.UTC(Number(year), Number(month) - 1, Number(day));
  const parsed = new Date(timestamp);

  if (
    parsed.getUTCFullYear() !== Number(year) ||
    parsed.getUTCMonth() !== Number(month) - 1 ||
    parsed.getUTCDate() !== Number(day)
  ) {
    throw new Error("Invalid calendar date.");
  }

  return timestamp;
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

export function addCalendarDays(date: string, days: number) {
  return formatDate(parseDate(date) + days * DAY_MS);
}

export function localDateForInstant(
  instant: Date,
  timeZone = TIME_CARD_TIME_ZONE,
) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function payPeriodForDate(
  localDate: string,
  anchor = PAY_PERIOD_ANCHOR,
): PayPeriod {
  const difference = Math.floor((parseDate(localDate) - parseDate(anchor)) / DAY_MS);
  const index = Math.floor(difference / PAY_PERIOD_LENGTH_DAYS);
  const start = addCalendarDays(anchor, index * PAY_PERIOD_LENGTH_DAYS);

  return {
    start,
    end: addCalendarDays(start, PAY_PERIOD_LENGTH_DAYS - 1),
    index,
  };
}

export function shiftPayPeriod(period: PayPeriod, offset: number): PayPeriod {
  return payPeriodForDate(
    addCalendarDays(period.start, offset * PAY_PERIOD_LENGTH_DAYS),
  );
}

export function currentPayPeriod(now = new Date()) {
  return payPeriodForDate(localDateForInstant(now));
}

export function elapsedWholeMinutes(clockIn: Date, clockOut: Date) {
  const milliseconds = clockOut.getTime() - clockIn.getTime();
  if (milliseconds < 0) throw new Error("Clock out cannot precede clock in.");
  return Math.floor(milliseconds / 60_000);
}

export function decimalHours(minutes: number) {
  if (!Number.isInteger(minutes)) throw new Error("Payroll minutes must be integers.");
  return (minutes / 60).toFixed(2);
}

export function dollarsToCents(value: string) {
  const match = /^(\d{1,4})(?:\.(\d{1,2}))?$/.exec(value.trim());
  if (!match) throw new Error("Enter a valid hourly rate with no more than two decimal places.");
  const cents = Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0"));
  if (!Number.isSafeInteger(cents) || cents < 1 || cents > 100_000) throw new Error("Hourly rate is outside the supported range.");
  return cents;
}

export function hoursToMinutes(value: string) {
  if (!/^[+-]?(?:\d+|\d*\.\d+)$/.test(value.trim())) throw new Error("Enter a valid number of hours.");
  const minutes = Number(value) * 60;
  if (!Number.isSafeInteger(minutes) || minutes === 0 || Math.abs(minutes) > 24 * 60) throw new Error("Hours must convert to whole, non-zero minutes within 24 hours.");
  return minutes;
}

export function currencyFromCents(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function rateForDate(rates: EmployeePayRate[], date: string) {
  return rates.filter((rate) => rate.effectiveDate <= date).sort((a, b) => b.effectiveDate.localeCompare(a.effectiveDate))[0];
}

export function estimateGrossPay(entries: TimeEntry[], paid: PaidTimeEntry[], rates: EmployeePayRate[]): GrossPayEstimate {
  let centMinutes = 0;
  const missing = new Set<string>();
  for (const entry of entries) {
    if (!entry.clockOut) continue;
    const start = new Date(entry.clockIn);
    const minutes = elapsedWholeMinutes(start, new Date(entry.clockOut));
    for (let offset = 0; offset < minutes; offset += 1) {
      const date = localDateForInstant(new Date(start.getTime() + offset * 60_000));
      const rate = rateForDate(rates, date);
      if (rate) centMinutes += rate.hourlyRateCents;
      else missing.add(date);
    }
  }
  for (const item of paid) {
    const rate = rateForDate(rates, item.payrollDate);
    if (rate) centMinutes += item.minutes * rate.hourlyRateCents;
    else if (item.minutes) missing.add(item.payrollDate);
  }
  return { cents: missing.size ? null : Math.round(centMinutes / 60), missingRateDates: [...missing].sort() };
}

export function chicagoLocalDateTimeToInstant(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error("Expected a local date and time.");
  const [, year, month, day, hour, minute] = match.map(Number);
  const requestedUtc = Date.UTC(year, month - 1, day, hour, minute);
  let candidate = requestedUtc;
  for (let index = 0; index < 3; index += 1) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_CARD_TIME_ZONE,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date(candidate));
    const values = Object.fromEntries(parts.map((part) => [part.type, Number(part.value)]));
    const representedUtc = Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute);
    candidate += requestedUtc - representedUtc;
  }
  const result = new Date(candidate);
  const verification = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_CARD_TIME_ZONE,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(result);
  const verified = Object.fromEntries(verification.map((part) => [part.type, part.value]));
  if (`${verified.year}-${verified.month}-${verified.day}T${verified.hour}:${verified.minute}` !== value) {
    throw new Error("That local time does not exist because of a daylight-saving transition.");
  }
  return result;
}

export function payrollTotals(
  workedMinutes: number,
  holidayMinutes: number,
  adjustmentMinutes: number,
): PayrollTotals {
  if (![workedMinutes, holidayMinutes, adjustmentMinutes].every(Number.isInteger)) {
    throw new Error("Payroll totals require integer minutes.");
  }

  return {
    workedMinutes,
    holidayMinutes,
    adjustmentMinutes,
    totalPaidMinutes: workedMinutes + holidayMinutes + adjustmentMinutes,
  };
}
