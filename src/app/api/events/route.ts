import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { title, description, date, price, images } = await request.json();

  if (!title || !description || !date || !price) {
    return NextResponse.json(
      { error: "Title, description, date, and price are required." },
      { status: 400 }
    );
  }

  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format." },
        { status: 400 }
      );
    }

    // Creamos el evento en la base de datos
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: parsedDate,
        price,
        images: images || [], 
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event." },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const events = await prisma.event.findMany();

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
};

