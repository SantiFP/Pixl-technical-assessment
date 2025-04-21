"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard/EventCard";
import { useEventStore } from "@/store/eventStore";
import Loading from "../Loading/Loading";

const EventsList = ({ role }: { role: boolean }) => {

   // Destructuring the store to get events and the function to update them
  const { events, setEvents } = useEventStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch events from the API
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events"); 
        if (!res.ok) throw new Error("Error fetching events"); 

        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [setEvents]);

  if (loading) {
    return <Loading />
  }
  
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="flex flex-col lg:flex-row lg:flex-wrap">
        {events.map((event) => (
          <EventCard key={event.id} event={event} role={role} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
