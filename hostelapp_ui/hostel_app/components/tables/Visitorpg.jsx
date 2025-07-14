import api, { endpoints } from '@/lib/api';
import React, { useEffect, useState } from 'react'

const Visitorpg = () => {

  const [visitors, setVisitors] = useState()
  useEffect(() => {
    const fetchtbl = async () => {
      const res = await api.get(endpoints.visitors);
      setVisitors(res.data);
    };
    fetchtbl();    
  }, []);

  return (
    <div>
       <h1 className="text-xl font-bold mb-4 text-black">Visitor Records</h1>
       <table className="table-auto border-collapse border text-black text-center w-full">
        <thead>
          <tr className="bg-blue-500">
            <th className="border px-4 py-2">Visitor Name</th>
            <th className="border px-4 py-2">Relation</th>
            <th className="border px-4 py-2">Visit Date</th>
            <th className="border px-4 py-2">std_id</th>
            <th className="border px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.visitorid}>
              <td className="border px-4 py-2">{visitor.std_id.stdid}</td>
              <td className="border px-4 py-2">{visitor.std_id.name}</td>
              <td className="border px-4 py-2">{visitor.visitorname}</td>
              <td className="border px-4 py-2">{visitor.relation}</td>
              <td className="border px-4 py-2">{visitor.visitdate}</td>
              <td className="border px-4 py-2">{visitor.duedate}</td>
              <td className="border px-4 py-2">{visitor.status}</td>
            </tr>
          ))}
        </tbody>
       </table>
    </div>
  )
}

export default Visitorpg
