const handleSignup = async (e) => {
  e.preventDefault();
  setMessage("");
  try {
    const res = await fetch(
      `${API_BASE_URL}/auth/doctor/signup?` + new URLSearchParams(form),
      { method: "POST" }
    );
    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Signup successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setMessage(`❌ Error: ${data.detail || "Signup failed"}`);
    }
  } catch (err) {
    setMessage("❌ Something went wrong. Please try again.");
    console.error(err);
  }
};
