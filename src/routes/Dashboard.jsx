import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");
  const doctorId = localStorage.getItem("doctorId"); // Save this during login

  useEffect(() => {
    fetch(`${API_BASE_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Filter appointments only for this doctor
        const myAppointments = data.filter(
          (appt) => appt.doctor_id === parseInt(doctorId)
        );
        setAppointments(myAppointments);
      });
  }, [token, doctorId]);

  return (
    <div>
      <h2>My Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            Patient ID: {appt.patient_id} | Date: {appt.date} | Status: {appt.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
