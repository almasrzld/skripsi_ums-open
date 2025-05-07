import { NextResponse } from "next/server";

export function middleware(request) {
  const isLogged = request.cookies.get("access_token");

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isLogged) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname === "/auth/login" && isLogged) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
