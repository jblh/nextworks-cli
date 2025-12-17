import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Placeholder endpoint: future work may implement email verification tokens.
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
