import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { title, description, date, price, images } = await request.json();

  // Validación de campos obligatorios
  if (!title || !description || !date || !price) {
    return NextResponse.json(
      { error: "Title, description, date, and price are required." },
      { status: 400 }
    );
  }

  // Intentamos crear el evento
  try {
    // Aseguramos que la fecha sea válida
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
        images: images || [], // Si no se pasan imágenes, se guarda un arreglo vacío
      },
    });

    console.log("Event created:", event);

    // Devolvemos el evento creado con código 201 (Created)
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    // En caso de error, devolvemos un error 500
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

export async function PUT(req: Request) {
  try {
    const { id, title, description, date, price, images } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID del evento requerido" }, { status: 400 });
    }

    const updatedEvent = await prisma.event.update({
      where: { id }, // asumimos que es un número, si es string no lo toques
      data: {
        title,
        description,
        date: new Date(date),
        price,
        images,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

