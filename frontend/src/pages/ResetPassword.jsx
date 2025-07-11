import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/auth/reset-password/${token}`, { password });
      setMsg("Password reset successful. Redirecting...");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg("Reset failed. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-8">
        <h1 className="text-xl font-bold mb-4">Reset Your Password</h1>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="border p-2 rounded w-64"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Reset Password
          </button>
        </form>
        {msg && <p className="mt-4">{msg}</p>}
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
