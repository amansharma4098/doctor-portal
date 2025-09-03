import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("doctorToken");

  async function fetchAppointments() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("doctorToken");
        window.location.href = "/doctor-login";
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        const withPatientNames = await Promise.all(
          data.map(async (appt) => {
            try {
              const pres = await fetch(
                `${API_BASE_URL}/patients/${appt.patient_id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              const patient = await pres.json();
              return {
                ...appt,
                patientName: patient?.name || `Patient #${appt.patient_id}`,
              };
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-center text-indigo-700">
          🩺 My Appointments
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">⏳ Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
            <p>No appointments yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-4">Patient</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b hover:bg-indigo-50 transition-colors"
                    >
                      <td className="p-4 font-medium">{a.patientName}</td>
                      <td className="p-4">
                        {new Date(a.date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            a.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : a.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {appointments.map((a) => (
                <div
                  key={a.id}
                  className="border rounded-lg shadow-sm p-4 bg-white"
                >
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-semibold mb-2">{a.patientName}</p>

                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="mb-2">
                    {new Date(a.date).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  <p className="text-sm text-gray-500">Status</p>
                  <p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        a.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : a.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
