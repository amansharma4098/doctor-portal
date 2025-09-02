import React, { useState } from "react";
import API_BASE_URL from "../config";

function Patients() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const token = localStorage.getItem("doctorToken");

  const fetchPatient = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPatient(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Patient Details</h2>
      <form onSubmit={fetchPatient} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Patient ID"
          className="flex-1 border p-3 rounded"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700">
          Search
        </button>
      </form>
      {patient && (
        <div className="bg-white p-6 rounded shadow-md">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>City:</strong> {patient.city}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
        </div>
      )}
    </div>
  );
}

export default Patients;
