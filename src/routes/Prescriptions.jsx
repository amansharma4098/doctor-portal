// frontend/src/pages/DoctorPrescriptions.jsx
import React, { useState } from "react";
import API_BASE_URL from "../config";

function DoctorPrescriptions() {
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [confirmReviewed, setConfirmReviewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // store prescription object returned
  const token = localStorage.getItem("doctorToken");

  function handleMedChange(index, field, value) {
    setMedicines((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function addMedicine() {
    setMedicines((prev) => [...prev, { name: "", dosage: "", frequency: "", duration: "" }]);
  }

  function removeMedicine(index) {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) return alert("Please login as doctor first.");

    if (!confirmReviewed) {
      const ok = window.confirm("Please confirm you will review AI suggestions after submission. Continue?");
      if (!ok) return;
    }

    if (!patientId) return alert("Patient ID is required.");
    if (medicines.length === 0 || medicines.some(m => !m.name.trim())) {
      return alert("Please add at least one medicine with a name.");
    }

    const payload = {
      patient_id: Number(patientId),
      diagnosis,
      notes,
      raw_medicines: medicines.map(m => ({
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        duration: m.duration,
      })),
    };

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/prescriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to create prescription");
      }

      const data = await res.json();
      setResult(data);
      alert("✅ Prescription created. AI suggestions generated (assistive).");
      // Optionally clear form:
      // setPatientId(""); setDiagnosis(""); setNotes(""); setMedicines([{name:"",dosage:"",frequency:"",duration:""}]);
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadPdf(presId, filename) {
    if (!token) return alert("Please login as doctor first.");
    try {
      const res = await fetch(`${API_BASE_URL}/prescriptions/${presId}/download`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to download PDF");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || `prescription_${presId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.message || "Download failed"));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700 mb-6">
          💊 Create Prescription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Patient ID</label>
            <input
              type="number"
              placeholder="Enter Patient ID"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Diagnosis</label>
            <textarea
              placeholder="Short diagnosis"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              rows={2}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Medicines</label>
            {medicines.map((m, i) => (
              <div key={i} className="border rounded-lg p-3 mb-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    placeholder="Name (required)"
                    className="border rounded px-2 py-1"
                    value={m.name}
                    onChange={(e) => handleMedChange(i, "name", e.target.value)}
                    required
                  />
                  <input
                    placeholder="Dosage (e.g., 500mg)"
                    className="border rounded px-2 py-1"
                    value={m.dosage}
                    onChange={(e) => handleMedChange(i, "dosage", e.target.value)}
                  />
                  <input
                    placeholder="Frequency (e.g., 2/day)"
                    className="border rounded px-2 py-1"
                    value={m.frequency}
                    onChange={(e) => handleMedChange(i, "frequency", e.target.value)}
                  />
                  <input
                    placeholder="Duration (e.g., 5 days)"
                    className="border rounded px-2 py-1"
                    value={m.duration}
                    onChange={(e) => handleMedChange(i, "duration", e.target.value)}
                  />
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeMedicine(i)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div>
              <button
                type="button"
                onClick={addMedicine}
                className="px-3 py-1 bg-green-100 text-green-800 rounded"
              >
                + Add medicine
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Notes (optional)</label>
            <textarea
              placeholder="Additional notes for patient"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="confirm"
              type="checkbox"
              checked={confirmReviewed}
              onChange={(e) => setConfirmReviewed(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="confirm" className="text-sm text-gray-700">
              I will review AI suggestions and confirm before advising patient.
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Saving..." : "Create Prescription"}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">AI suggestions (assistive)</h3>
                <div className="text-sm text-gray-600">Status: {result.llm_status}</div>
              </div>
              <div>
                <button
                  onClick={() => handleDownloadPdf(result.id, `prescription_${result.id}.pdf`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Download PDF
                </button>
              </div>
            </div>

            <div className="mt-3">
              <strong>Summary:</strong>
              <p className="whitespace-pre-wrap">{result.llm_output?.summary || "—"}</p>
            </div>

            {result.llm_output?.warnings?.length > 0 && (
              <div className="mt-2">
                <strong>Warnings:</strong>
                <ul className="list-disc ml-6">
                  {result.llm_output.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.llm_output?.suggested_dosage?.length > 0 && (
              <div className="mt-2">
                <strong>Suggested dosages:</strong>
                <ul className="list-disc ml-6">
                  {result.llm_output.suggested_dosage.map((sd, i) => (
                    <li key={i}>
                      <strong>{sd.name}</strong>: {sd.suggested} — {sd.rationale}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.llm_output?.interactions?.length > 0 && (
              <div className="mt-2">
                <strong>Interactions:</strong>
                <ul className="list-disc ml-6">
                  {result.llm_output.interactions.map((it, i) => (
                    <li key={i}>
                      {Array.isArray(it.pair) ? it.pair.join(" + ") : it.pair} — {it.issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorPrescriptions;
