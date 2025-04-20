"use client";

import useAuth from "@/hooks/useAuth";
import EventsList from "@/components/Events/EventsList";
import { useRouter } from "next/navigation";

const Home = () => {
  const { loading, error, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // Borrar el almacenamiento local o cualquier otro dato relevante
    localStorage.removeItem("token"); // o sessionStorage.removeItem("token");

    // Redirigir al inicio
    router.push("/"); // Asumiendo que tu inicio es '/'
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
            onClick={() => router.push("/create-event")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Crear Evento
          </button>
        )}

        <EventsList role={isAdmin} />

        {/* Botón de Cerrar sesión */}
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
