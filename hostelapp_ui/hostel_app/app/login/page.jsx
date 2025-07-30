"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api, { endpoints } from "@/lib/api";
import authStore from "@/public/store/authStore";

const Logpg = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newemail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [existinguser, setexistinguse] = useState(true);
  const [newUser, setnewUser] = useState(false);

  const { setUser } = authStore();

  const login = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      console.log("Logging in with", email, password);
      const res = await api.post(endpoints.LogIn, { email, password });
      const data = res.data;
      console.log("Login response headers:", res.headers);

      setUser({ id: data.id, role: data.role, email });
      setStatus(`Login successful. Role: ${data.role}`);
      setTimeout(() => router.push("/home"), 1000);
    } catch (err) {
      // console.error("Login error:", err);
      console.error("Login error:", err.response?.data || err);
      setStatus(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const newUserPnl = () => {
    setexistinguse(false);
    setnewUser(true);
  };

  const SetPassword = async (e) => {
    e.preventDefault();
    setStatus(" ");
    setLoading(true);
    // setIsFirstTime(true);

    try {
      const res = await api.post(endpoints.SetPassword, {
        email: newemail,
        password: newPassword,
      });
      console.log("Login response headers:", res.headers);

      console.log("Response from backend:", res.data);
      console.log("Success:", res.data);
      // const data = res.data;
      setStatus(`Password set seccessfully. ${res.data.role}`);
      // setTimeout(() => router.push("/home"), 1000);
      alert("New User Password is Set");
      setexistinguse(true);
      setnewUser(false);
      setPassword([""])
    } catch (err) {
      console.error("ERROR:", err);
      setStatus(err.response?.data?.error || "Failed to set password");
    } finally {
      setLoading(false);
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
        {existinguser && (
          <form
            onSubmit={login}
            className="w-full max-w-md border border-blue-400 p-6 rounded-lg shadow-md bg-gray-50"
          >
            <div className="title text-black text-xl mb-4 p-2">
              <h1>Log In</h1>
            </div>
            <div className="content grid gap-4">
              <input
                className="border p-2 rounded w-full text-black"
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full border p-2 text-black rounded"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <div className="text-black hover:font-semibold hover:underline hover:text-red-600">
                <button onClick={newUserPnl}>New User?</button>
              </div>
              {status && <p className="mt-4 text-sm text-red-600">{status}</p>}
            </div>
          </form>
        )}
        {newUser && (
          <form
            className="w-full max-w-md border border-blue-400 p-6 rounded-lg shadow-md bg-gray-50"
            onSubmit={SetPassword}
          >
            <h1 className="title text-black text-xl mb-4 p-2">
              Set Log-In Password
            </h1>
            <div className="content grid gap-4">
              <input
                className="border p-2 rounded w-full text-black"
                type="email"
                placeholder="E-mail"
                required
                value={newemail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <input
                className="border p-2 rounded w-full text-black"
                type="password"
                placeholder="Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={loading}
              >
                Set Password
              </button>
              {status && <p className="mt-4 text-sm text-red-600">{status}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Logpg;
