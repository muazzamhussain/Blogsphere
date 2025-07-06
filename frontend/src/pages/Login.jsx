import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import { UserContext } from "../contexts/UserContext";
import Footer from "../components/Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ this is important for cookies
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const cookies = res.headers.get("Set-Cookie");
        console.warn("data", data);
        console.warn("Cookies", cookies);
        setUser(data);
      } else {
        console.error("request failed with status", res.status);
      }
      navigate("/");
    } catch (error) {
      setErr(true);
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blogsphere</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Log in to account</h1>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-black outline-0"
            placeholder="enter your email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-black outline-0"
            placeholder="enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg "
          >
            Login
          </button>
          {err && (
            <h3 className="text-red-500 text-sm">Something went wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>Create new account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
