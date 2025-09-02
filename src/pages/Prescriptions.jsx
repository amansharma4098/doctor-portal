import React, { useState } from "react";
import API_BASE_URL from "../config";

function Prescriptions() {
  const [patient, setPatient] = useState("");
  const [medicine, setMedicine] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient, medicine }),
      });
      alert("Prescription added ✅");
      setPatient("");
      setMedicine("");
    } catch (err) {
      alert("Error saving prescription 🚨");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Prescription</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <input
          type="text"
          placeholder="Patient Name"
          className="w-full border p-2 rounded mb-4"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Medicine"
          className="w-full border p-2 rounded mb-4"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Save Prescription
        </button>
      </form>
    </div>
  );
}

export default Prescriptions;
