import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:4000";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `${BACKEND_URL}/api/posts/${params.id}`,
    {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    }
  );

  const body = await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: {
      "content-type":
        res.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.text();

  const res = await fetch(
    `${BACKEND_URL}/api/posts/${params.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        cookie: req.headers.get("cookie") ?? "",
      },
      body,
    }
  );

  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type":
        res.headers.get("content-type") ?? "application/json",
    },
  });
}
