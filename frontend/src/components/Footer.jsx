import React from "react";

function Footer() {
  return (
    <div>
      <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8">
        <div className="flex flex-col text-white ">
          <p>Featured blogs</p>
          <p>Most viewed</p>
          <p>Reader's choice</p>
        </div>
        <div className="flex flex-col text-white ">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent posts</p>
        </div>
        <div className="flex flex-col text-white ">
          <p>Privacy policy</p>
          <p>About me</p>
          <p>Terms & conditions</p>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-white bg-black">
        All rights reserved &copy; Muazzam Hussain
      </p>
    </div>
  );
}

export default Footer;
