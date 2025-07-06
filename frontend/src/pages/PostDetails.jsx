import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { UserContext } from "../contexts/UserContext";
import Loader from "../components/Loader";
import { FcManager } from "react-icons/fc";

function PostDetails() {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
      setError(null);
    } catch (error) {
      setError("Post not found");
      console.error("Error fetching post:", error);
    }
  };

  const handlePostDelete = async () => {
    try {
      const res = await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data); // ✅ Correct setter
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/comments/create`,
        {
          comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComment(""); // ✅ Clear input
      fetchPostComments(); // ✅ Re-fetch comments
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-10 ms:px-[200px] mt-8">
          <div className="border p-3 shadow">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-black md:text-3xl">
                {post?.title || "Loading..."}
              </h1>

              {user?._id === post?.userId && (
                <div className="flex items-center justity-center space-x-2">
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/edit/" + postId)}
                  >
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handlePostDelete}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col justify-center">
              <img
                src={IF + post.img}
                alt=""
                className="object-cover h-[45vh] mx-auto mt-8"
              />
              <p className="mx-auto mt-8 w-[80vh] border p-5 shadow-xl">
                {post.desc}
              </p>
              <div className="flex justify-center items-center mt-8 space-x-4 font-semibold">
                <p>Categories</p>
                <div className="flex justify-center items-center space-x-2">
                  {post.category?.map((c, i) => (
                    <div key={i} className="bg-gray-300 rounded-xl px-3 py-1">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              {/* Comments Section */}
              <div className="flex flex-col items-center mt-8">
                <h3 className="text-xl font-semibold mb-4">Comments:</h3>

                <div className="space-y-4 w-full max-w-[700px]">
                  {comments?.length > 0 ? (
                    comments.map((c) => (
                      <Comment key={c._id} c={c} post={post} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No comments yet.
                    </p>
                  )}
                </div>

                {/* Add comment form */}
                {user && (
                  <div className="border flex flex-col md:flex-row justify-center mt-6 w-full max-w-[700px]">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment"
                      className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
                    />
                    <button
                      className="bg-black text-sm text-white font-semibold px-2 py-4 md:w-[20%] mt-4 md:mt-0"
                      onClick={postComment}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PostDetails;
