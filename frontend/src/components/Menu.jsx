import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";

function Menu() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <div className="absolute top-12 right-4 bg-white shadow-lg rounded-lg w-[200px] z-50 p-4 flex flex-col items-start space-y-3 border text-sm">
      {!user && (
        <Link
          to="/login"
          className="text-gray-800 hover:text-blue-600 transition duration-150"
        >
          Login
        </Link>
      )}
      {!user && (
        <Link
          to="/register"
          className="text-gray-800 hover:text-blue-600 transition duration-150"
        >
          Register
        </Link>
      )}
      {user && (
        <Link
          to={`/profile/${user._id}`}
          className="text-gray-800 hover:text-blue-600 transition duration-150"
        >
          Profile
        </Link>
      )}
      {user && (
        <Link
          to="/write"
          className="text-gray-800 hover:text-blue-600 transition duration-150"
        >
          Write
        </Link>
      )}
      {user && (
        <Link
          to={`/myblogs/${user._id}`}
          className="text-gray-800 hover:text-blue-600 transition duration-150"
        >
          My Blogs
        </Link>
      )}
      {user && (
        <button
          onClick={handleLogout}
          className="text-left text-gray-800 hover:text-red-600 transition duration-150"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Menu;
