import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user)
      return NextResponse.json(
        {
          message: "User not found!",
        },
        {
          status: 400,
        },
      );
    const from = new Date(body.date);
    const to = new Date(body.date);
    from.setHours(9);
    to.setHours(17);
    const haveReserve = await prisma.reserve.findMany({
      where: {
        from: {
          gte: from,
          lte: to,
        },
      },
    });
    if (haveReserve)
      return NextResponse.json(
        {
          message: "You have reserved in this date.",
        },
        {
          status: 400,
        },
      );
    from.setHours(body.from);
    to.setHours(body.to);
    const reserve = await prisma.reserve.create({
      data: {
        from,
        to,
        userId: id,
      },
    });
    return Response.json(reserve);
  } catch (e) {
    console.log(e);
    return Response.json(e);
  }
}
