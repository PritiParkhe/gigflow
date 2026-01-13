import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/home"); // redirect to dashboard/home
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-heading font-bold mb-6 text-primary">
          GIGFLOW
        </h1>

        {error && (
          <div className="bg-accentError text-white p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-secondary font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
