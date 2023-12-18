"use client";

import Calendar from "react-calendar";
import { useQuery, useMutation } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/app/ui/Button";
import { Card } from "./Card";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Inputs = {
  from: string;
  to: string;
};

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
  const [data, setData] = useState<unknown[] | undefined>(undefined);
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

  const cardContent = useCallback(() => {
    if (isPending) {
      return <div> Loading </div>;
    }
    if (!isPending && data === undefined) {
      return <div>Please select a data in calnedar to see reservations</div>;
    }
    if (!isPending && data && !data.length) {
      return <div>There is not any reservation at this date</div>;
    }
    return <div> reservation came here</div>;
  }, [isPending, data]);

  const { register, handleSubmit } = useForm<Inputs>();

  const onReserve: SubmitHandler<Inputs> = formData => {
    console.log("click on reserve");
    console.log(formData);
  };

  console.log(isPending);
  console.log(data);
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <Card>
          <Card.Title>Calendar</Card.Title>
          <Card.Body>
            <Calendar value={value} onChange={onChangeHandler} />
          </Card.Body>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <Card.Title>
            Reservation{" "}
            {data !== undefined && (
              <span>at {format(new Date(`${value}`), "yyyy-MM-ddd")}</span>
            )}
          </Card.Title>
          <Card.Body>{cardContent()}</Card.Body>
        </Card>
        <div className="mt-6">
          <Card>
            <Card.Title>Your Reservatoin</Card.Title>
            <Card.Body>
              <form onSubmit={handleSubmit(onReserve)} className="flex">
                <input
                  placeholder="from"
                  type="text"
                  {...register("from", { required: true })}
                />
                <input
                  placeholder="to"
                  type="text"
                  {...register("to", { required: true })}
                />
                <Button type="submit">Reserve</Button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
