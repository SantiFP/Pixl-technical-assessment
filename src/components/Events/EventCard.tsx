"use client";

import Swal from "sweetalert2";
import { useEventStore } from "@/store/eventStore";
import { EventData } from "@/types/event";
import { useRouter } from "next/navigation";

const EventCard = ({ event, role }: { event: EventData; role: boolean }) => {
  const { setCurrentEvent, removeEvent } = useEventStore();
  const router = useRouter();

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

  return (
    <div key={event.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
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

      {role && (
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
      )}
    </div>
  );
};

export default EventCard;
