import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { URL } from "../url"; // Make sure this points to your backend base URL

function EditPost() {
  const { id } = useParams(); // ✅ get the param
  const postId = id;

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null); // can be string or File
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${postId}`);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setFile(res.data.img);
        setCats(res.data.category || []);
      } catch (error) {
        console.log("Failed to fetch post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let img = file; // default to current image filename

    // Upload image if user selected a new one
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
      const res = await axios.put(`${URL}/api/posts/${postId}`, updatedPost, {
        withCredentials: true,
      });
      navigate(`/posts/post/${res.data._id}`);
    } catch (error) {
      console.log("Post update failed:", error);
    }
  };

  const addCategory = () => {
    if (cat && !cats.includes(cat)) {
      const updatedCats = [...cats, cat];
      setCats(updatedCats);
      setCat("");
      console.log("Categories added:", updatedCats);
    }
  };

  const deleteCategory = (index) => {
    const updatedCats = [...cats];
    updatedCats.splice(index, 1);
    setCats(updatedCats);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="p-4 border w-[70%] flex flex-col justify-center px-6 md:px-[200px] mt-8">
          <h1 className="font-bold flex justify-center text-xl md:text-2xl">
            Update post
          </h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <input
              type="text"
              className="px-4 py-2 outline-none"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title"
              value={title}
            />
            <input
              type="file"
              className="px-4"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <input
                  type="text"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  placeholder="enter post category"
                  className="px-4 py-2 outline-none"
                />
                <div
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                  onClick={addCategory}
                >
                  Add
                </div>
              </div>
              <div className="category-4 mt-3 flex-wrap">
                {cats.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md mb-2"
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
            </div>
            <textarea
              rows={9}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className="px-4 py-2 outline-none border"
              placeholder="Enter post description"
            ></textarea>

            <button
              onClick={handleUpdate}
              className="bg-black mx-auto text-white font-semibold px-4 py-2 text-lg md:text-xl"
            >
              Update
            </button>
          </form>
        </div>
      </div>

      {/* <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="border p-2 h-40"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {typeof file === "string" && (
            <img
              src={`${URL}/images/${file}`}
              alt="Current"
              className="w-48 h-32 object-cover rounded"
            />
          )}

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add category"
              className="border p-2"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-3 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {cats.map((c, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {c}
                <ImCross
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteCategory(i)}
                />
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 p-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Post
          </button>
        </form>
      </div> */}

      <Footer />
    </div>
  );
}

export default EditPost;
