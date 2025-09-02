<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch(`${API_BASE_URL}/appointments`);
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    }
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.patient}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
=======
import React from "react";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Dashboard</h2>
      <p>Here you’ll see your appointments, patient list, and treatment history.</p>
>>>>>>> dd2856b5340a04191d8992d0ff498edeea9e6a18
    </div>
  );
}

export default Dashboard;
