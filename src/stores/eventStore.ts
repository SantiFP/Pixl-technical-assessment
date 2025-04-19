// stores/eventStore.ts
import { create } from 'zustand';
import { EventData } from '@/types/event';

type EventStore = {
  currentEvent: EventData | null;
  setCurrentEvent: (event: EventData) => void;
  clearCurrentEvent: () => void;
};

export const useEventStore = create<EventStore>((set) => ({
  currentEvent: null,
  setCurrentEvent: (event) => set({ currentEvent: event }),
  clearCurrentEvent: () => set({ currentEvent: null }),
}));
