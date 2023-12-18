"use client";

import Calendar from "react-calendar";
import { useQuery, useMutation } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Card } from "./Card";

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
  const [value, onChange] = useState<Value>(new Date());
  const [data, setData] = useState([]);
  const reservations = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservation(),
  });
  console.log(reservations);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["dayReservations"],
    mutationFn,
  });

  const onChangeHandler = async (date: Value) => {
    onChange(date);
    const res = await mutateAsync({ date });
    setData(res);
    console.log(res);
  };
  console.log(isPending);
  console.log(data);
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <Calendar value={value} onChange={onChangeHandler} />
      </div>
      <div className="col-span-2">
        <Card>
          <Card.Title>Hello</Card.Title>
          <Card.Body>by by</Card.Body>
        </Card>
      </div>
    </div>
  );
}
