// Interface for a single event's data structure

export interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  price: number;
  image: string;
}

// Interface for the Zustand event store
export interface EventStore {
  currentEvent: EventData | null;
  events: EventData[];
  setCurrentEvent: (event: EventData) => void;
  clearCurrentEvent: () => void;
  setEvents: (events: EventData[]) => void;
  removeEvent: (id: number) => void; 
};