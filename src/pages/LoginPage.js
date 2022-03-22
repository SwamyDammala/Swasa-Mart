import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./styles/login.css";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const loginUser = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successfull");
        localStorage.setItem("loginUser", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Login failed");
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <div className="login-page">
        <div className="row justify-content-center">
          <div className="col-md-4 z1">
            <div className="login-form">
              {isLoading && <Loader />}
              <h1>Login</h1>
              <hr />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
              <button onClick={loginUser}>Login</button>
              <p>Don't have account?</p>
              <Link to="/registration">Register Here</Link>
            </div>
          </div>
          <div className="col-md-5 z1">
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_57TxAX.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              class="lottiePlayer"
            ></lottie-player>
          </div>
        </div>
        <div className="login-bottom"></div>
    </div>
    /* </div> */
  );
};

export default Login;
