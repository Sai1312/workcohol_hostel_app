"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Stdpg from "@/components/tables/Stdpg";
import Stdfeepg from "@/components/tables/Stdfeepg";

const Homepg = () => {
  const [showTbl1, setShowTbl1] = useState(false);
  const studtBtn = () => {
    setShowTbl1(true);
    setShowTbl2(false);
  };

  const [showTbl2, setShowTbl2] = useState(false);
  const stdfeeBtn = () => {
    setShowTbl2(true);
    setShowTbl1(false);
  };

  const [showtble3, setShowtbl3] = useState(false);
  const visitorBtn = () => {
    setShowtbl3(true);
    setShowTbl1(true);
    setShowTbl2(true);
  }


  return (
    <div>
      <title>Hostel Management App</title>
      <div className="w-screen h-screen flex flex-col overflow-hidden font-sans bg-gray-50">
        {/* Header */}
        <header className="h-20 bg-blue-400 flex items-center justify-center px-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Hostel Management App
          </h1>
        </header>{" "}
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
            <button
              onClick={visitorBtn}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 transition rounded text-left"
            >
              Visitor Details
            </button>
          </aside>
          {/* Content */}
          <main className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* Section 1 */}
            {showTbl1 && (
              <section className="p-6 ">
                <div className="table_1">
                  <Stdpg/>
                  
                </div>
              </section>
            )}

            {/* Section 2 */}
            {showTbl2 && (
              <section className="p-6 ">
                <div className="table_2">
                  <Stdfeepg/>
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
