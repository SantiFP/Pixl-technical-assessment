"use client";

import { useEventStore } from "@/store/eventStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const EventForm = () => {
  const router = useRouter();
  const { currentEvent, clearCurrentEvent } = useEventStore();
  const { loading, error, isAdmin } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (currentEvent) {
      setTitle(currentEvent.title);
      setDescription(currentEvent.description);
      setDate(currentEvent.date.slice(0, 10));
      setPrice(String(currentEvent.price));
      setImage(currentEvent.image || "");
    }
  }, [currentEvent]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !isAdmin) {
    return <div>Restricted access</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 

    const data = {
      id: currentEvent?.id,
      title,
      description,
      date,
      price: parseFloat(price),
      image,
    };

    try {
      if (currentEvent) {
        await fetch(`/api/events/${currentEvent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      clearCurrentEvent();
      router.push("/home");
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {currentEvent ? "Editar Evento" : "Crear Evento"}
      </h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio"
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="URL de la imagen"
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded w-full"
        disabled={isLoading}
      >
        {isLoading
          ? currentEvent
            ? "Actualizando..."
            : "Creando..."
          : currentEvent
          ? "Actualizar"
          : "Crear"}
      </button>
    </form>
  );
};

export default EventForm;
