import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function NavSide() {
  const { user, setUser, id, auth, setAuth } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser("");
    setAuth(false);
  };

  return (
    <div className="NavSide">
      {/* <div className="sideButton">Drafting Simulator</div> */}
      <Link to="/home">
        <div className="sideButton">Home</div>
      </Link>
      <Link to="/deckbuilder">
        <div className="sideButton">Deck Builder</div>
      </Link>
      <Link to="/library">
        <div className="sideButton">Card Library</div>
      </Link>

      {/* <div className="sideButton">My Decks</div> */}
      <Link to="/profile">
        <div className="sideButton">Profile</div>
      </Link>
      {/* <div className="sideButton">Settings</div> */}
      <Link to="/login">
        <div onClick={logout} className="sideButton logout">
          Logout
        </div>
      </Link>
    </div>
  );
}
