import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      username: "",
      password: "",
    };

    // Validate email
    if (!inputs.email || inputs.email.length < 5 || !/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Please enter a valid email address (make @ ,.com)";
      valid = false;
    }

    // Validate username
    if (!inputs.username || inputs.username.length < 5) {
      newErrors.username = "Username must be at least 5 characters long";
      valid = false;
    }

    // Validate password
    if (!inputs.password || inputs.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/register`,
        inputs
      );

      if (response.data.message === "User Already Exists") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        });
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column  w-100 p-3">
              <h1>SignUp</h1>
              <input
                className={`p-2 my-3 input-signup ${errors.email && "is-invalid"}`}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}

              <input
                className={`p-2 my-3 input-signup ${errors.username && "is-invalid"}`}
                type="text"
                name="username"
                placeholder="Enter Your Username"
                value={inputs.username}
                onChange={handleChange}
                required
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}

              <input
                className={`p-2 my-3 input-signup ${errors.password && "is-invalid"}`}
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}

              <button className="btn-signup p-2" onClick={handleSubmit}>
                Sign Up
              </button>
              <span>Already have an account?
                <Link
                  aria-current="page"
                  to="/signup"
                >
                  Login
                </Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
