"use client";

import useAuth from "@/hooks/useAuth";
import EventsList from "@/components/Events/EventsList";
import { useRouter } from "next/navigation";

const Home = () => {
  const { loading, error, isAdmin } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold">Protected Data</h1>
        {isAdmin && (
          <button
            onClick={() => router.push("/create-event")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Crear Evento
          </button>
        )}

        <EventsList role={isAdmin} />
      </div>
    </div>
  );
};

export default Home;
