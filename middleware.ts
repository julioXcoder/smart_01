import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

const roleConfig: {
  [key: string]: {
    dashboardUrl: string;
    allowedUrls: string[];
  };
} = {
  STUDENT: {
    dashboardUrl: "/student/application/dashboard",
    allowedUrls: ["/student"],
  },
  LECTURE: {
    dashboardUrl: "/staff/lecturer/dashboard",
    allowedUrls: ["/staff/lecturer"],
  },
  EXAMINATION_OFFICER: {
    dashboardUrl: "/staff/examination_officer/dashboard",
    allowedUrls: ["/staff/examination_officer"],
  },
  APPLICANT: {
    dashboardUrl: "/application-portal/my-applications",
    allowedUrls: ["/application-portal"],
  },
  // Add more roles and their configurations here
};

const pathToAuthUrl: {
  [key: string]: string;
} = {
  "/staff": "/auth/staff",
  "/student": "/auth/student",
  "/application-portal": "/auth/applicant",
  // Add more paths and their auth URLs here
};

const authPaths = ["/auth/staff", "/auth/student", "/auth/applicant"];

export async function middleware(request: NextRequest) {
  let token = request.cookies.get("session")?.value;
  const authUser =
    token && (await verifyAuth(token).catch((ex) => console.log(ex)));

  if (authUser) {
    const userId = authUser.id;
    const response = NextResponse.next();

    // response.headers.set("userId", userId);

    const config = roleConfig[authUser.role];

    if (config) {
      const { dashboardUrl, allowedUrls } = config;

      if (
        authUser &&
        authPaths.some((path) => request.nextUrl.pathname.startsWith(path))
      ) {
        if (dashboardUrl) {
          return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }
      }

      if (
        !allowedUrls.some(
          (url) =>
            request.nextUrl.pathname === url ||
            request.nextUrl.pathname.startsWith(url + "/"),
        )
      ) {
        return NextResponse.redirect(new URL("/not_authorized", request.url));
      }
    }

    return response;
  }

  for (const path in pathToAuthUrl) {
    if (
      request.nextUrl.pathname.startsWith(path) &&
      request.nextUrl.pathname !== pathToAuthUrl[path]
    ) {
      return NextResponse.redirect(new URL(pathToAuthUrl[path], request.url));
    }
  }
}

export const config = {
  matcher: [
    "/student/:path*",
    "/staff/:path*",
    "/application-portal/:path*",
    "/auth/:path*",
  ],
};
