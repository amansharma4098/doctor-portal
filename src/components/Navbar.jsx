import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold">Raksha360 Doctor</h1>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/prescriptions">Prescriptions</Link>
        <Link to="/login" onClick={() => localStorage.removeItem("doctorToken")}>
          Logout
        </Link>
      </div>
    </nav>
  );
}