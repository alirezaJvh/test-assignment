import { prisma } from "@/app/lib/prisma";
import { format, startOfMonth, endOfMonth } from "date-fns";

export async function GET() {
  try {
    const firstDay = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const lastDay = format(endOfMonth(new Date()), "yyyy-MM-dd");
    console.log(firstDay);
    console.log(lastDay);
    const reservations = await prisma.reserve.findMany({
      where: {
        start: {
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
  } catch (e) {
    console.log(e);
  }
}
