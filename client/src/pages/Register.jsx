import React from "react";
import { useState } from "react";
import { register } from "../auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
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
      await dispatch(register({ name, email, password })).unwrap();
      navigate("/"); // redirect to login after registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/" className="text-secondary font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
