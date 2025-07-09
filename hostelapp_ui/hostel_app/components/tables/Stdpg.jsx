import axios from "axios";
import React, { useEffect, useState } from "react";

const Stdpg = () => {
    const [std, setStd] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/students/")
      .then((res) => setStd(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-black">Student Records</h1>
      <div>
        <button>Create</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
      <table className="min-w-full table-auto border text-black text-center">
        <thead>
          <tr className="bg-blue-500">
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">DOB</th>
            <th className="border px-4 py-2">Contact No</th>
            <th className="border px-4 py-2">E-Mail</th>
            <th className="border px-4 py-2">Parent Name</th>
            <th className="border px-4 py-2">Parent No</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Admission Date</th>
            <th className="border px-4 py-2">Floor No</th>
            <th className="border px-4 py-2">Room No</th>
          </tr>
        </thead>
        <tbody>
          {std.map((std) => (
            <tr key={std.stdid}>
              <td className="border px-4 py-2">{std.name}</td>
              <td className="border px-4 py-2">{std.gender}</td>
              <td className="border px-4 py-2">{std.dob}</td>
              <td className="border px-4 py-2">{std.contactnum}</td>
              <td className="border px-4 py-2">{std.email}</td>
              <td className="border px-4 py-2">{std.parentname}</td>
              <td className="border px-4 py-2">{std.parentnum}</td>
              <td className="border px-4 py-2">{std.address}</td>
              <td className="border px-4 py-2">{std.admissiondate}</td>
              <td className="border px-4 py-2">{std.floornum}</td>
              <td className="border px-4 py-2">{std.roomnum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stdpg
