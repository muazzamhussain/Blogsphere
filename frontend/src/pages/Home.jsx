import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import HomePosts from "../components/HomePosts";
import { UserContext } from "../contexts/UserContext";
import { URL } from "../url";

function Home() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [activeCat, setActiveCat] = useState("All");

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts" + search);
      setPosts(res.data);
      setFilterData(res.data);

      // Extract unique categories
      const categories = new Set();
      res.data.forEach((item) => {
        item.category?.forEach((c) => {
          if (c?.length > 0) categories.add(c);
        });
      });

      setCat(Array.from(categories));
      setNoResults(res.data.length === 0);
    } catch (error) {
      console.error(error);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const filtData = (selectedCat) => {
    const newPosts = posts.filter((post) =>
      post?.category?.includes(selectedCat)
    );
    setFilterData(newPosts);
    setActiveCat(selectedCat);
  };

  return (
    <div className="bg-newwhite min-h-screen">
      <Navbar />

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center px-4 py-6">
        <h1 className="text-xl font-bold mt-9">Categories: </h1>
        <button
          className={`p-3 m-2 w-full sm:w-[150px] h-[90px] border text-lg font-semibold transition duration-200 ease-in-out rounded-xl
            ${
              activeCat === "All"
                ? "bg-chrysler_blue text-newwhite shadow-md"
                : "bg-newwhite-900 text-gunmetal border-onyx hover:bg-newwhite-600"
            }
          `}
          onClick={() => {
            setFilterData(posts);
            setActiveCat("All");
          }}
          type="button"
        >
          All
        </button>

        {cat.length > 0 &&
          cat.map((category) => (
            <button
              key={category}
              className={`p-3 m-2 w-full sm:w-[150px] h-[90px] border text-lg font-semibold transition duration-200 ease-in-out rounded-xl
                ${
                  activeCat === category
                    ? "bg-chrysler_blue text-newwhite shadow-md "
                    : "bg-newwhite-900 text-gunmetal border-onyx hover:bg-newwhite-600"
                }
              `}
              onClick={() => filtData(category)}
              type="button"
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
      </div>

      {/* Posts */}
      <div className="flex flex-wrap w-[95%] justify-center">
        {loader ? (
          <div className="h-[60vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : noResults ? (
          <p className="text-center mt-10 text-onyx-600">No results found.</p>
        ) : (
          filterData.map((post) => (
            <div
              key={post._id}
              className="flex flex-wrap m-2 sm:w-[35vw] lg:w-[45vw] md:w-[50vw]"
            >
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
