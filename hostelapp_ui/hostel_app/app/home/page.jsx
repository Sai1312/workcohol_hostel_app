"use client";
import React, { useEffect, useRef, useState } from "react";
import Stdpg from "@/components/tables/Stdpg";
import Stdfeepg from "@/components/tables/Stdfeepg";
import Outpasspg from "@/components/tables/Outpasspg";
import Visitorpg from "@/components/tables/Visitorpg";
import authStore from "@/public/store/authStore";
import api, { endpoints } from "@/lib/api";
import { useRouter } from "next/navigation";
import Staffpg from "@/components/tables/Staffpg";
import { LogOut, PersonStanding, User2Icon } from "lucide-react";

const Homepg = () => {
  const router = useRouter();

  const { id, role, email, setUser, clearUser } = authStore();
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    auth();
  }, []);

  const auth = async () => {
    try {
      const res = await api.get(endpoints.Token);
      const data = res.data;
      console.log("User is authenticated", res.data);

      setUser({ id: data.id, role: data.role, email: data.email });
    } catch (err) {
      console.log("error", err);
      console.error("Not authenticated", err);
      clearUser();
      router.push("/login");
      console.log("user no log");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post(endpoints.Logout);
      router.push("/login");
    } catch (err) {
      console.error("Logout Error :", err);
    }
  };

  const [showTbl1, setShowTbl1] = useState(false);
  const studtBtn = () => {
    setShowTbl1(true);
    setShowTbl2(false);
    setShowTbl3(false);
    setShowTbl4(false);
    setShowTbl5(false);
  };

  const [showTbl2, setShowTbl2] = useState(false);
  const stdfeeBtn = () => {
    setShowTbl2(true);
    setShowTbl1(false);
    setShowTbl3(false);
    setShowTbl4(false);
    setShowTbl5(false);
  };

  const [showTbl3, setShowTbl3] = useState(false);
  const visitorBtn = () => {
    setShowTbl3(true);
    setShowTbl1(false);
    setShowTbl2(false);
    setShowTbl4(false);
    setShowTbl5(false);
  };

  const [showTbl4, setShowTbl4] = useState(false);
  const outpassBtn = () => {
    setShowTbl4(true);
    setShowTbl1(false);
    setShowTbl2(false);
    setShowTbl3(false);
    setShowTbl5(false);
  };

  const [showTbl5, setShowTbl5] = useState(false);
  const staffBtn = () => {
    setShowTbl5(true);
    setShowTbl1(false);
    setShowTbl2(false);
    setShowTbl3(false);
    setShowTbl4(false);
  };

  return (
    <div>
      <title>Hostel Management App</title>
      <div className="w-screen h-screen flex flex-col overflow-hidden font-sans bg-gray-50">
        {/* Header */}
        <header className="h-20 bg-blue-400 flex items-center justify-between px-6">
          <h1 className="text-3xl font-semibold text-gray-800 ">
            Hostel Management App
          </h1>
          <div className="w-full flex justify-end items-center px-6 py-4 bg-blue-400 relative z-10">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDetails((prev) => !prev)}
                className="relative cursor-pointer"
              >
                <User2Icon />
              </button>

              {showDetails && (
                <div className="absolute right-0 mt-2 w-64 bg-blue-50 text-black rounded-md shadow-lg p-4 z-50">
                  <h1>User ID: {id}</h1>
                  <p>Role: {role}</p>
                  <p>Email: {email}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center gap-1 text-white cursor-pointer"
            >
              Log Out <LogOut />
            </button>
          </div>
        </header>
        {/* Main layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-blue-400 text-white flex-shrink-0 h-full p-6 space-y-4">
            <button
              onClick={studtBtn}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 transition rounded text-left"
            >
              Student's Details
            </button>
            <button
              onClick={stdfeeBtn}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 transition rounded text-left"
            >
              Student's Fee
            </button>
            {role == "Staff" && (
              <button
                onClick={visitorBtn}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 transition rounded text-left"
              >
                Visitor Details
              </button>
            )}

            <button
              onClick={outpassBtn}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 transition rounded text-left"
            >
              OutPass Details
            </button>
            {role == "Staff" && (
              <button
                onClick={staffBtn}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 transition rounded text-left"
              >
                Staff Details
              </button>
            )}
          </aside>
          {/* Content */}
          <main className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* Section 1 */}
            {showTbl1 && (
              <section className="p-6 ">
                <div className="table_1">
                  <Stdpg />
                </div>
              </section>
            )}

            {/* Section 2 */}
            {showTbl2 && (
              <section className="p-6 ">
                <div className="table_2">
                  <Stdfeepg />
                </div>
              </section>
            )}

            {/* Section 3 */}
            {showTbl3 && (
              <section className="p-6 ">
                <div className="table_2">
                  <Visitorpg />
                </div>
              </section>
            )}

            {/* Section 4 */}
            {showTbl4 && (
              <section className="p-6 ">
                <div className="table_2">
                  <Outpasspg />
                </div>
              </section>
            )}

            {/* Section 5 */}
            {showTbl5 && (
              <section className="p-6 ">
                <div className="table_2">
                  <Staffpg />
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Homepg;
