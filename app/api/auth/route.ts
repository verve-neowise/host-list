import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import JwtService from "@/services/jwtService";

export async function POST(request: Request) {
    const formData = await request.formData()

    const token = await JwtService.sign()
    console.log("sign:", token)

    if (formData.get("password") == process.env.PASSWORD) {
        cookies().set("Auth-Token", token)
        return Response.redirect(new URL('/hosts', request.url))
    }
    else {
        cookies().delete("Auth-Token")
        return Response.redirect(new URL('/login', request.url))
    }
}