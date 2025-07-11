import { useContext, useState, useEffect } from "react";
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
  const { user } = useContext(UserContext);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = () => {
    navigate(prompt ? `/?search=${prompt}` : "/");
  };

  useEffect(() => {
    setMenu(false);
    setShowMobileSearch(false);
  }, [path]);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-gunmetal text-newwhite relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-lg md:text-2xl font-extrabold hover:text-white"
        >
          <img src="/logo512.png" alt="logo" className="w-9 mx-2" />
          Blogsphere
        </Link>

        {path === "/" && (
          <div className="flex sm:hidden items-center">
            <BsSearch
              aria-label="Open mobile search"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="text-xl cursor-pointer"
            />
          </div>
        )}

        {/* Search */}
        {path === "/" && (
          <div className="hidden sm:flex items-center">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Search a post"
              className="outline-none rounded-l-lg px-3 py-1 text-black bg-newwhite-800"
            />
            <button
              aria-label="Search"
              onClick={handleSearch}
              className="cursor-pointer px-3 py-2 bg-white text-black rounded-r-lg hover:bg-newwhite"
            >
              <BsSearch />
            </button>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/write" className="hover:text-white">
                Write
              </Link>
              <div
                className="cursor-pointer relative"
                onClick={() => setMenu(!menu)}
              >
                <FaBars />
                {menu && <Menu />}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden text-xl" onClick={() => setMenu(!menu)}>
          <FaBars />
          {menu && <Menu />}
        </div>
      </nav>
      {showMobileSearch && path === "/" && (
        <div className="sm:hidden px-6 pb-3 bg-gunmetal flex items-center transition-all duration-200">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Search a post"
            className="flex-grow px-3 py-1 rounded-l-lg outline-none text-gunmetal bg-newwhite-800"
          />
          <button
            onClick={() => {
              handleSearch();
              setShowMobileSearch(false);
            }}
            className="px-3 py-2 bg-newwhite text-gunmetal rounded-r-lg hover:bg-newwhite-600 transition duration-200"
          >
            <BsSearch />
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
