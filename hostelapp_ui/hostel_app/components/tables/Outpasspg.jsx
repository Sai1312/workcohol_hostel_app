import api, { endpoints } from '@/lib/api';
import React, { useEffect, useState } from 'react'

const Outpasspg = () => {

    const [outpass, setOutpass] = useState()
    useEffect(() => {
        const fetchtbl = async () => {
            const res = await api.get(endpoints.outpasses);
            setOutpass(res.data);
        };
        fetchtbl();
    }, []);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-black">Visitor Records</h1>
       <table className="table-auto border-collapse border text-black text-center w-full">
        <thead>
          <tr className="bg-blue-500">
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Reason</th>
            <th className="border px-4 py-2">Where</th>
            <th className="border px-4 py-2">Out Time</th>
            <th className="border px-4 py-2">In Time</th>
            <th className="border px-4 py-2">Approved By</th>
          </tr>
        </thead>
        <tbody>
          {outpass.map((outpass) => (
            <tr key={outpass.visitorid}>
              <td className="border px-4 py-2">{outpass.std_id.stdid}</td>
              <td className="border px-4 py-2">{outpass.std_id.name}</td>
              <td className="border px-4 py-2">{outpass.reason}</td>
              <td className="border px-4 py-2">{outpass.whereto}</td>
              <td className="border px-4 py-2">{outpass.outat}</td>
              <td className="border px-4 py-2">{outpass.innat}</td>
              <td className="border px-4 py-2">{outpass.approvedby_id}</td>
            </tr>
          ))}
        </tbody>
       </table>
    </div>
  )
}

export default Outpasspg
