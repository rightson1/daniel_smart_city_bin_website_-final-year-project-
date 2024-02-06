import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Bin from "@/utils/models/Bin";
import { IBinFetched } from "@/types";
import Location from "@/utils/models/Location";
export async function POST(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const bin = await Bin.countDocuments({});
    body.name = `Bin ${bin + 1}`;
    const newBin = await Bin.create(body);
    return NextResponse.json(newBin);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<IBinFetched> = await request.json();
    const updatedBin = await Bin.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedBin), {
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
//get Bin by uid;

export async function GET(request: NextRequest) {
  try {
    await db();
    Location;
    const bins = await Bin.find().populate("location");
    return NextResponse.json(bins);
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
    const deletedBin = await Bin.findByIdAndDelete(body._id);
    return NextResponse.json(deletedBin);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, {
      status: 500,
    });
  }
}
