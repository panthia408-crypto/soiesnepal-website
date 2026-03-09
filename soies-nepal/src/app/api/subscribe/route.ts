import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bhcqd45q",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-11-13",
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json({ error: "Subscription service not configured" }, { status: 503 });
    }

    // Check if already subscribed
    const existing = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id, active }`,
      { email }
    );

    if (existing) {
      if (!existing.active) {
        await writeClient.patch(existing._id).set({ active: true }).commit();
        return NextResponse.json({ message: "Welcome back! You have been re-subscribed." });
      }
      return NextResponse.json({ message: "You are already subscribed!" });
    }

    await writeClient.create({
      _type: "subscriber",
      email,
      name: name || "",
      subscribedAt: new Date().toISOString(),
      active: true,
    });

    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
