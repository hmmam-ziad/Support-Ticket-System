import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const user = req.cookies.get("user")?.value;
  const role = user ? JSON.parse(user)?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
  

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {

    if (req.nextUrl.pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/user") && role !== "User") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
