import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import HomePost from "../components/HomePosts";
import Loader from "../components/Loader";
import HomePosts from "../components/HomePosts";

function MyBlogs() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResult ? (
          posts.map((post) => (
            <div key={post._id} className="w-[40vh] mt-5">
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center mt-10 text-gray-500">No posts found.</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyBlogs;
