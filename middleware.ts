import { NextRequest, NextResponse } from 'next/server'
import JwtService from './services/jwtService'
 
export const config = {
  matcher: '/api/hosts/:function*',
}
 
export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

function isAuthenticated(request: NextRequest) {
    const token = request.cookies.get("Auth-Token")

    try {
        JwtService.verify(token?.value ?? "")
        return true
    }
    catch(e: any) {
        return false
    }
}