import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    try {
        const users = await prisma.user.findMany()
        console.log(users)
        console.log('call singup requ')
    } catch (e) {
        return Response.json(e);
    }
}