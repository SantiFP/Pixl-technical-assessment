import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const { title, description, date, price, images } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID del evento requerido" },
        { status: 400 }
      );
    }

    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) }, // Usamos el id de la URL
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
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { message: "ID del evento requerido" },
        { status: 400 }
      );
    }

    await prisma.event.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
