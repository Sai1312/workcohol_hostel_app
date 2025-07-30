import api, { endpoints } from "@/lib/api";
import authStore from "@/public/store/authStore";
import React, { useEffect, useState } from "react";

const Stdpg = () => {
  const [std, setStd] = useState([]);
  const [input, setInput] = useState(false);

  const { id, role, setUser, clearUser } = authStore();

  //selection
  const [selectedId, setSelectedId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [stdData, setStdData] = useState({
    name: "",
    gender: "",
    dob: "",
    contactnum: "",
    email: "",
    parentname: "",
    parentnum: "",
    address: "",
    admissiondate: "",
    floornum: "",
    roomnum: "",
  });

  //load data in table
  useEffect(() => {
    fetchtbl();
  }, []);

  const fetchtbl = async () => {
    try {
      const res = await api.get(endpoints.students);
      setStd(res.data);
    } catch (err) {
      console.error("Error Fetching Data: ", err);
    }
  };

  //handle input
  const handleChange = (e) => {
    setStdData({ ...stdData, [e.target.name]: e.target.value });
  };

  //handle edit btn
  const hendleEdit = async () => {
    if (!selectedId) return alert("Select the row");
    try {
      const getUrl = endpoints.studentDetails(selectedId);
      console.log("URL:", getUrl);
      console.log("ID:", selectedId);

      const res = await api.get(getUrl);
      setInput(true);
      setStdData(res.data);
      setEditMode(true);
    } catch (err) {
      console.error(err);
      console.log("print: ", err);
    }
  };

  const handleCancel = async () => {
    setSelectedId(null);
    setStdData({
      name: "",
      gender: "",
      dob: "",
      contactnum: "",
      email: "",
      parentname: "",
      parentnum: "",
      address: "",
      admissiondate: "",
      floornum: "",
      roomnum: "",
    });
    setSelectedId(null);
    setInput(false);
  };

  //frm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const url = endpoints.studentDetails(selectedId);
        await api.put(url, stdData);
        alert("student update");
      } else {
        const url = endpoints.students;
        console.log("Sending data:", stdData);
        await api.post(url, stdData);
        alert("student create");
      }
      setStdData({
        name: "",
        gender: "",
        dob: "",
        contactnum: "",
        email: "",
        parentname: "",
        parentnum: "",
        address: "",
        admissiondate: "",
        floornum: "",
        roomnum: "",
      });
      setSelectedId(null);
      setEditMode(false);
      fetchtbl();
    } catch (err) {
      console.error(err);
    }
  };

  //row delete
  const handleDelete = async () => {
    if (!selectedId) {
      alert("Please select a student");
      return;
    }

    try {
      const deleteUrl = endpoints.studentDetails(selectedId);
      console.log("DELETE URL:", deleteUrl);
      console.log("Deleting ID:", selectedId);

      await api.delete(deleteUrl);
      alert(`Deleted student with ID: ${selectedId}`);
      fetchtbl();
      setSelectedId(null);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-black">Student Records</h1>
      {role == "Staff" && (
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
            onClick={() => {
              hendleEdit();
            }}
            className="bg-green-300 text-white mt-4 px-4 py-2 rounded cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white mt-4 px-4 py-2 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
      <table className="min-w-full border border-gray-300 rounded-lg shadow-sm text-sm text-gray-800">
        <thead>
          <tr className="bg-blue-500">
            <th className="border px-4 py-2">Student ID</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">DOB</th>
            <th className="border px-4 py-2">Contact No</th>
            <th className="border px-4 py-2">E-Mail</th>
            {role == "Staff" && (
              <>
                <th className="border px-4 py-2">Parent Name</th>
                <th className="border px-4 py-2">Parent No</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Admission Date</th>
              </>
            )}
            <th className="border px-4 py-2">Floor No</th>
            <th className="border px-4 py-2">Room No</th>
          </tr>
        </thead>
        <tbody>
          {std.map((std) => (
            <tr
              key={std.stdid}
              onClick={() => setSelectedId(std.stdid)}
              className={`text-center border cursor-pointer ${
                selectedId === std.stdid ? "bg-blue-100" : ""
              }`}
            >
              <td className="border px-4 py-2">{std.stdid}</td>
              <td className="border px-4 py-2">{std.name}</td>
              <td className="border px-4 py-2">{std.gender}</td>
              <td className="border px-4 py-2">{std.dob}</td>
              <td className="border px-4 py-2">{std.contactnum}</td>
              <td className="border px-4 py-2">{std.email}</td>
              {role == "Staff" && (
                <>
                  <td className="border px-4 py-2">{std.parentname}</td>
                  <td className="border px-4 py-2">{std.parentnum}</td>
                  <td className="border px-4 py-2">{std.address}</td>
                  <td className="border px-4 py-2">{std.admissiondate}</td>
                </>
              )}

              <td className="border px-4 py-2">{std.floornum}</td>
              <td className="border px-4 py-2">{std.roomnum}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {input && (
        <div className="text-black pt-10">
          <div className="flex flex-row justify-between items-center w-full mb-4">
            <h1 className="text-2xl font-bold">
              {editMode ? "Update Student Details" : "Create New Student"}
            </h1>
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
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Student Name"
                  value={stdData.name}
                  onChange={handleChange}
                  className="border p-1"
                />
                <input
                  name="gender"
                  id="gender"
                  type="text"
                  placeholder="Gender"
                  value={stdData.gender}
                  onChange={handleChange}
                  className="border p-1"
                />
                <div>
                  <h1>
                    DOB :
                    <input
                      name="dob"
                      id="dob"
                      type="date"
                      value={stdData.dob}
                      onChange={handleChange}
                      className="border p-1 ml-5"
                    />
                  </h1>
                </div>
                <input
                  name="contactnum"
                  id="contactnum"
                  type="number"
                  placeholder="Contact Number"
                  value={stdData.contactnum}
                  onChange={handleChange}
                  className="border p-1"
                />
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={stdData.email}
                  onChange={handleChange}
                  className="border p-1"
                />
                <input
                  name="parentname"
                  id="parentname"
                  type="text"
                  placeholder="Parent Name"
                  value={stdData.parentname}
                  onChange={handleChange}
                  className="border p-1"
                />
                <input
                  name="parentnum"
                  id="parentnum"
                  type="text"
                  placeholder="Parent Number"
                  value={stdData.parentnum}
                  onChange={handleChange}
                  className="border p-1"
                />
                <input
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Address"
                  value={stdData.address}
                  onChange={handleChange}
                  className="border p-1"
                />
                <div>
                  <h1>
                    Admission Date :
                    <input
                      name="admissiondate"
                      type="date"
                      value={stdData.admissiondate}
                      onChange={handleChange}
                      className="border p-1 ml-5"
                    />
                  </h1>
                </div>
                <input
                  name="floornum"
                  id="floornum"
                  type="number"
                  min={1}
                  placeholder="Floor Number"
                  value={stdData.floornum}
                  onChange={handleChange}
                  className="border p-1"
                />
                <input
                  name="roomnum"
                  id="roomnum"
                  type="number"
                  min={100}
                  placeholder="Room Number"
                  value={stdData.roomnum}
                  onChange={handleChange}
                  className="border p-1"
                />
              </div>
              <div className="flex justify-center m-5">
                <button
                  type="submit"
                  className="bg-green-300 w-full p-1.5 font-semibold text-blue-50 text-2xl hover:bg-green-400 cursor-pointer rounded"
                >
                  {editMode ? "UPDATE" : "CREATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stdpg;
