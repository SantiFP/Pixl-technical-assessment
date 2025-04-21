"use client";

import { useEventStore } from "@/store/eventStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loading from "../../Loading/Loading";
import './EventForm.css'

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
  const [isAdminChecked, setIsAdminChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
  
    // If there is a current event, pre-populate the form fields with the event data
    if (currentEvent) {
      setTitle(currentEvent.title);
      setDescription(currentEvent.description);
      setDate(currentEvent.date.slice(0, 10));
      setPrice(String(currentEvent.price));
      setImage(currentEvent.image || "");
    }
  
    // Change the document title based on whether we are editing or creating an event
    document.title = currentEvent ? "Edit Event | Pixl" : "Create Event | Pixl";
  
     // If user is not admin or there is an error, redirect to login page
    if (isAdminChecked && (error || !isAdmin)) {
      router.push("./auth/login");
    } else {
      setIsAdminChecked(true); 
    }
  }, [loading, currentEvent, error, isAdmin, isAdminChecked, router]);

  // If loading or error or not an admin, show loading screen
  if (loading || error || !isAdmin) {
    return <Loading />;
  }

   // Handle form submission: either create or update the event
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
       // If it's an existing event, update it, otherwise create a new event
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

      // Clear the current event and redirect to the home page
      clearCurrentEvent();
      router.push("/home");
    } catch (error) {
      console.error("Error while saving the event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          {currentEvent ? "Edit Event" : "Create Event"}
        </h1>

        <div className="flex flex-col gap-1">
          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="TextAreaInput"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="flex flex-col gap-1 pb-4">
          <label className="label">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input"
          />
        </div>
      
        <button
          type="submit"
          className={`w-full py-2 text-white rounded-md transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isLoading}
        >
          {isLoading
            ? currentEvent
              ? "Updating..."
              : "Creating..."
            : currentEvent
            ? "Update"
            : "Create"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
