import React, { useContext } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { UserContext } from "../contexts/UserContext";

function Comment({ c }) {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${URL}/api/comments/${id}`, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-3 bg-gray-100 max-w-3xl w-full rounded-md shadow-md">
      <div className="flex justify-between items-start">
        <div className="text-left">
          <h3 className="font-semibold text-gray-700">@{c.author}</h3>
          <p className="text-sm text-gray-500">
            {new Date(c.updatedAt).toDateString()}
          </p>
        </div>

        {user?._id === c?.userId && (
          <button
            onClick={() => deleteComment(c._id)}
            className="text-red-500 hover:text-red-700"
            title="Delete comment"
          >
            <MdDelete size={18} />
          </button>
        )}
      </div>

      <p className="mt-3 text-gray-800 text-left">{c.comment}</p>
    </div>
  );
}

export default Comment;
