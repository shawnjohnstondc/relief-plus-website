import { redirect } from "next/navigation";
import LiveClock from "./LiveClock";
import { clockAction, loginAction, logoutAction } from "./actions";
import { currentPayPeriod, decimalHours, elapsedWholeMinutes, localDateForInstant } from "@/lib/time-card/payroll";
import { employeeEntries, listActiveUsersForLogin, openPunch, paidEntries, totalsFor } from "@/lib/time-card/repository";
import { getSession } from "@/lib/time-card/session";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "long", month: "long", day: "numeric", year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default async function TimeCardPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const session = await getSession();
  const message = await searchParams;
  if (session?.role === "ADMIN") redirect("/time-card/admin");

  if (!session) {
    const users = await listActiveUsersForLogin();
    return <main className="time-card-shell time-card-login">
      <section className="time-card-card time-card-auth-card">
        <div className="time-card-brand"><span>R</span><b>+</b></div>
        <p className="time-card-eyebrow">Relief Plus staff</p>
        <h1>Time Card</h1>
        <p className="time-card-muted">Select your name and enter your four-digit PIN.</p>
        {message.error && <p className="time-card-alert time-card-alert-error" role="alert">{message.error}</p>}
        <form action={loginAction} className="time-card-form">
          <label>Name<select name="loginIdentifier" required defaultValue=""><option value="" disabled>Select your name</option>{users.map((user) => <option key={user.id} value={user.loginIdentifier}>{user.name}</option>)}</select></label>
          <label>Four-digit PIN<input name="pin" type="password" inputMode="numeric" pattern="[0-9]{4}" minLength={4} maxLength={4} autoComplete="current-password" required /></label>
          <button className="time-card-button" type="submit">Sign in</button>
        </form>
        <p className="time-card-security-note">Private staff utility · Authorized access only</p>
      </section>
    </main>;
  }

  const now = new Date();
  const period = currentPayPeriod(now);
  const [entries, paid, activePunch] = await Promise.all([employeeEntries(session.userId, period), paidEntries(session.userId, period), openPunch(session.userId)]);
  const totals = totalsFor(entries, paid);
  const today = localDateForInstant(now);
  const todayMinutes = entries.filter((entry) => localDateForInstant(new Date(entry.clockIn)) === today).reduce((sum, entry) => sum + elapsedWholeMinutes(new Date(entry.clockIn), entry.clockOut ? new Date(entry.clockOut) : now), 0);

  return <main className="time-card-shell">
    <header className="time-card-topbar"><div><p className="time-card-eyebrow">Relief Plus</p><strong>Employee Time Card</strong></div><form action={logoutAction}><button className="time-card-text-button">Sign out</button></form></header>
    <section className="time-card-hero-card">
      <p className="time-card-muted">{dateFormatter.format(now)}</p>
      <h1>Hello, {session.firstName}</h1>
      <div className="time-card-live-clock"><LiveClock /><span>Central Time</span></div>
      <div className={`time-card-status ${activePunch ? "is-in" : "is-out"}`}>{activePunch ? "CLOCKED IN" : "CLOCKED OUT"}</div>
      {activePunch && <p>Since {timeFormatter.format(new Date(activePunch.clockIn))}</p>}
      {message.error && <p className="time-card-alert time-card-alert-error" role="alert">{message.error}</p>}
      {message.success && <p className="time-card-alert time-card-alert-success" role="status">{message.success}</p>}
      <form action={clockAction}><input type="hidden" name="intent" value={activePunch ? "out" : "in"} /><button className={`time-card-clock-button ${activePunch ? "clock-out" : "clock-in"}`}>{activePunch ? "Clock Out" : "Clock In"}</button></form>
      <p className="time-card-security-note">The recorded time comes from the secure server clock.</p>
    </section>
    <section className="time-card-stat-grid"><article className="time-card-card"><span>Today</span><strong>{decimalHours(todayMinutes)}</strong><small>hours including an active shift</small></article><article className="time-card-card"><span>Current pay period</span><strong>{decimalHours(totals.workedMinutes)}</strong><small>completed worked hours</small></article></section>
    <section className="time-card-card"><div className="time-card-section-title"><div><p className="time-card-eyebrow">Recent activity</p><h2>Your punches</h2></div><span>{period.start} – {period.end}</span></div>
      <div className="time-card-activity">{entries.slice(0, 10).map((entry) => <article key={entry.id}><div><strong>{entry.clockOut ? "Completed shift" : "Open shift"}</strong><span>{timeFormatter.format(new Date(entry.clockIn))}{entry.clockOut ? ` – ${timeFormatter.format(new Date(entry.clockOut))}` : ""}</span></div><b>{entry.clockOut ? decimalHours(elapsedWholeMinutes(new Date(entry.clockIn), new Date(entry.clockOut))) : "Active"}</b></article>)}{entries.length === 0 && <p className="time-card-muted">No activity in this pay period yet.</p>}</div>
    </section>
  </main>;
}
