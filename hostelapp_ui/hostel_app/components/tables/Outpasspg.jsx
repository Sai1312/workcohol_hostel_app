import api, { endpoints } from "@/lib/api";
import authStore from "@/public/store/authStore";
import { Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Outpasspg = () => {
  const [input, setInput] = useState(false);

  const { id, role } = authStore();

  const [outpassData, setOutpassData] = useState({
    std_id: id,
    reason: "",
    whereto: "",
    outat: "",
    innat: "",
  });

  const [outpass, setOutpass] = useState([]);

  const fetchtbl = async () => {
    const res = await api.get(endpoints.outpasses);
    setOutpass(res.data);
  };

  useEffect(() => {
    fetchtbl();
  }, []);

  const handleChange = (e) => {
    setOutpassData({
      ...outpassData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const payload = {
    //   ...outpassData,
    //   std: id,
    //   console.log("id :", id);
    // };

    try {
      console.log("before Data :", outpassData);
      await api.post(endpoints.outpasses, outpassData);
      console.log("after Data :", outpassData);
      fetchtbl();
    } catch (err) {
      console.log("Submit error :", err);
    }
  };

  const handleAccept = async (outpassid) => {
    console.log("id :", outpassid);
    console.log(" staff id :", id);

    try {
      const url = endpoints.outpassDetail(outpassid);

      await api.patch(url, {
        approvedby_id: id,
        status: true,
      });
      console.log("Approve URL :", url);
      console.log("Approved");
    } catch (err) {
      console.log("Error for approvel :", err);
      console.error("Error for approvel :", err);
    }

    fetchtbl();
  };

  const handleReject = async (outpassid) => {
    console.log("id :", outpassid);

    try {
      const url = endpoints.outpassDetail(outpassid);
      await api.delete(url);
      console.log("Reject url :", url);
      alert("Reject and Deleted Successfully");
      fetchtbl();
    } catch (err) {
      console.error("Reject Error :", err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-black">OutPass Records</h1>
      <div className="text-black flex flex-row justify-end gap-2 m-3">
        <button
          className="bg-green-300 text-white mt-4 px-4 py-2 rounded cursor-pointer"
          onClick={() => {
            if (role == "Student") {
              setInput(true);
            } else {
              alert("Role is invalid!");
            }
          }}
        >
          Create
        </button>
      </div>
      <table className="table-auto border-collapse border text-black text-center w-full">
        <thead>
          <tr className="bg-blue-500">
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Reason</th>
            <th className="border px-4 py-2">Where</th>
            <th className="border px-4 py-2">Out Time</th>
            <th className="border px-4 py-2">In Time</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Approved By</th>
          </tr>
        </thead>
        <tbody>
          {outpass.map((outpass) => (
            <tr key={outpass.outpassid}>
              {/* <td className="border px-4 py-2">{outpass.std.stdid}</td> */}
              <td className="border px-4 py-2">{outpass.std.name}</td>
              <td className="border px-4 py-2">{outpass.reason}</td>
              <td className="border px-4 py-2">{outpass.whereto}</td>
              <td className="border px-4 py-2">{outpass.outat}</td>
              <td className="border px-4 py-2">{outpass.innat}</td>
              <td className="border px-4 py-2">
                {outpass.status ? "Approved" : "Pending"}
              </td>
              <td className="border px-4 py-2">{outpass?.approvedby?.name}</td>
              <td className="border px-4 py-2">
                <>
                  <button onClick={() => handleAccept(outpass.outpassid)}>
                    <Check className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleReject(outpass.outpassid)}>
                    <X className="w-5 h-5" />
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {input && (
        <div className="text-black">
          <h1>OutPass Request</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <h1>User ID: {id}</h1>
                <input
                  type="text"
                  name="reason"
                  id="reason"
                  value={outpassData.reason}
                  onChange={handleChange}
                  placeholder="Reason"
                  className="border p-1"
                />
                <input
                  type="text"
                  name="whereto"
                  id="whereto"
                  value={outpassData.whereto}
                  onChange={handleChange}
                  placeholder="Where to"
                  className="border p-1"
                />
                <h1>
                  Out Date & Time:
                  <input
                    type="datetime-local"
                    name="outat"
                    id="outat"
                    value={outpassData.outat}
                    onChange={handleChange}
                    className="border p-1"
                  />
                </h1>
                <h1>
                  Inn Date & Time:{" "}
                  <input
                    type="datetime-local"
                    name="innat"
                    id="innat"
                    value={outpassData.innat}
                    onChange={handleChange}
                    className="border p-1"
                  />
                </h1>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-green-300 w-full p-1.5 font-semibold text-blue-50 text-2xl hover:bg-green-400 cursor-pointer rounded"
                >
                  REQUEST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outpasspg;
