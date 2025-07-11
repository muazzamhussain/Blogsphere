import React from "react";

function Footer() {
  return (
    <footer className="mt-8 w-full bg-gunmetal px-6 sm:px-10 md:px-20 py-8 text-sm cursor-pointer">
      <div className="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0">
        {/* Column 1 */}
        <div className="flex flex-col text-newwhite text-center md:text-left">
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Featured Blogs
          </p>
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Most Viewed
          </p>
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Reader's Choice
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col text-newwhite text-center md:text-left">
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Forum
          </p>
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Support
          </p>
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Recent Posts
          </p>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col text-newwhite text-center md:text-left">
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Privacy Policy
          </p>
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            About Me
          </p>
          <p className="hover:text-newwhite-100 m-1 transition-colors duration-150">
            Terms & Conditions
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-newwhite-200 pt-4 text-center text-[12px] text-newwhite">
        &copy; 2025 Blogsphere by MSK. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
