import React, { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );

      setMsg("Check your email for reset instructions.");
    } catch (err) {
      setMsg("Something went wrong.");
    }
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="flex flex-col items-center p-8">
        <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Send Reset Link
          </button>
        </form>
        {msg && <p className="mt-4">{msg}</p>}
      </div>
      <Footer/>
    </>
  );
}

export default ForgotPassword;
