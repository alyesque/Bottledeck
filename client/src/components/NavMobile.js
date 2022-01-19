import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function NavMobile() {
  const { user, setUser, id, auth, setAuth } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser("");
    setAuth(false);
  };
  return (
    <div className="navMobile">
      <Link to="/deckbuilder">
        <div className="sbMobile">Deck Builder</div>
      </Link>
      <Link to="/library">
        <div className="sbMobile">Card Library</div>
      </Link>
      <Link to="/profile">
        <div className="sbMobile">Profile</div>
      </Link>
      <Link to="/login">
        <div onClick={logout} className="sbMobile logoutMobile">
          Logout
        </div>
      </Link>
    </div>
  );
}
