"use client";

import useAuth from "@/hooks/useAuth";
import EventsList from "@/components/Events/EventsList";
import { useRouter } from "next/navigation";

const Home = () => {
  const { loading, error, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/"); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold">Home</h1>
        {isAdmin && (
          <button
            onClick={() => router.push("/event-form")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Crear Evento
          </button>
        )}

        <EventsList role={isAdmin} />

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
