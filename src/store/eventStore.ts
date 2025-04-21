import { create } from "zustand";
import { EventStore } from "@/types/event";

// Zustand store to manage event-related state
export const useEventStore = create<EventStore>((set) => ({
  currentEvent: null,
  events: [],

  // Set the current selected event
  setCurrentEvent: (event) => set({ currentEvent: event }),

  // Clear the currently selected event
  clearCurrentEvent: () => set({ currentEvent: null }),

   // Set the list of all events
  setEvents: (events) => set({ events }),

  // Remove a specific event by ID
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
