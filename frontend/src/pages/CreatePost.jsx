import React, { useState, useContext } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { UserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";

// Update to match your backend's port
const URL = "http://localhost:8000";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("Artificial Intelligence");
  const [category, setcategory] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const addCategory = () => {
    if (cat && !category.includes(cat)) {
      const updatedCats = [...category, cat];
      setcategory(updatedCats);
      console.log("Categories added:", updatedCats); // ✅ Debug
      setCat("Artifical Intelligence");
    }
  };

  const deleteCategory = (i) => {
    const updatedcategory = [...category];
    updatedcategory.splice(i, 1);
    setcategory(updatedcategory);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let img = "";

    try {
      // 1. Upload image first
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post(`${URL}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        img = uploadRes.data.filename; // ✅ Use filename returned by backend
      }

      // 2. Create new post with uploaded image filename
      const newPost = {
        title,
        desc,
        img, // ✅ Correct filename from backend
        username: user.username,
        userId: user._id,
        category,
      };

      await axios.post(`${URL}/api/posts/`, newPost, {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="px-6 m-4 border flex flex-col w-[70%] shadow-xl md:px-[200px] mt-8">
          <h1 className="font-bold text-2xl mt-3 flex justify-center">
            Create Post
          </h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <input
              type="text"
              placeholder="Enter post title"
              className="px-4 py-4 outline-none border"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="px-4"
            />

            {/* Category Section */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Big Data">Big Data</option>
                  <option value="Block Chain">Block Chain</option>
                  <option value="Business Management">
                    Business Management
                  </option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Database">Database</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Operating System">Operating System</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
                <div
                  onClick={addCategory}
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                >
                  ADD
                </div>
              </div>

              {/* Display added categories */}
              <div className="flex px-4 mt-3 flex-wrap">
                {category.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md mb-2"
                  >
                    <p>{c}</p>
                    <span
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                    >
                      <ImCross />
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <textarea
                rows={9}
                onChange={(e) => setDesc(e.target.value)}
                className="px-4 py-2 outline-none border"
                placeholder="Enter post description"
              ></textarea>

              <button
                onClick={handleCreate}
                className="bg-black mx-auto text-white font-semibold px-4 py-2 text-lg md:text-xl"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
