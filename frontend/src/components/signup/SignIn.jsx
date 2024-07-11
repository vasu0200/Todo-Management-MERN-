import React from "react";
import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/signin`,
        Inputs
      );
      if (response.data) {
        localStorage.setItem("id", response.data.user._id);
        dispatch(authActions.login());
        navigate("/todo");
      } else {
        // Handle the case where the response does not contain the expected data
        console.error("Response data or _id not found in the response.");
      }
    } catch (error) {
      // Handle any errors that occurred during the HTTP request
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
              <div className="d-flex flex-column  w-100 p-3">
                <h1>Login</h1>
                <input
                  className="p-2  my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={Inputs.email}
                  onChange={change}
                  required
                />

                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={Inputs.password}
                  onChange={change}
                  required
                />

                <button className="btn-signup p-2" onClick={submit}>
                  Sign In
                </button>
              <span>Don`t have an account?<Link
                        aria-current="page"
                        to="/signup"
                      >
                        SignUp
                      </Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
