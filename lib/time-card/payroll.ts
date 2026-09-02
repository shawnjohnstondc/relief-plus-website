import {
  PAY_PERIOD_ANCHOR,
  PAY_PERIOD_LENGTH_DAYS,
  TIME_CARD_TIME_ZONE,
} from "./constants";
import type { PayPeriod, PayrollTotals } from "./types";

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
