import { NextRequest, NextResponse } from "next/server";

const MERCADO_PAGO_TOKEN = process.env.MERCADO_PAGO_TOKEN;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const preferenceData = {
    items: [
      {
        title: body.title,
        quantity: 1,
        unit_price: body.price,
        currency_id: "UYU",
      },
    ],
    payer: {
      email: body.email,
      name: body.firstName,
      surname: body.lastName,
    },
    back_urls: {
      success: "http://localhost:3000/home",
      failure: "http://localhost:3000/home",
    },
    auto_return: "approved",
  };

  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MERCADO_PAGO_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferenceData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en la creación de la preferencia");
    }

    return NextResponse.json({ init_point: data.init_point });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    return NextResponse.json({ error: "No se pudo procesar el pago" }, { status: 500 });
  }
}
