"use client";

import { useEventStore } from "@/store/eventStore";
import { EventData } from "@/types/event";
import { useRouter } from "next/navigation";

const EventCard = ({ event, role }: { event: EventData; role: boolean }) => {
  const { setCurrentEvent, removeEvent } = useEventStore(); // Aquí usamos removeEvent

  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(
      "¿Estás seguro de que querés eliminar este evento?"
    );
    if (!confirmed) return;

    try {
      await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
      });

      removeEvent(event.id); // Aquí actualizamos el estado global de los eventos
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleEdit = () => {
    setCurrentEvent(event); 
    router.push("/create-event"); 
  };

  return (
    <div key={event.id} className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-700">${event.price}</p>
      {event.images.length > 0 && (
        <img
          src={event.images[0]}
          alt="Event"
          className="w-full h-48 object-cover mt-2 rounded"
        />
      )}
      {role && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleEdit} 
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Editar
          </button>
          <button
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
