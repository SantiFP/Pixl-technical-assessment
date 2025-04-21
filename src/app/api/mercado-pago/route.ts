import { NextRequest, NextResponse } from "next/server";

// Mercado Pago token stored in environment variables
const MERCADO_PAGO_TOKEN = process.env.MERCADO_PAGO_TOKEN;

// Function to create a payment preference
export async function POST(req: NextRequest) {

   // Retrieve the request body
  const body = await req.json();

   // Payment preference data to be sent to Mercado Pago API
  const preferenceData = {
    items: [
      {
        title: body.title, // Title of the product/service
        quantity: 1, // Quantity of the item
        unit_price: body.price, // Unit price
        currency_id: "UYU", // Currency (UYU - Uruguayan Peso)
      },
    ],
    payer: {
      email: body.email, // Buyer's email address
      name: body.firstName, // Buyer's first name
      surname: body.lastName, // Buyer's last name
    },
    back_urls: {
      success: "http://localhost:3000/home", // Success URL after payment
      failure: "http://localhost:3000/home", // Failure URL after payment
    },
    auto_return: "approved", // Auto return if the payment is approved
  };

  try {
     // Send a POST request to Mercado Pago API to create the payment preference
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MERCADO_PAGO_TOKEN}`, // Authorization with Mercado Pago token
        "Content-Type": "application/json", // Content type is JSON
      },
      body: JSON.stringify(preferenceData), // Send preference data as JSON
    });

    // Get the response from Mercado Pago API
    const data = await response.json();

    
    if (!response.ok) {
      throw new Error(data.message || "Error en la creación de la preferencia");
    }

    // Respond with the payment initiation URL (init_point) provided by Mercado Pago
    return NextResponse.json({ init_point: data.init_point });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    return NextResponse.json({ error: "No se pudo procesar el pago" }, { status: 500 });
  }
}
