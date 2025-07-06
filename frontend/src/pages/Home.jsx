import React from "react";
import axios from "axios";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { UserContext } from "../contexts/UserContext";
import { URL } from "../url";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsPass } from "react-icons/bs";

function Home() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts" + search);
      setPosts(res.data);
      setFilterData(res.data);
      let cata = res.data.map((item) => {
        return item.category; // ✅ use correct field name
      });
      let sets = new Set();
      cata.forEach((category) => {
        category?.forEach((c) => {
          if (c.length > 0) sets.add(c);
        });
      });
      setCat(Array.from(sets));

      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const filtData = (filterData) => {
    let newPosts = posts.filter((post) => {
      return post?.category.includes(filterData);
    });
    setFilterData(newPosts);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap">
        <div className="p-3 m-5 flex flex-wrap justify-center">
          <button
            className="p-3 m-5 h-[90px] w-[150px] border- text-lg font-semibold bg-white hover:shadow-blue-200 shadow shadow-black"
            onClick={() => setFilterData(posts)}
            type="button"
          >
            All
          </button>
          {cat.length > 0 &&
            cat.map((category) => {
              return (
                <button
                  key={category}
                  className="p-3 m-5 h-[90px] w-[150px] border- text-lg font-semibold bg-white hover:shadow-blue-200 shadow shadow-black"
                  onClick={() => filtData(category)}
                  type="button"
                >
                  {category}
                </button>
              );
            })}
        </div>
      </div>
      <div className="flex flex-wrap w-[95%] justify-center">
        {loader ? (
          <div className="h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : noResults ? (
          <p className="text-center mt-10 text-gray-500">No results found.</p>
        ) : (
          filterData.map((post) => (
            <div
              key={post._id}
              className="flex flex-wrap m-2 sm:w-[35vw] lg:w-[45vw] md:w-[50vw]"
            >
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
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
