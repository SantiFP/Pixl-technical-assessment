'use client';

import { useEventStore } from "@/store/eventStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreateEventPage = () => {
  const router = useRouter();
  const { currentEvent, clearCurrentEvent } = useEventStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);

  
  useEffect(() => {
    if (currentEvent) {
      setTitle(currentEvent.title);
      setDescription(currentEvent.description);
      setDate(currentEvent.date.slice(0, 10)); 
      setPrice(String(currentEvent.price));
      setImages(currentEvent.images || []);
    }
  }, [currentEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      id: currentEvent?.id,
      title,
      description,
      date,
      price: parseFloat(price),
      images,
    };

    try {
      if (currentEvent) {
        await fetch(`/api/events/${currentEvent.id}`, {  
          method: 'PUT',
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

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {currentEvent ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default CreateEventPage;
