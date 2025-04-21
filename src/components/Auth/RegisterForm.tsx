"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./AuthForms.css";
import Loading from "../Loading/Loading";

const RegisterForm = () => {
  // States to handle form inputs, errors, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Set the document title when the component renders
  useEffect(() => {
    document.title = "Register";
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    setFormError("");
    setPasswordError("");
    setConfirmError("");

    // Validate password length

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      hasError = true;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      hasError = true;
    }

    // If there are errors, stop the submission
    if (hasError) return;

    // Send registration request to the API
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword, role }),
    });

    const data = await response.json();
    if (data.token) {
      setIsLoading(true); // Show loading screen if registration is successful
      router.push("./login"); // Redirect to login page
    } else {
      setFormError(data.error || "Registration failed"); // Display error if registration fails
    }
  };

  // If the registration is in progress, show a loading component
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create an Account
        </h2>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className={`input ${
                passwordError ? "border-red-500" : "border-gray-300"
              } `}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Display password error message if any */}
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className={`input ${
                confirmError ? "border-red-500" : "border-gray-300"
              } `}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* Display confirm password error message if any */}
            {confirmError && (
              <p className="text-red-500 text-sm mt-1">{confirmError}</p>
            )}
          </div>

          <div>
            <label className="label">Role</label>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Display form error if any */}
          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}

          <div className="pt-4">
            <button type="submit" className="button">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
