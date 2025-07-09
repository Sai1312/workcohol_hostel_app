import axios from "axios";  
import React, { useEffect, useState } from "react";

const Stdfeepg = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/hostelfees/")
      .then((res) => setFees(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-black">Student Fee Records</h1>
      <div>
        //btns
        <button>Create</button>
        <button>Edit</button>
        <button>Delete</button>
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
            <tr key={fee.feeid}>
              {/* <td className="border px-4 py-2">{fee.std.stdid}</td> */}
              <td className="border px-4 py-2">{fee.std.name}</td>
              <td className="border px-4 py-2">{fee.amount}</td>
              <td className="border px-4 py-2">{fee.paymentdate}</td>
              <td className="border px-4 py-2">{fee.duedate}</td>
              <td className="border px-4 py-2">{fee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stdfeepg;
