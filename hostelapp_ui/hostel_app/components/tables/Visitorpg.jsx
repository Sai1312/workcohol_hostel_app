"use client";
import api, { endpoints } from "@/lib/api";
import React, { useEffect, useState } from "react";

const Visitorpg = () => {
  const [visitors, setVisitors] = useState([]);
  const [std, setStd] = useState([]);
  const [visitorData, setVisitorData] = useState({
    visitorname: "",
    relation: "",
    visitdate: "",
    std_id: null,
  });

  const [selectedId, setSelectedId] = useState(null);
  const [input, setInput] = useState(false);

  useEffect(() => {
    fetchstdid();
    fetchtbl();
  }, []);

  const fetchtbl = async () => {
    const res = await api.get(endpoints.visitors);
    setVisitors(res.data);
  };

  const fetchstdid = async () => {
    try {
      const res = await api.get(endpoints.students);
      setStd(res.data);
    } catch (err) {
      console.log("print :", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevData) => ({
      ...prevData,
      [name]: name === "std_id" ? parseInt(value) : value,
    }));
  };

  const handleCancel = async () => {
    setVisitorData({
      visitorname: "",
      relation: "",
      visitdate: "",
      std_id: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submit Data :", visitorData);
      await api.post(endpoints.visitors, visitorData);
    } catch (err) {
      console.error("Submit Error :", err);
    }
    fetchtbl();
  };

  const handleDelete = async () => {
    if (!selectedId) {
      alert("Please select a student");
      return;
    }

    try {
      const url = endpoints.visitorDetail(selectedId);
      console.log("Delete ID :", selectedId);
      await api.delete(url);
      console.log("Delete url :", url);
      fetchtbl();
      setSelectedId(null);
    } catch (err) {
      console.error("Delete Error :", err);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4 text-black">Visitor Records</h1>
        <div className="text-black flex flex-row justify-end gap-2 m-3">
          <button
            onClick={() => {
              setInput(true);
            }}
            className="bg-green-300 text-white mt-4 px-4 py-2 rounded cursor-pointer"
          >
            Create
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white mt-4 px-4 py-2 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
        <table className="table-auto border-collapse border text-black text-center w-full">
          <thead>
            <tr className="bg-blue-500">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Visitor Name</th>
              <th className="border px-4 py-2">Relation</th>
              <th className="border px-4 py-2">Visit Date</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr
                key={visitor.visitorid}
                onClick={() => setSelectedId(visitor.visitorid)}
                className={`text-center border cursor-pointer ${
                  selectedId === visitor.visitorid ? "bg-blue-100" : ""
                }`}
              >
                {/* <td className="border px-4 py-2">{visitor?.std?.stdid}</td> */}
                <td className="border px-4 py-2">{visitor?.std?.name}</td>
                <td className="border px-4 py-2">{visitor.visitorname}</td>
                <td className="border px-4 py-2">{visitor.relation}</td>
                <td className="border px-4 py-2">{visitor.visitdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {input && (
        <div className="text-black pt-10">
          <div className="flex flex-row justify-between items-center w-full mb-4">
            <h1 className="text-2xl font-bold">Enter Visitor Details </h1>
            <button
              onClick={handleCancel}
              className="text-red-500 hover:underline hover:font-semibold"
            >
              Cancel
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <select
                  id="std_ids"
                  name="std_id"
                  typeof="number"
                  value={visitorData.std_id || ""}
                  onChange={handleChange}
                  className="border p-1"
                >
                  <option>--Select Student ID--</option>
                  {std.map((student) => (
                    <option key={student.stdid} value={student.stdid}>
                      {student.stdid}
                    </option>
                  ))}
                </select>
                {/* <input
                type="number"
                name="std_id"
                id="std_id"
                value={visitorData.role}
                onChange={handleChange}
                placeholder="Student ID"
                className="border p-1"
              /> */}
                <input
                  type="text"
                  name="visitorname"
                  id="visitorname"
                  value={visitorData.visitorname}
                  onChange={handleChange}
                  placeholder="Visitor's Name"
                  className="border p-1"
                />
                <input
                  type="text"
                  name="relation"
                  id="relation"
                  value={visitorData.relation}
                  onChange={handleChange}
                  placeholder="Relation"
                  className="border p-1"
                />
                <h1>
                  Date & Time :
                  <input
                    type="datetime-local"
                    name="visitdate"
                    id="visitdate"
                    value={visitorData.visitdate}
                    onChange={handleChange}
                    className="border p-1 pl-5"
                  />
                </h1>
              </div>
              <div className="flex justify-center m-5">
                <button
                  type="submit"
                  className="bg-green-300 w-full p-1.5 font-semibold text-blue-50 text-2xl hover:bg-green-400 cursor-pointer rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitorpg;
