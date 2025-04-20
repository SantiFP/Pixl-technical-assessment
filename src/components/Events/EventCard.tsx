"use client";

import Swal from "sweetalert2";
import { useEventStore } from "@/store/eventStore";
import { EventData } from "@/types/event";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EventCard = ({ event, role }: { event: EventData; role: boolean }) => {
  const { setCurrentEvent, removeEvent } = useEventStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
      });

      removeEvent(event.id);
      Swal.fire("Eliminado", "El evento ha sido eliminado.", "success");
    } catch (err) {
      console.error("Error al eliminar:", err);
      Swal.fire("Error", "Hubo un problema al eliminar el evento.", "error");
    }
  };

  const handleEdit = () => {
    setCurrentEvent(event);
    router.push("/create-event");
  };

  const showDeleteAlert = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Este evento será eliminado permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mercado-pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: event.title,
          price: event.price,
        }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        Swal.fire("Error", "No se pudo iniciar el proceso de pago.", "error");
      }
    } catch (err) {
      console.error("Error al comprar:", err);
      Swal.fire("Error", "Hubo un problema al iniciar el pago.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={event.id}
      className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-700">${event.price}</p>

      {event.image && (
        <img
          src={event.image}
          alt="Event"
          className="w-full h-36 object-cover mt-2 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
        />
      )}

      {role ? (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={showDeleteAlert}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      ) : (
        <button
          onClick={handleBuy}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Comprar"}
        </button>
      )}
    </div>
  );
};

export default EventCard;
