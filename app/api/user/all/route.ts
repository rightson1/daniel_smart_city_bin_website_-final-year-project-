import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import User from "@/utils/models/User";
import { UserFetched } from "@/types";
import Location from "@/utils/models/Location";

export async function GET(request: NextRequest) {
  try {
    await db();
    Location;
    const user = await User.find({
      admin: false,
    }).populate("location");
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
