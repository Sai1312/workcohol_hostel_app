import api, { endpoints } from "@/lib/api";
import React, { useEffect, useState } from "react";

const Staffpg = () => {
  const [staff, setStaff] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [input, setInput] = useState(false);
  const [staffData, setStaffData] = useState({
    name: "",
    role: "",
    contactnum: "",
    email: "",
    salary: "",
    joindate: "",
  });

  useEffect(() => {
    fetchtbl();
  }, []);

  //tablefetch
  const fetchtbl = async () => {
    try {
      const res = await api.get(endpoints.staff);
      setStaff(res.data);
    } catch (err) {
      console.log("Fetch Data Error: ", err);
    }
  };

  //handle input
  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  const handleCancel = async () => {
    setSelectedId(null);
    setInput(false);
    setStaffData({
      name: "",
      role: "",
      contactnum: "",
      email: "",
      salary: "",
      joindate: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Staff Data :", staffData);
      await api.post(endpoints.staff, staffData);
      fetchtbl();
      setInput(false);
      setStaff({
        name: "",
        role: "",
        contactnum: "",
        email: "",
        salary: "",
        joindate: "",
      });
      alert("Staff Data Created Successfully");
    } catch (err) {
      console.log("Submit Error :", err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-black">Staff Records</h1>
      <div className="text-black flex flex-row justify-end gap-2 m-3">
        <button
          onClick={() => {
            setInput(true);
          }}
          className="bg-green-300 text-white mt-4 px-4 py-2 rounded cursor-pointer"
        >
          Create
        </button>
        <button className="bg-green-300 text-white mt-4 px-4 py-2 rounded cursor-pointer">
          Delete
        </button>
      </div>
      <table className="table-auto border text-black text-center">
        <thead>
          <tr className="bg-blue-500">
            <th className="border px-4 py-2">Staff ID</th>
            <th className="border px-4 py-2">Staff Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Contact No</th>
            <th className="border px-4 py-2">E-Mail</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Join Date</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staff) => (
            <tr
              key={staff.staffid}
              onClick={() => setSelectedId(staff.staffid)}
              className={`text-center border cursor-pointer ${
                selectedId === staff.staffid ? "bg-blue-100" : ""
              }`}
            >
              <td className="border px-4 py-2">{staff.staffid}</td>
              <td className="border px-4 py-2">{staff.name}</td>
              <td className="border px-4 py-2">{staff.role}</td>
              <td className="border px-4 py-2">{staff.contactnum}</td>
              <td className="border px-4 py-2">{staff.email}</td>
              <td className="border px-4 py-2">{staff.salary}</td>
              <td className="border px-4 py-2">{staff.joindate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {input && (
        <div className="text-black pt-10">
          <div className="flex flex-row justify-between items-center w-full mb-4">
            <h1 className="text-2xl font-bold">Create Staff Record</h1>
            <button
              onClick={handleCancel}
              className="text-red-500 hover:underline hover:font-semibold"
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                id="name"
                value={staffData.name}
                onChange={handleChange}
                placeholder="Staff Name"
                className="border p-1"
              />
              <input
                type="text"
                name="role"
                id="role"
                value={staffData.role}
                onChange={handleChange}
                placeholder="Staff Role"
                className="border p-1"
              />
              <input
                type="text"
                name="contactnum"
                id="contactnum"
                value={staffData.contactnum}
                onChange={handleChange}
                placeholder="Contact Number"
                className="border p-1"
              />
              <input
                type="text"
                name="email"
                id="email"
                value={staffData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="border p-1"
              />
              <input
                type="number"
                name="salary"
                id="salary"
                value={staffData.salary}
                onChange={handleChange}
                placeholder="Salary"
                className="border p-1"
              />
              <h1>
                Join Date :
                <input
                  type="date"
                  name="joindate"
                  id="joindate"
                  value={staffData.joindate}
                  onChange={handleChange}
                  className="border p-1 ml-5"
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
      )}
    </div>
  );
};

export default Staffpg;
