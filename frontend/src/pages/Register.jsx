import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import Footer from "../components/Footer";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setErr(false);
      navigate("/login");
    } catch (error) {
      setErr(true);
      console.error(error);
    }
  };

  return (
    <div className="bg-newwhite min-h-screen flex flex-col justify-between">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gunmetal text-newwhite">
        <h1 className="text-lg md:text-xl font-extrabold hover:text-white">
          <Link to="/">Blogsphere</Link>
        </h1>
        <h3 className="hover:text-white">
          <Link to="/login">Login</Link>
        </h3>
      </div>

      {/* Form Container */}
      <div className="flex justify-center items-center flex-1 mt-5">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8 w-[90%] max-w-md">
          <h1 className="text-xl font-bold text-gunmetal mb-6">
            Create an account
          </h1>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-onyx-900 rounded-lg focus:outline-chrysler_blue text-gunmetal"
            placeholder="Enter your name"
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-onyx-900 rounded-lg focus:outline-chrysler_blue text-gunmetal"
            placeholder="Enter your email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-onyx-900 rounded-lg focus:outline-chrysler_blue text-gunmetal"
            placeholder="Enter your password"
          />

          <button
            onClick={handleRegister}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-chrysler_blue rounded-lg hover:bg-chrysler_blue-600 transition duration-200"
          >
            Register
          </button>

          {err && (
            <p className="text-red-500 text-sm mt-4">Something went wrong</p>
          )}

          <div className="flex justify-center items-center mt-6 text-sm text-onyx">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="ml-2 text-chrysler_blue hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
