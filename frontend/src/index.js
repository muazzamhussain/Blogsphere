// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyBlogs from "./pages/MyBlogs";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";

import UserContextProvider from "./contexts/UserContext";

// Wrap App-like structure in a layout
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <App />
      </UserContextProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/myblogs/:id", element: <MyBlogs /> },
      { path: "/write", element: <CreatePost /> },
      { path: "/edit/:id", element: <EditPost /> },
      { path: "/posts/post/:id", element: <PostDetails /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
