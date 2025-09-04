import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("doctorToken");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="font-bold text-lg">Raksha360 Doctor</h1>

      {/* Hamburger button for small screens */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              menuOpen
                ? "M6 18L18 6M6 6l12 12" // X icon
                : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
            }
          />
        </svg>
      </button>

      {/* Links container */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-blue-600 text-center md:static md:block md:w-auto md:text-white`}
      >
        <div className="flex flex-col md:flex-row md:space-x-6 py-4 md:py-0">
          {!token ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/patients"
                className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent"
                onClick={() => setMenuOpen(false)}
              >
                Patients
              </Link>
              <Link
                to="/prescriptions"
                className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent"
                onClick={() => setMenuOpen(false)}
              >
                Prescriptions
              </Link>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("doctorToken");
                  setMenuOpen(false);
                }}
                className="block px-4 py-2 hover:bg-blue-700 md:hover:bg-transparent"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
