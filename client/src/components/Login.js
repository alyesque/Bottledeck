import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { createRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [userNameError, setUserNameError] = useState("");
  const [pwError, setPwError] = useState("");
  const [success, setSuccess] = useState(false);

  const usernameRef = createRef();
  const passwordRef = createRef();

  const login = (e) => {
    let username = usernameRef.current.value;
    e.preventDefault();

    let isMatch;

    axios
      .get("/api/v1/users/name/" + usernameRef.current.value)
      .then(function (response) {
        isMatch = true;
        setUserNameError("");
      })
      .catch(function (error) {
        isMatch = false;
        setUserNameError("This username is not registered.");
      });

    setTimeout(() => {
      if (isMatch === true) {
        axios
          .post("api/v1/users/login/" + usernameRef.current.value, {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          })
          .then(function (response) {
            if (response.data === "Password does not match") {
              setPwError("Incorrect Password");
            } else if (response.data.auth === true) {
              setPwError("");
              setSuccess(true);
              setUser(response.data.results.username);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("bdID", response.data.results.userId);
              localStorage.setItem("bdUN", response.data.results.username);
            }
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
        <form className="loginForm" onSubmit={login}>
          <h3>Login</h3>
          <div>
            <input ref={usernameRef} type="text" placeholder="Username" />
          </div>

          {userNameError !== "" && (
            <div>
              <p className="error">{userNameError}</p>
            </div>
          )}
          <div>
            <input ref={passwordRef} type="password" placeholder="Password" />
          </div>
          {pwError !== "" && (
            <div>
              <p className="error">{pwError}</p>
            </div>
          )}
          <div>
            <button>Login</button>
          </div>
          <p>
            If you do not have an account, you{" "}
            <Link to="/register" className="specialLink">
              may register here
            </Link>
            .
          </p>
        </form>
      )}
      {success === true && (
        <div className="loginForm">
          <p>Successfully logged in!</p>
          <Link className="specialLink" to="/profile">
            {" "}
            Click here to continue.{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
