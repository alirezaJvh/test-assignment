"use client";

import Calendar from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function ReserveCalendar() {
  async function getReservation() {
    const dataJson = await fetch("/api/v1/reservation");
    const data = await dataJson.json();
    return data;
  }
  const reservations = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservation(),
  });
  console.log(reservations);
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div>
      <Calendar value={value} onChange={onChange} />
    </div>
  );
}
