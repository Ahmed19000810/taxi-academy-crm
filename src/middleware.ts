import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/api/protected"];
const publicRoutes = ["/login","/register","/forgot-password","/api/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authToken = request.cookies.get("__session")?.value;
    if (!authToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"] };