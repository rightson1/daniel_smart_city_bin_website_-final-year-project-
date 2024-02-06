import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Location from "@/utils/models/Location";
import { ILocationFetched } from "@/types";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const location = await Location.find({
      name: body.name,
    }).countDocuments();
    if (location === 0) {
      const location = await Location.create(body);
      return NextResponse.json(location);
    } else {
      return NextResponse.json({
        message: "Location already exists",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<ILocationFetched> = await request.json();
    const updatedLocation = await Location.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedLocation), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//get Location by uid;

export async function GET(request: NextRequest) {
  try {
    await db();
    const locations = await Location.find();

    return NextResponse.json(locations);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

//delete
export async function DELETE(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const deletedLocation = await Location.findByIdAndDelete(body._id);
    return NextResponse.json(deletedLocation);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, {
      status: 500,
    });
  }
}
