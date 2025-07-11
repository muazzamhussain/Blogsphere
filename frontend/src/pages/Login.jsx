import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import { UserContext } from "../contexts/UserContext";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setErr(false);
        navigate("/");
      } else {
        console.error("Request failed with status", res.status);
        setErr(true);
      }
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
          <Link to="/register">Register</Link>
        </h3>
      </div>

      {/* Form Container */}
      <div className="flex justify-center items-center flex-1 mt-5">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8 w-[90%] max-w-md">
          <h1 className="text-xl font-bold text-gunmetal mb-6">
            Log in to your account
          </h1>

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

          <div className="text-center mb-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline "
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-chrysler_blue rounded-lg hover:bg-chrysler_blue-600 transition duration-200"
          >
            Login
          </button>

          {err && (
            <p className="text-red-500 text-sm mt-4">
              Invalid credentials or server error.
            </p>
          )}

          <div className="flex justify-center items-center mt-6 text-sm text-onyx">
            <p>Create a new account?</p>
            <Link
              to="/register"
              className="ml-2 text-chrysler_blue hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
