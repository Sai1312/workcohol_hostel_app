import api, { endpoints } from '@/lib/api';
import React, { useEffect, useState } from 'react'

const Outpasspg = () => {

  const outpass = ([
  {
    visitorid: 1,
    std_id: {
      stdid: 'S101',
      name: 'Rahul Sharma'
    },
    reason: 'Family Visit',
    whereto: 'Delhi',
    outat: '2025-07-10 09:00',
    innat: '2025-07-12 18:00',
    approvedby_id: 'Warden A'
  },
  {
    visitorid: 2,
    std_id: {
      stdid: 'S102',
      name: 'Priya Verma'
    },
    reason: 'Medical Appointment',
    whereto: 'Chandigarh',
    outat: '2025-07-11 08:30',
    innat: '2025-07-11 17:00',
    approvedby_id: 'Warden B'
  },
  {
    visitorid: 3,
    std_id: {
      stdid: 'S103',
      name: 'Aman Gupta'
    },
    reason: 'Personal Work',
    whereto: 'Lucknow',
    outat: '2025-07-09 15:00',
    innat: '2025-07-10 20:00',
    approvedby_id: 'Warden C'
  }
]);

    // const [outpass, setOutpass] = useState()
    // useEffect(() => {
    //     const fetchtbl = async () => {
    //         const res = await api.get(endpoints.outpasses);
    //         setOutpass(res.data);
    //     };
    //     fetchtbl();
    // }, []);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-black">OutPass Records</h1>
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
