import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "./styles/registrationForm.css";
import Loader from "../components/Loader/Loader";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const auth = getAuth();
  const registerUser = async () => {
    if (password === cpassword) {
      setValidationError("");
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsLoading(false);
          setEmail("");
          setPassword("");
          setCPassword("");
          toast.success("Registration Successfull");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Registration failed");
        });
    } else {
      setValidationError("PassWord and Confirm PassWord don`t match");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "cpassword") {
      setCPassword(value);
    }
  };
  return (
    <div className="registration-form">
      <div className="registartion-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_57TxAX.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            class="lottiePlayer"
          ></lottie-player>
        </div>

        <div className="col-md-4 z1">
          <div className="register-form">
            {isLoading && <Loader />}
            <h1>Register</h1>
            <hr />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              name="cpassword"
              value={cpassword}
              placeholder="Confirm Password"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
            {validationError && (
              <p style={{ color: "red" }}>{validationError}</p>
            )}
            <button onClick={registerUser}>Resgister</button>
            <p>Already have an account?</p>
            <Link to="/login">Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
