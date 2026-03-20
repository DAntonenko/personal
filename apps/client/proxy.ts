import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};

// Runs in server runtime
export async function proxy(request: NextRequest) {

  const { pathname } = request.nextUrl;

  // API proxy
  if (pathname.startsWith("/api/")) {
    const apiBase = process.env.API_BASE_URL!;
    const url = new URL(pathname + request.nextUrl.search, apiBase);
    return NextResponse.rewrite(url);
  }

  // Admin guard
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("session");

    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Everything else - just forward
  return NextResponse.next();
}
