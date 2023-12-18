"use client";

import Calendar from "react-calendar";
import { useQuery, useMutation } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

async function getReservation() {
  const dataJson = await fetch("/api/v1/reservation");
  const data = await dataJson.json();
  return data;
}

async function mutationFn(body: { date: Value }) {
  const restultJson = await fetch("/api/v1/reservation", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const result = await restultJson.json();
  console.log(result);
  return result;
}

export function ReserveCalendar() {
  const reservations = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservation(),
  });
  console.log(reservations);
  const { mutateAsync } = useMutation({
    mutationKey: ["dayReservations"],
    mutationFn,
  });

  const [value, onChange] = useState<Value>(new Date());

  const test = async (date: Value) => {
    onChange(date);
    const res = await mutateAsync({ date });
    console.log(res);
  };
  return (
    <div>
      <Calendar value={value} onChange={test} />
    </div>
  );
}
