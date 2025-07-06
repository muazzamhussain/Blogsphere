import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url"; // ✅ Fix: make sure this is correct
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${URL}/api/users/${user._id}`, {
          withCredentials: true,
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(""); // don't pre-fill password
      } catch (error) {
        console.log("Failed to fetch user data:", error);
      }
    };

    if (user?._id) {
      fetchProfile();
    }
  }, [user]);

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        `${URL}/api/users/${user._id}`,
        { username, email, password },
        { withCredentials: true }
      );
      console.log("User updated:", res.data);
      setUpdated(true);
    } catch (error) {
      console.log("Update failed:", error);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      console.log("User deleted:", res.data);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="border p-3 text-center align-middle flex justify-center w-[50%] mx-auto mt-8 shadow-2xl shadow-gray-500">
        <div className="flex flex-col space-y-4 justify-center text-center w-full max-w-md">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input
            type="text"
            className="outline-none py-2 px-3 border"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="outline-none py-2 px-3 border"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="outline-none py-2 px-3 border"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between mt-8 space-x-4">
            <button
              className="bg-black text-white px-4 py-2 font-semibold hover:bg-gray-800"
              onClick={handleUserUpdate}
            >
              Update
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 font-semibold hover:bg-red-800"
              onClick={handleUserDelete}
            >
              Delete
            </button>
          </div>
          {updated && (
            <h3 className="text-green-500 text-sm mt-4">
              User data updated successfully ✅
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
