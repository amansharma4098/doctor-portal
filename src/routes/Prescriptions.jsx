import React, { useState } from "react";
import API_BASE_URL from "../config";

function Prescriptions() {
  const [patientId, setPatientId] = useState("");
  const [medicine, setMedicine] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("doctorToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/prescriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ secure
        },
        body: JSON.stringify({ patient_id: patientId, medicine }),
      });

      if (res.ok) {
        alert("✅ Prescription added successfully");
        setPatientId("");
        setMedicine("");
      } else {
        const err = await res.json();
        alert(`❌ Failed: ${err.detail || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error saving prescription:", err);
      alert("🚨 Error saving prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700 mb-6">
          💊 Add Prescription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Patient ID
            </label>
            <input
              type="text"
              placeholder="Enter Patient ID"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Medicine
            </label>
            <input
              type="text"
              placeholder="Enter Medicine Name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Saving..." : "Save Prescription"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Prescriptions;
