import { NextResponse } from "next/server";

export async function GET() {
  const enabled = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);
  return NextResponse.json({ github: enabled });
}
