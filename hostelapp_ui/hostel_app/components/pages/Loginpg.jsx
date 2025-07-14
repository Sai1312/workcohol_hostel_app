"use client";
import axios from '@/lib/api'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Loginpg = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await axios.post("/login/", { email, password });
      if (res.data.first_time) {
        setIsFirstTime(true);
        setStatus("First-time login. Please set a password.");
      } else {
        setStatus(`Login success. Role: ${res.data.role}`);
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (err) {
      setStatus(err.response?.data?.error || "Login failed");
    }
  };

  const handleSetPassword = async () => {
    try {
      const res = await axios.post("/set-password/", {
        email,
        password: newPassword,
      });
      setIsFirstTime(false);
      setStatus("Password set. Redirecting...");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      setStatus(err.response?.data?.error || "Failed to set password");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="h-20 bg-blue-400 flex items-center justify-center rounded-md mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Hostel Management App
        </h1>
      </header>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md  border border-blue-400 p-6 rounded-lg shadow-md bg-gray-50">
          <div className="title text-black text-xl  mb-4 p-2">
            <h1>Enter LOG IN details</h1>
          </div>
          <div className="content grid gap-4">
            <input
              className="border p-2 rounded w-full"
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isFirstTime && (
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />
            )}
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              type="submit"
            >
              Log In
            </button>
            {isFirstTime && (
              <div className="mt-4 space-y-2">
                <input
                  type="password"
                  placeholder="Set new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border p-2"
                />
                <button
                  onClick={handleSetPassword}
                  className="bg-green-600 text-white px-4 py-2"
                >
                  Set Password
                </button>
              </div>
            )}
            {status && <p className="mt-4 text-sm text-red-600">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpg;
