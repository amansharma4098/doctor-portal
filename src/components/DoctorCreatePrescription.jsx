// frontend/src/components/DoctorCreatePrescription.jsx
import React, { useState } from "react";
import { createPrescription } from "../api/prescriptions";
import { useNavigate } from "react-router-dom";

export default function DoctorCreatePrescription({ patientId }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", frequency: "", duration: "" }]);
  const [confirmReviewed, setConfirmReviewed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  function handleMedChange(i, field, val) {
    setMedicines(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: val } : m));
  }
  function addMed() { setMedicines(prev => [...prev, { name: "", dosage: "", frequency: "", duration: "" }]); }
  function removeMed(i) { setMedicices(prev => prev.filter((_, idx) => idx !== i)); } // fallback if typos

  // correct removeMed implementation
  function removeMedCorrect(i) {
    setMedicines(prev => prev.filter((_, idx) => idx !== i));
  }

  async function submit(e) {
    e.preventDefault();
    if (medicines.length === 0) return alert("Add at least one medicine");
    if (!confirmReviewed) {
      // recommended: doctor should confirm they will review LLM output
      const ok = window.confirm("Do you confirm you will review the AI suggestions after submission?");
      if (!ok) return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const payload = {
        patient_id: Number(patientId),
        diagnosis,
        notes,
        raw_medicines: medicines
      };
      const res = await createPrescription(payload);
      setResult(res.data);
      setSubmitting(false);
      // optionally navigate to prescription detail or patient page
      alert("Prescription created — AI suggestions generated.");
      navigate(`/prescriptions/${res.data.id}`); // add route if needed
    } catch (err) {
      setSubmitting(false);
      console.error(err);
      alert(err?.response?.data?.detail || "Failed to create prescription");
    }
  }

  return (
    <div style={{maxWidth:800, margin:"0 auto"}}>
      <h2>Create Prescription</h2>
      <form onSubmit={submit}>
        <label>Diagnosis</label>
        <textarea value={diagnosis} onChange={e => setDiagnosis(e.target.value)} rows={2} />
        <label>Medicines</label>
        {medicines.map((m, i) => (
          <div key={i} style={{border:"1px solid #eee", padding:8, marginBottom:8}}>
            <input placeholder="Name" value={m.name} onChange={e => handleMedChange(i, "name", e.target.value)} required />
            <input placeholder="Dosage (e.g., 500mg)" value={m.dosage} onChange={e => handleMedChange(i, "dosage", e.target.value)} />
            <input placeholder="Frequency (e.g., 2/day)" value={m.frequency} onChange={e => handleMedChange(i, "frequency", e.target.value)} />
            <input placeholder="Duration (e.g., 5 days)" value={m.duration} onChange={e => handleMedChange(i, "duration", e.target.value)} />
            <div>
              <button type="button" onClick={() => removeMedCorrect(i)}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addMed}>Add medicine</button>

        <label>Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} />

        <div style={{marginTop:12}}>
          <label>
            <input type="checkbox" checked={confirmReviewed} onChange={e => setConfirmReviewed(e.target.checked)} />
            &nbsp;I will review the AI suggestions and confirm before recommending to patient.
          </label>
        </div>

        <div style={{marginTop:12}}>
          <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Create Prescription"}</button>
        </div>
      </form>

      {result && (
        <div style={{marginTop:20, background:"#f8f9fa", padding:12}}>
          <h3>LLM output (assistive)</h3>
          <div><strong>LLM status:</strong> {result.llm_status}</div>
          <div><strong>Summary:</strong><p>{result.llm_output?.summary}</p></div>
          {result.llm_output?.warnings?.length > 0 && (
            <>
              <strong>Warnings:</strong>
              <ul>{result.llm_output.warnings.map((w,i)=><li key={i}>{w}</li>)}</ul>
            </>
          )}
          {result.llm_output?.suggested_dosage && (
            <>
              <strong>Suggested dosage:</strong>
              <ul>
                {result.llm_output.suggested_dosage.map((sd,i) => (
                  <li key={i}><strong>{sd.name}</strong>: {sd.suggested} — {sd.rationale}</li>
                ))}
              </ul>
            </>
          )}
          <div style={{marginTop:8}}>
            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result.llm_output || {}, null, 2))}>Copy AI JSON</button>
          </div>
        </div>
      )}
    </div>
  );
}
