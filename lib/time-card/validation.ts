import { z } from "zod";

export const loginSchema = z.object({
  loginIdentifier: z.string().trim().min(1).max(80).transform((value) => value.toLowerCase()),
  pin: z.string().regex(/^\d{4}$/),
});

export const manualPunchSchema = z
  .object({
    employeeId: z.string().uuid(),
    clockIn: z.coerce.date(),
    clockOut: z.coerce.date(),
    reason: z.string().trim().min(3).max(500),
  })
  .refine((value) => value.clockOut >= value.clockIn, {
    message: "Clock out cannot precede clock in.",
    path: ["clockOut"],
  });

export const paidHolidaySchema = z.object({
  employeeIds: z.array(z.string().uuid()).min(1),
  payrollDate: z.iso.date(),
  minutes: z.number().int().positive().max(24 * 60),
  note: z.string().trim().min(2).max(200),
  reason: z.string().trim().min(3).max(500),
});

export const adjustmentSchema = z.object({
  employeeId: z.string().uuid(),
  payrollDate: z.iso.date(),
  minutes: z.number().int().refine((value) => value !== 0),
  reason: z.string().trim().min(3).max(500),
});
