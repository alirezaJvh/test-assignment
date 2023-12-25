import { prisma } from "@/app/lib/prisma";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const firstDay = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const lastDay = format(endOfMonth(new Date()), "yyyy-MM-dd");
    const reservations = await prisma.reserve.findMany({
      where: {
        from: {
          lte: new Date(firstDay),
          gte: new Date(lastDay),
        },
      },
    });
    console.log("@@@@");
    console.log(reservations);
    return Response.json(reservations);
  } catch (e) {
    return Response.json(e);
  }
}

export async function POST(reqeust: Request) {
  try {
    const { date } = await reqeust.json();
    console.log(date);
    if (!date)
      return NextResponse.json(
        {
          message: "Please enter the date",
        },
        { status: 400 },
      );
    const result = await prisma.reserve.findMany({
      where: {
        OR: [
          {
            from: date,
          },
          {
            to: date,
          },
        ],
      },
    });
    return Response.json(result);
  } catch (e) {
    console.log(e);
  }
}
