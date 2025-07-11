import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
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
        setPassword("");
      } catch (error) {
        console.log("Failed to fetch user data:", error);
      }
    };

    if (user?._id) fetchProfile();
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
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  return (
    <div className="bg-newwhite min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-1 px-4">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl mt-5 ">
          <h1 className="text-2xl font-bold text-center text-gunmetal mb-6">Profile Settings</h1>

          <input
            type="text"
            className="w-full px-4 py-2 mb-4 border border-onyx-900 rounded-lg outline-none text-gunmetal"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="w-full px-4 py-2 mb-4 border border-onyx-900 rounded-lg outline-none text-gunmetal"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 mb-4 border border-onyx-900 rounded-lg outline-none text-gunmetal"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between mt-6 space-x-4">
            <button
              className="flex-1 bg-chrysler_blue hover:bg-chrysler_blue-600 text-white font-semibold py-2 rounded-lg transition"
              onClick={handleUserUpdate}
            >
              Update
            </button>
            <button
              className="flex-1 bg-red-600 hover:bg-red-800 text-white font-semibold py-2 rounded-lg transition"
              onClick={handleUserDelete}
            >
              Delete
            </button>
          </div>

          {updated && (
            <p className="text-green-600 text-sm mt-4 text-center">
              ✅ Profile updated successfully
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
