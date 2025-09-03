import React, { useState } from "react";
import API_BASE_URL from "../config";

function Patients() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("doctorToken");

  const fetchPatient = async (e) => {
    e.preventDefault();
    if (!patientId) return;

    setLoading(true);
    setError("");
    setPatient(null);

    try {
      const res = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 404) {
        setError("❌ Patient not found.");
        setLoading(false);
        return;
      }
      if (res.status === 401) {
        localStorage.removeItem("doctorToken");
        window.location.href = "/doctor-login";
        return;
      }

      const data = await res.json();
      setPatient(data);
    } catch (err) {
      console.error(err);
      setError("🚨 Error fetching patient details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-center text-indigo-700">
          👩‍⚕️ Patient Details
        </h2>

        {/* Search Bar */}
        <form
          onSubmit={fetchPatient}
          className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl shadow-md mb-6"
        >
          <input
            type="text"
            placeholder="Enter Patient ID"
            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-medium text-white shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 shadow">
            {error}
          </div>
        )}

        {/* Patient Card */}
        {patient && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Patient Profile
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Name:</span>{" "}
                {patient.name}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                {patient.email}
              </p>
              <p>
                <span className="font-semibold text-gray-900">City:</span>{" "}
                {patient.city}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Age:</span>{" "}
                {patient.age}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gender:</span>{" "}
                {patient.gender}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Patients;
