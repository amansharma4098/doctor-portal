import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 mb-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-700 mb-4">
              Welcome to Raksha360 Doctor Portal 🩺
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl mb-6">
              Manage your appointments, access patient records, and update
              prescriptions — all in one place.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=600"
              alt="Doctor illustration"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Features Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-8">
          Portal Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <img
              src="https://img.freepik.com/free-vector/calendar-doctors-appointment_23-2148566545.jpg?w=600"
              alt="Appointments"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Manage Appointments
            </h3>
            <p className="text-gray-600 text-sm">
              View, confirm, or update upcoming patient appointments with ease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <img
              src="https://img.freepik.com/free-vector/medical-records-concept-illustration_114360-1536.jpg?w=600"
              alt="Patient Records"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Patient Records
            </h3>
            <p className="text-gray-600 text-sm">
              Access patient profiles, medical history, and treatment notes in
              one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <img
              src="https://img.freepik.com/free-vector/medical-prescription-concept-illustration_114360-1475.jpg?w=600"
              alt="Prescriptions"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Digital Prescriptions
            </h3>
            <p className="text-gray-600 text-sm">
              Easily update prescriptions and share them digitally with your
              patients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
