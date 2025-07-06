import React from "react";
import { IF } from "../url";

function HomePosts({ post }) {
  return (
    <div>
      <div className="h-[45vh] flex flex-wrap bg-white border-gray-200 shadow">
        <div className="overflow-hidden h-[20vh]">
          <img
            className="object-cover w-96 hover:scale-150"
            src={IF + post.img}
            alt=""
          />
        </div>
        <div className="pl-3">
          <h5 className="text-xl font-bold text-gray-900">
            {post.title}
          </h5>
          <div className="text-xs font-semibold text-gray-500">
            <p className="text-blue-400">by {post.username}</p>
            <div className="mt-3 font-normal text-gray-700">
              <p>{post.desc.slice(0.75)+"...read more"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePosts;
