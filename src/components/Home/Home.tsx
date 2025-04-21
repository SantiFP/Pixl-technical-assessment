"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import EventsList from "@/components/Events/EventsList";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/eventStore";
import Loading from "../Loading/Loading";
import "./Home.css";

const Home = () => {
  // Custom hook to get authentication status and role
  const { loading, error, isAdmin } = useAuth();
  const router = useRouter();
  const { clearCurrentEvent } = useEventStore();

  useEffect(() => {
    // Set the document title based on user's role
    document.title = isAdmin
      ? "Admin Home | Pixl events"
      : "Home | Pixl events";
    // Redirect to login page if there's an authentication error
    if (error) {
      router.push("./auth/login");
    }
  }, [isAdmin, error, router]);

  // Show loading component if still verifying auth or if there's an error
  if (loading || error) {
    return <Loading />;
  }

  // Handle logout by removing token and redirecting to landing page
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // Handle create event: clear current event state and navigate to form
  const handleCreate = () => {
    clearCurrentEvent();
    router.push("/event-form");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="nav">
        <h1 className="text-2xl font-bold text-gray-800">
          {isAdmin ? "Event Manager" : "🎉 Discover Events"}
        </h1>
        <button onClick={handleLogout} className="logoutButton">
          Logout
        </button>
      </nav>

      <div className="mx-auto px-4 py-8 lg:w-11/12 ">
        <div className="contentDiv">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              {isAdmin ? "Welcome, Admin 👋" : "Welcome 👋"}
            </h2>
            <p className="text-gray-500 mt-1">
              {isAdmin
                ? "You can manage and create new events from here."
                : "Browse through the available events and join the fun!"}
            </p>
          </div>

          {/* Show create button only for admin users */}
          {isAdmin && (
            <button onClick={handleCreate} className="createButton">
              + Create New Event
            </button>
          )}
        </div>

        {/* Render the list of events, passing user role */}
        <EventsList role={isAdmin} />
      </div>
    </div>
  );
};

export default Home;
