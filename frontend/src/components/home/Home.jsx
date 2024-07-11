import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column ">
        <h1 className="text-center">
          Organize your todo's
        </h1>
        <p>
          Become focused, organized, and calm with <br />
          todo app. The World's #1 Todo-Management App.
        </p>
        <button class="home-btn p-2"><Link
          className="nav-link active btn-nav p-2"
          aria-current="page"
          to="/signin"
        >
          Make Todo List
        </Link></button>
      </div>
    </div>
  );
};

export default Home;
