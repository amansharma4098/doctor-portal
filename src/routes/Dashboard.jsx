import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("doctorToken");

  async function fetchAppointments() {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        const withPatientNames = await Promise.all(
          data.map(async (appt) => {
            try {
              const pres = await fetch(
                `${API_BASE_URL}/patients/${appt.patient_id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const patient = await pres.json();
              return { ...appt, patientName: patient?.name || `Patient #${appt.patient_id}` };
            } catch {
              return { ...appt, patientName: `Patient #${appt.patient_id}` };
            }
          })
        );
        setAppointments(withPatientNames);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-blue-50">
                <td className="p-3">{a.patientName}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
