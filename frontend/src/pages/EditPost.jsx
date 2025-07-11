import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { URL } from "../url";

function EditPost() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${id}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setFile(res.data.img);
        setCats(res.data.category || []);
      } catch (error) {
        console.log("Failed to fetch post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let img = file;

    if (file && typeof file !== "string") {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const uploadRes = await axios.post(`${URL}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        img = uploadRes.data.filename;
      } catch (error) {
        console.log("Image upload failed:", error);
      }
    }

    const updatedPost = {
      title,
      desc,
      img,
      username: user.username,
      userId: user._id,
      category: cats,
    };

    try {
      const res = await axios.put(`${URL}/api/posts/${id}`, updatedPost, {
        withCredentials: true,
      });
      navigate(`/posts/post/${res.data._id}`);
    } catch (error) {
      console.log("Post update failed:", error);
    }
  };

  const addCategory = () => {
    if (cat && !cats.includes(cat)) {
      setCats((prev) => [...prev, cat]);
      setCat("");
    }
  };

  const deleteCategory = (index) => {
    const updatedCats = [...cats];
    updatedCats.splice(index, 1);
    setCats(updatedCats);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Edit Your Post</h2>

        <form onSubmit={handleUpdate} className="space-y-6 bg-gray-100 p-8 rounded-2xl shadow-lg">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 outline-none"
              placeholder="Post title"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm"
            />
            {typeof file === "string" && (
              <img
                src={`${URL}/images/${file}`}
                alt="Preview"
                className="mt-3 w-full max-w-sm rounded-lg object-cover border"
              />
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="block mb-1 text-sm font-medium">Categories</label>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <input
                type="text"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="flex-grow px-4 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 outline-none"
                placeholder="Add category"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-chrysler_blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {cats.map((c, i) => (
                <div
                  key={i}
                  className="bg-chrysler_blue text-white px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{c}</span>
                  <ImCross
                    onClick={() => deleteCategory(i)}
                    className="cursor-pointer text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              rows="7"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 outline-none"
              placeholder="Post content..."
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-chrysler_blue text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Update Post
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EditPost;
