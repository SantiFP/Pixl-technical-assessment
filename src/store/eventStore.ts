import { create } from "zustand";
import { EventStore } from "@/types/event";

export const useEventStore = create<EventStore>((set) => ({
  currentEvent: null,
  events: [],

  setCurrentEvent: (event) => set({ currentEvent: event }),
  clearCurrentEvent: () => set({ currentEvent: null }),

  setEvents: (events) => set({ events }),

  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
