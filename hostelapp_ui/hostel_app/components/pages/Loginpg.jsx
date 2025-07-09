import React from "react";

const Loginpg = () => {
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
              type="text"
              placeholder="User Name"
            />
            <input
              className="border p-2 rounded w-full"
              type="password"
              placeholder="Password"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              type="submit"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpg;
