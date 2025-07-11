import React, { useState, useContext } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { UserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";

const URL = "http://localhost:8000";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("Artificial Intelligence");
  const [category, setCategory] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const addCategory = () => {
    if (cat && !category.includes(cat)) {
      setCategory((prev) => [...prev, cat]);
      setCat("Artificial Intelligence");
    }
  };

  const deleteCategory = (index) => {
    const updated = [...category];
    updated.splice(index, 1);
    setCategory(updated);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let img = "";

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post(`${URL}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        img = uploadRes.data.filename;
      }

      const newPost = {
        title,
        desc,
        img,
        username: user.username,
        userId: user._id,
        category,
      };

      await axios.post(`${URL}/api/posts/`, newPost, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-newwhite text-gunmetal min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create a New Post</h2>

        <form onSubmit={handleCreate} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <label className="block mb-2 font-medium text-gunmetal text-left">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
              className="w-full px-3 py-2 rounded-lg border border-onyx/20 outline-none focus:ring-2 focus:ring-chrysler_blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gunmetal text-left">Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-onyx/20 rounded-lg bg-newwhite-800 text-sm"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gunmetal text-left">Category</label>
            <div className="flex gap-2 mb-3">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="flex-1 px-3 py-2 border border-onyx/20 rounded-lg outline-none focus:ring-2 focus:ring-chrysler_blue focus:border-transparent"
              >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Big Data">Big Data</option>
                <option value="Block Chain">Block Chain</option>
                <option value="Business Management">Business Management</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Database">Database</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="DevOps">DevOps</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Operating System">Operating System</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <button
                type="button"
                onClick={addCategory}
                className="bg-chrysler_blue text-white px-4 py-2 rounded-lg hover:bg-chrysler_blue/90 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.map((c, i) => (
                <div
                  key={i}
                  className="bg-chrysler_blue text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  <span>{c}</span>
                  <ImCross
                    onClick={() => deleteCategory(i)}
                    className="cursor-pointer text-xs hover:text-red-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gunmetal text-left">Description</label>
            <textarea
              rows="5"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write your content here..."
              required
              className="w-full px-3 py-2 rounded-lg border border-onyx/20 outline-none focus:ring-2 focus:ring-chrysler_blue focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-chrysler_blue text-white font-medium py-3 rounded-lg hover:bg-chrysler_blue/90 transition-colors"
          >
            Create Post
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default CreatePost;