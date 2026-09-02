"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
});

export default function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);
  return <time aria-live="off">{time || "—"}</time>;
}
