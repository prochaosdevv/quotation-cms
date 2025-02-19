"use client"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // const session = request.cookies.get("session")
  // const userRole = request.cookies.get("userRole")
  // const session = window.localStorage.getItem("session")

  // If there's no session, redirect to login
  // if (!session) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  // Check permissions based on user role
  // if (userRole?.value === "employee") {
  //   const allowedPaths = ["/quotes", "/quotes/create", "/line-items"]
  //   if (!allowedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
  //     return NextResponse.redirect(new URL("/", request.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
}

