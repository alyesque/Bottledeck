import React from "react";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function NavTop() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="NavTop">
      <Link to="/">
        {" "}
        <div className="titleBox">
          <img className="logo" src={logo} />
          BOTTLEDECK
        </div>
      </Link>

      <div className="login">
        {user === "" && <Link to="/login">Login</Link>}
        {user !== "" && <div>{user}</div>}
      </div>
    </div>
  );
}
