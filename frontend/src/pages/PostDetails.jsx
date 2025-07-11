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

function PostDetails() {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("Post fetch failed:", err);
      }
    };

    const fetchComments = async () => {
      try {
        setLoader(true);
        const res = await axios.get(`${URL}/api/comments/post/${postId}`);
        setComments(res.data);
        setLoader(false);
      } catch (err) {
        setLoader(false);
        console.error("Comments fetch failed:", err);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handlePostDelete = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
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
      setComment("");
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-newwhite text-gunmetal">
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={IF + post.img}
                alt="Post"
                className="w-full h-64 object-cover"
              />
              {user?._id === post?.userId && (
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => navigate("/edit/" + postId)}
                    className="p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
                  >
                    <BiEdit className="w-4 h-4 text-gunmetal hover:text-chrysler_blue" />
                  </button>
                  <button
                    onClick={handlePostDelete}
                    className="p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
                  >
                    <MdDelete className="w-4 h-4 text-gunmetal hover:text-red-600" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {post?.category?.map((cat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-chrysler_blue text-white text-sm rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl font-bold text-gunmetal mb-4">
                {post?.title}
              </h1>

              <p className="text-onyx leading-relaxed bg-newwhite-800 p-4 rounded-lg">
                {post.desc}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-bold text-gunmetal">Comments</h2>
                <span className="px-2 py-1 bg-newwhite text-onyx rounded-full text-xs">
                  {comments.length}
                </span>
              </div>

              {user && (
                <form
                  onSubmit={postComment}
                  className="mb-6 p-4 bg-newwhite-800 rounded-lg"
                >
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 border border-onyx/20 rounded-lg outline-none focus:ring-2 focus:ring-chrysler_blue focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-chrysler_blue text-white rounded-lg hover:bg-chrysler_blue/90 transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((c) => (
                    <Comment key={c._id} c={c} post={post} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-onyx/60">No comments yet</p>
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