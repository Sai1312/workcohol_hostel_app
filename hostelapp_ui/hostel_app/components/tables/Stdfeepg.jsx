import api, { endpoints } from "@/lib/api";
import authStore from "@/public/store/authStore";
import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";

const Stdfeepg = () => {
  const { id, role } = authStore();

  const [fees, setFees] = useState([]);
  const [std, setStd] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  // const [std_id, setStd_Id] = useState("");
  const [input, setInput] = useState(false);
  const [dropdown, setDropdown] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [stdData, setStdData] = useState([]);
  const [forStd, setForStd] = useState(false);
  const [forStaff, setForStaff] = useState(false);

  const [feeData, setFeeData] = useState({
    std_id: "",
    selectedStudent: null,
    amount: "",
    paymentdate: "",
    duedate: "",
    status: "",
  });

  useEffect(() => {
    if (role == "Student") {
      setForStd(true);
    } else {
      setForStaff(true);
    }

    //fetch table
    const fetchtbl = async () => {
      const res = await api.get(endpoints.hostelFees);
      setFees(res.data);
    };

    //fetch std-id
    const fetchstdid = async () => {
      try {
        const res = await api.get(endpoints.students);
        setStd(res.data);
      } catch (err) {
        console.log("print :", err);
      }
    };

    // fetch single std data in h1
    const fetchstd = async () => {
      try {
        const url = endpoints.hostelFeeStdIdDetail(id);
        const res = await api.get(url);
        console.log("URL : ", url);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setStdData(res.data[0]);
        } else {
          setStdData(null);
        }
        console.log("data :", res.data);
      } catch (err) {
        console.log("fetchstd : ", err);
      }
    };

    fetchstdid();
    fetchtbl();
    if (id) {
      fetchstd();
    }
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("ID", e.target.value);
  };

  const selectedStudent = std.find((std) => std.stdid == feeData.std_id);

  const handleCancel = async () => {
    setDropdown(true);
    setInput(false);
    setSelectedId(null);
    setFeeData({
      std_id: "",
      selectedStudent: null,
      amount: "",
      paymentdate: "",
      duedate: "",
      status: "",
    });
  };

  const handleEdit = async () => {
    if (!selectedId) return alert("Select the row");
    setDropdown(false);
    try {
      const url = endpoints.hostelFeeDetail(selectedId);
      console.log("URL :", url);
      console.log("ID :", selectedId);

      const res = await api.get(url);
      setFeeData({
        ...data,
        std_id: data.std_id?.stdid || "",
        student_name: data.std_id?.name || "",
      });

      setInput(true);
      setFeeData(res.data);
      console.log("edit data :", res.data);
      setEditMode(true);
    } catch (err) {
      console.log("edit :", err);
    }
  };

  const handleInput = (e) => {
    setFeeData({ ...feeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        const url = endpoints.hostelFeeDetail(std_id);
        await api.put(url, feeData);
        alert("updated");
      } else {
        // selectedId === std_id;
        console.log("print id", std_id);
        console.log("feeData before POST:", feeData);
        const url = endpoints.hostelFees;
        await api.post(url, feeData);
        console.log("data :", feeData);
        alert("created");
      }
      setFeeData({
        std_id: "",
        selectedStudent: null,
        amount: "",
        paymentdate: "",
        duedate: "",
        status: "",
      });
    } catch (err) {
      console.log("submit :", err);
    }
  };

  return (
    <div>
      {forStd && (
        <div className=" text-black">
          <h1 className="text-xl font-bold mb-4">Student Fee Records</h1>

          <div className="space-y-1">
            <p className="text-gray-700">
              <span className="font-medium">Student ID:</span>{" "}
              {stdData?.std_id?.stdid}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {stdData?.std_id?.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Amount:</span> ₹{stdData?.amount}
            </p>
            <p
              className={`font-medium ${
                stdData?.status === "Pending"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              Status: {stdData?.status}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Payment Date:</span>{" "}
              {stdData?.paymentdate}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Due Date:</span> {stdData?.duedate}
            </p>
          </div>
        </div>
      )}

      {forStaff && (
        <div>
          <h1 className="text-xl font-bold mb-4 text-black">
            Student Fee Records
          </h1>
          <div className="text-black flex flex-row justify-end gap-2 m-3">
            <button
              className="bg-green-300 text-white mt-4 px-4 py-2 rounded cursor-pointer"
              onClick={() => setInput(true)}
            >
              Create
            </button>

            <button
              className="bg-green-300 text-white mt-4 px-4 py-2 rounded cursor-pointer"
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </button>
          </div>
          <table className="table-auto border-collapse border text-black text-center w-full">
            <thead>
              <tr className="bg-blue-500">
                <th className="border px-4 py-2">Student Name</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Payment Date</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr
                  key={fee.feeid}
                  onClick={() => setSelectedId(fee.feeid)}
                  className={`text-center border cursor-pointer ${
                    selectedId === fee.feeid ? "bg-blue-100" : ""
                  }`}
                >
                  {/* <td className="border px-4 py-2">{fee.std_id.stdid}</td> */}
                  <td className="border px-4 py-2">{fee.std_id.name}</td>
                  <td className="border px-4 py-2">{fee.amount}</td>
                  <td className="border px-4 py-2">{fee.paymentdate}</td>
                  <td className="border px-4 py-2">{fee.duedate}</td>
                  <td className="border px-4 py-2">{fee.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {input && (
            <div className="text-black p-5">
              <div className="flex flex-row justify-between items-center w-full mb-4">
                <h1>Student Details</h1>
                <button
                  onClick={handleCancel}
                  className="text-red-500 hover:underline hover:font-semibold"
                >
                  Cancel
                </button>
              </div>
              <div>
                <form action="" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-5">
                    {dropdown && (
                      <select
                        id="std_id"
                        name="std_id"
                        typeof="number"
                        value={feeData.std_id || ""}
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
                    )}

                    <h1 className="border p-1">
                      {editMode
                        ? feeData?.std_id?.name
                        : selectedStudent
                        ? selectedStudent.name
                        : "Student Name"}
                    </h1>

                    <input
                      name="amount"
                      id="amount"
                      type="number"
                      min={"0"}
                      value={feeData.amount}
                      onChange={handleInput}
                      placeholder="Fee Amount"
                      className="border p-1"
                    />
                    <h1>
                      Payment Date :
                      <input
                        name="paymentdate"
                        id="paymentdate"
                        type="date"
                        onChange={handleInput}
                        className="border p-1 ml-2"
                        value={feeData.paymentdate}
                      />
                    </h1>
                    <h1>
                      Due Date :
                      <input
                        name="duedate"
                        id="duedate"
                        type="date"
                        onChange={handleInput}
                        className="border p-1 ml-2"
                        value={feeData.duedate}
                      />
                    </h1>
                    <input
                      name="status"
                      id="status"
                      type="text"
                      value={feeData.status}
                      onChange={handleInput}
                      placeholder="Status"
                      className="border p-1"
                    />
                  </div>
                  <div className="flex justify-center m-5">
                    <button className="bg-green-300 w-full p-1.5 font-semibold text-blue-50 text-2xl hover:bg-green-400 cursor-pointer rounded">
                      {editMode ? "UPDATE" : "CREATE"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stdfeepg;
