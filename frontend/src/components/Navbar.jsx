import { React, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../contexts/UserContext";

function Navbar() {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white">
        <h1 className="text-lg md:text-2xl font-extrabold m-3">
          <Link to="/">Blogsphere</Link>
        </h1>
        {path === "/" && (
          <div
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            className="flex items-center justify-center "
          >
            <input
              className="outline-none rounded-l-xl px-3 py-2 text-black bg-white"
              placeholder="search a post"
              size={30}
              type="text"
            />
            <p
              onClick={() => {
                navigate(prompt ? "?search" + prompt : "/");
              }}
              className="cursor-pointer py-3 px-2 bg-white text-black rounded-r-xl"
            >
              <BsSearch />
            </p>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 m-3">
          {user ? (
            <h3>
              <Link to="/write">Write</Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu}>
              {" "}
              <p className="cursor-pointer relative">
                <FaBars /> {menu && <Menu />}
              </p>{" "}
            </div>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
