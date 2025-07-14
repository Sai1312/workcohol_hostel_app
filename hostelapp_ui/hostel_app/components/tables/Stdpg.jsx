import api, { endpoints } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Stdpg = () => {
  const [std, setStd] = useState([]);
  const [input, setInput] = useState(false);

  // input field
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contactnum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [parentname, setParentName] = useState("");
  const [parentnum, setParentNum] = useState("");
  const [address, setAddress] = useState("");
  const [admissiondate, setAdmissionDate] = useState("");
  const [floornum, setFloorNum] = useState("");
  const [roomnum, setRoomNum] = useState("");

  //selection
  const [selectedId, setSelectedId] = useState(null);

  const fetchtbl = async () => {
    try {
    const res = await api.get(endpoints.students);
    setStd(res.data);
    } catch (err) {
      console.error("Error Fetching Data: ", err);
    }
  };

  useEffect(() => {
    fetchtbl();
  }, []);

  //submit new std
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(endpoints.students, {
        name: name,
        gender: gender,
        dob: dob,
        contactnum: contactnum,
        email: email,
        parentname: parentname,
        parentnum: parentnum,
        address: address,
        admissiondate: admissiondate,
        floornum: floornum,
        roomnum: roomnum,
      });

      console.log("Success: ", res.data);
      alert("Student Data Insertted");
      setInput(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data");
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
      <div className="text-black flex flex-row justify-end gap-2 m-3">
        <button
          onClick={() => {
            setInput(true);
          }}
        >
          Create
        </button>
        <button>Update</button>
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Delete Selected
        </button>
      </div>
      <table className="min-w-full table-auto border text-black text-center">
        <thead>
          <tr className="bg-blue-500">
            <th className=""></th>
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
            <tr
              key={std.stdid}
              onClick={() => setSelectedId(std.stdid)}
              className={`text-center border cursor-pointer ${
                selectedId === std.stdid ? "bg-blue-100" : ""
              }`}
            >
              {/* <td>
                <input
                  type="radio"  
                  name="rowSelection"
                  value={std.stdid}
                  checked={selectedId === std.stdid}
                  onChange={() => setSelectedId(std.stdid)}
                />
              </td> */}
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
      {input && (
        <div className="text-black pt-10">
          <div className="text-2xl font-bold mb-2">
            <h1>Enter New Student Details</h1>
          </div>
          <div>
            <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-1"
              />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border p-1"
              />
              <input
                type="date"
                placeholder="DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border p-1"
              />
              <input
                type="number"
                placeholder="Contact Number"
                value={contactnum}
                onChange={(e) => setContactNum(e.target.value)}
                className="border p-1"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-1"
              />
              <input
                type="text"
                placeholder="Parent Name"
                value={parentname}
                onChange={(e) => setParentName(e.target.value)}
                className="border p-1"
              />
              <input
                type="number"
                placeholder="Parent Number"
                value={parentnum}
                onChange={(e) => setParentNum(e.target.value)}
                className="border p-1"
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-1"
              />
              <input
                type="date"
                placeholder="Admission Date"
                value={admissiondate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                className="border p-1"
              />
              <input
                type="number"
                placeholder="Floor Number"
                value={floornum}
                onChange={(e) => setFloorNum(e.target.value)}
                className="border p-1"
              />
              <input
                type="number"
                placeholder="Room Number"
                value={roomnum}
                onChange={(e) => setRoomNum(e.target.value)}
                className="border p-1"
              />
            </form>
            <div className="flex justify-center m-5">
              <button type="submit" className="">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stdpg;
