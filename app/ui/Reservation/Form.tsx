"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/app/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Card } from "../Card";

type Inputs = {
  from: string;
  to: string;
};

type ReservationFormProps = {
  date: Date;
};

async function mutationFn(data: {
  from: string;
  to: string;
  date: Date;
  id: string;
}) {
  const { id, from, to, date } = data;
  const resultJson = await fetch(`/api/v1/user/${id}`, {
    method: "POST",
    body: JSON.stringify({ date, from, to }),
  });
  const result = await resultJson.json();
  return result;
}

export function ReservationForm({ date }: ReservationFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const { data: session } = useSession();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["userReserve"],
    mutationFn,
  });

  const onReserve: SubmitHandler<Inputs> = async formData => {
    const { from, to } = formData;
    if (session?.token.id)
      await mutateAsync({ date, from, to, id: session.token.id });
  };
  return (
    <div className="mt-6">
      <Card>
        <Card.Title>Your Reservatoin</Card.Title>
        <Card.Body>
          <form onSubmit={handleSubmit(onReserve)} className="flex">
            <div>name: {session?.user?.name}</div>
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
            <div>
              <Button type="submit">
                {isPending ? "Loading..." : "Reserve"}
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
