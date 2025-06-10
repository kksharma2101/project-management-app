import { db } from "@/server/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    const body: SignupRequestBody = await req.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
        return NextResponse.json({ error: "fields is required" }, { status: 400 })
    }

    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    })

    return NextResponse.json({ message: "User created", user })
}
