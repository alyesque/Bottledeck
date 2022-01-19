import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

export default function Register() {
  // user input refs //

  const userNameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const rePasswordRef = createRef();
  const [userNameError, setUserNameError] = useState("");
  const [success, setSuccess] = useState(false);

  const postRegister = (e) => {
    e.preventDefault();
    let userNameCheck = "";

    let body = {
      username: userNameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };

    axios
      .get("/api/v1/users/name/" + userNameRef.current.value)
      .then(function (response) {
        if (response.data.user.username !== null) {
          userNameCheck = response.data.user.username;
        }
      })
      .catch(function () {});

    setTimeout(() => {
      if (userNameCheck === userNameRef.current.value) {
        setUserNameError("This username has already been registered");
      } else {
        axios
          .post("/api/v1/users", body)
          .then(function (response) {
            setSuccess(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }, 500);
  };

  return (
    <div className="loginBox">
      {success === false && (
        <form className="loginForm" onSubmit={postRegister}>
          <h3>Register</h3>
          <p>
            Welcome to Bottledeck. By creating an account, you will gain access
            to a host of features designed to simplify deck building and card
            research.
          </p>
          <div>
            <input
              ref={userNameRef}
              type="text"
              placeholder="Desired Username"
            />
          </div>
          {userNameError !== "" && (
            <div>
              <p className="error">{userNameError}</p>
            </div>
          )}
          <div>
            <input ref={emailRef} email="email" placeholder="Email" />
          </div>
          <div>
            <input ref={passwordRef} type="password" placeholder="Password" />
          </div>

          <div>
            <button>Login</button>
          </div>
        </form>
      )}
      {success === true && (
        <div className="loginForm">
          <p>Account successfully created!</p>
          <Link className="specialLink" to="/">
            {" "}
            Click here to continue.{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
