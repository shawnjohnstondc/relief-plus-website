"use client";

import { useMemo, useState } from "react";

type DailyHoursEmployee = {
  id: string;
  name: string;
  minutes: number[];
};

type DailyHoursSelectorProps = {
  dates: { date: string; label: string }[];
  employees: DailyHoursEmployee[];
};

function decimalHours(minutes: number) {
  return (minutes / 60).toFixed(2);
}

export function DailyHoursSelector({ dates, employees }: DailyHoursSelectorProps) {
  const [selectedDates, setSelectedDates] = useState(() => new Set(dates.map(({ date }) => date)));
  const selectedTotals = useMemo(
    () => employees.map((employee) => employee.minutes.reduce(
      (total, minutes, index) => selectedDates.has(dates[index].date) ? total + minutes : total,
      0,
    )),
    [dates, employees, selectedDates],
  );

  function toggleDate(date: string) {
    setSelectedDates((current) => {
      const next = new Set(current);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  }

  return <>
    <div className="time-card-day-controls">
      <p aria-live="polite"><strong>{selectedDates.size}</strong> of {dates.length} days selected</p>
      <div>
        <button type="button" onClick={() => setSelectedDates(new Set(dates.map(({ date }) => date)))}>Select all</button>
        <button type="button" onClick={() => setSelectedDates(new Set())}>Clear</button>
      </div>
    </div>
    <div className="time-card-table-scroll"><table>
      <thead><tr><th scope="col">Choose date</th>{employees.map((employee) => <th scope="col" key={employee.id}>{employee.name}</th>)}</tr></thead>
      <tbody>{dates.map(({ date, label }, dateIndex) => {
        const isSelected = selectedDates.has(date);
        return <tr key={date} className={isSelected ? "is-selected" : undefined}>
          <th scope="row"><label className="time-card-day-choice"><input type="checkbox" checked={isSelected} onChange={() => toggleDate(date)}/><time dateTime={date}>{label}</time></label></th>
          {employees.map((employee) => <td key={employee.id}>{decimalHours(employee.minutes[dateIndex] ?? 0)}</td>)}
        </tr>;
      })}</tbody>
      <tfoot><tr><th scope="row">Selected total</th>{employees.map((employee, index) => <td key={employee.id}>{decimalHours(selectedTotals[index])}</td>)}</tr></tfoot>
    </table></div>
  </>;
}
