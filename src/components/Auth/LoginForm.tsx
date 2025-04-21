"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./AuthForms.css";

const LoginForm = () => {
  // States to handle email, password, and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Set the document title when the component renders
  useEffect(() => {
    document.title = "Login";
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }

    try {
      // Send login request to the API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save token if authentication is successful and redirect to home
        if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/home");
        }
      } else {
        // Show error message if authentication fails
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Sign In
        </h2>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input"
              required
            />
          </div>
          {/* Display error if there's any issue with login */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="pt-4">
            <button type="submit" className="authButton">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
