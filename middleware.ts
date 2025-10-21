import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const PUBLIC_FILE_OR_PATH = [
//   "/login",
//   "/signup",
//   "/_next",
//   "/favicon.ico",
//   "/",
// ];

export function middleware(request: NextRequest) {
  //   const authToken = request.cookies.get("token")?.value;
  //   const { pathname } = request.nextUrl;
  //   const isPublicPath = PUBLIC_FILE_OR_PATH.some(
  //     (path) => pathname === path || pathname.startsWith(path),
  //   );
  //   if (!authToken && !isPublicPath) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   if (authToken && (pathname === "/login" || pathname === "/signup")) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   const response = NextResponse.next();
  //   response.headers.set("x-server-location", "edge-runtime");
  //   return response;
  // }
  // export const config = {
  //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
