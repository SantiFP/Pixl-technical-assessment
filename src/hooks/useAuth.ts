import { useState, useEffect } from "react";

const useAuth = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
         // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Restricced access");

        // Make request to auth middleware
        const res = await fetch("/api/auth/middleware", {
          headers: {
            Authorization: token,
          },
        });

        // If token is invalid or expired
        if (res.status === 401) throw new Error("Access restricted");

        // Parse response and set user role
        const result = await res.json();
        setRole(result.role);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isAdmin = role === "admin";

  return {
    loading,
    error,
    isAdmin,
  };
};

export default useAuth;
