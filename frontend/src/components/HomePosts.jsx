import React from "react";
import { IF } from "../url";

function HomePosts({ post }) {
  return (
    <div className="h-[45vh] w-full bg-newwhite border border-onyx-800 shadow hover:shadow-lg transition duration-300 rounded-lg overflow-hidden">
      {/* Image */}
      <div className="h-[50%] w-full overflow-hidden">
        <img
          src={IF + post.img}
          alt="Post thumbnail"
          className="w-full h-full object-cover transform hover:scale-110 transition duration-300 ease-in-out"
        />
      </div>

      {/* Text content */}
      <div className="p-3 h-[50%] flex flex-col ">
        <h5 className="text-xl text-left font-bold text-gunmetal line-clamp-2">
          {post.title}
        </h5>

        <p className="text-xs text-chrysler_blue font-semibold mt-1 text-left">
          by {post.username}
        </p>

        <p className="text-sm text-onyx-600 mt-2">
          {post.desc?.slice(0, 75)}
          <span className="text-chrysler_blue font-semibold">...read more</span>
        </p>
        <p className="text-sm text-onyx-500 mt-2 text-right">
          {post.createdAt.toLocaleString().slice(0, 10)}
        </p>
      </div>
    </div>
  );
}

export default HomePosts;
