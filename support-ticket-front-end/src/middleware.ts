import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const user = req.cookies.get("user")?.value;
  const url = req.nextUrl.clone();
  if (!token && !user && url.pathname.startsWith("/user/dashboard")) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/dashboard/:path*", "/dashboard/:path*"],
};
