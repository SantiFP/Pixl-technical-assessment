import { useState, useEffect } from 'react';

const useAuth = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Restricced access");

        const res = await fetch("/api/auth/middleware", {
          headers: {
            Authorization: token,
          },
        });

        if (res.status === 401) throw new Error("Access restricted");

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

