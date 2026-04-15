import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const STUDIO_PREFIX = "/studio";

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sanity Studio", charset="UTF-8"',
    },
  });
}

function misconfiguredResponse() {
  return new NextResponse("Studio auth is not configured", {
    status: 503,
  });
}

function decodeBasicAuth(header: string) {
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return null;

  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) return null;

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(STUDIO_PREFIX)) {
    return NextResponse.next();
  }

  const expectedUsername = process.env.STUDIO_USERNAME;
  const expectedPassword = process.env.STUDIO_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    if (process.env.NODE_ENV === "production") {
      return misconfiguredResponse();
    }

    return NextResponse.next();
  }

  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return unauthorizedResponse();
  }

  const credentials = decodeBasicAuth(authorization);
  if (!credentials) {
    return unauthorizedResponse();
  }

  if (credentials.username !== expectedUsername || credentials.password !== expectedPassword) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
