import { NextRequest, NextResponse } from 'next/server'
import JwtService from './services/jwtService'
 
export const config = {
  matcher: '/api/hosts/:function*',
}
 
export async function middleware(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

async function isAuthenticated(request: NextRequest) {
    const token = request.cookies.get("Auth-Token")?.value ?? request.headers.get("Authorization")

    console.log("token:", token)

    try {
        await JwtService.verify(token ?? "")
        console.log("verified:", token)
        return true
    }
    catch(e: any) {
        console.log("error:", e)
        return false
    }
}