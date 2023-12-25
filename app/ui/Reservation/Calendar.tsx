"use client";

import Calendar from "react-calendar";
import { useQuery, useMutation } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import { Card } from "@/app/ui/Card";
import { ReservationForm } from "@/app/ui/Reservation/Form";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

async function getReservation() {
  const dataJson = await fetch("/api/v1/reservation");
  const data = await dataJson.json();
  return data;
}

async function mutationFn(body: { date: Value }) {
  const resultJson = await fetch("/api/v1/reservation", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const result = await resultJson.json();
  console.log(result);
  return result;
}

export function ReserveCalendar() {
  const [date, setDate] = useState<Value>(new Date());
  const [data, setData] = useState<unknown[]>([]);
  const reservations = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservation(),
  });
  console.log(reservations);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["dayReservations"],
    mutationFn,
  });

  const onChangeHandler = async (selectedDate: Value) => {
    setDate(selectedDate);
    const res = await mutateAsync({ date: selectedDate });
    setData(res);
    console.log(res);
  };

  const cardContent = useCallback(() => {
    if (isPending) {
      return <div> Loading </div>;
    }
    if (!isPending && data && !data.length) {
      return <div>There is not any reservation at this date</div>;
    }
    return <div> reservation came here</div>;
  }, [isPending, data]);

  console.log(isPending);
  console.log(data);
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <Card>
          <Card.Title>Calendar</Card.Title>
          <Card.Body>
            <Calendar value={date} onChange={onChangeHandler} />
          </Card.Body>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <Card.Title>
            Reservation{" "}
            {data !== undefined && (
              <span>at {format(new Date(`${date}`), "yyyy-MM-ddd")}</span>
            )}
          </Card.Title>
          <Card.Body>{cardContent()}</Card.Body>
        </Card>
        <ReservationForm date={date as unknown as Date} />
      </div>
    </div>
  );
}
