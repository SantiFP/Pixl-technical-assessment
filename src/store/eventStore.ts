import { create } from 'zustand';
import { EventData } from '@/types/event';

type EventStore = {
  currentEvent: EventData | null;
  events: EventData[];
  setCurrentEvent: (event: EventData) => void;
  clearCurrentEvent: () => void;
  setEvents: (events: EventData[]) => void;
  removeEvent: (id: number) => void; // <- Renombrado (opcional)
};

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

