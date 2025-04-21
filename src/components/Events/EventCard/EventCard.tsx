"use client";

import Swal from "sweetalert2";
import { useEventStore } from "@/store/eventStore";
import { EventData } from "@/types/event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./EventCard.css";

const EventCard = ({ event, role }: { event: EventData; role: boolean }) => {
  const { setCurrentEvent, removeEvent } = useEventStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Function to handle event deletion
  const handleDelete = async () => {
    try {
      await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
      });

      removeEvent(event.id);
      Swal.fire("Deleted", "The event has been deleted.", "success");
    } catch (err) {
      console.error("Error deleting:", err);
      Swal.fire("Error", "There was a problem deleting the event.", "error");
    }
  };

  // Function to handle event edit
  const handleEdit = () => {
    setCurrentEvent(event);
    router.push("/event-form");
  };

  // Show confirmation alert before deleting the event
  const showDeleteAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  // Function to handle the ticket purchase process
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
        Swal.fire("Error", "Could not start the payment process.", "error");
      }
    } catch (err) {
      console.error("Error buying:", err);
      Swal.fire("Error", "There was a problem starting the payment.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={event.id} className="cardContainer">
      <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(event.date).toLocaleDateString()}{" "}
        {/* Format the event date */}
      </p>
      <p className="text-lg text-gray-700 mt-1">${event.price}</p>

      {/* Display event image if available */}
      {event.image && (
        <img src={event.image} alt="Event" className="cardImage" />
      )}

      {/* Show edit and delete buttons for admin role, or buy button for user role */}
      {role ? (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleEdit}
            className="cardButton bg-blue-600 hover:bg-blue-700 "
          >
            Edit
          </button>
          <button
            onClick={showDeleteAlert}
            className="cardButton bg-red-600 hover:bg-red-700 "
          >
            Delete
          </button>
        </div>
      ) : (
        <button onClick={handleBuy} disabled={loading} className="buyButton bg-blue-600 hover:bg-blue-700 ">
          {loading ? "Processing..." : "Buy ticket"}{" "}
          {/* Display processing text during purchase */}
        </button>
      )}
    </div>
  );
};

export default EventCard;
