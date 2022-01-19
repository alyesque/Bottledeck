import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { user, setUser, id, auth, checkAuth } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [favCards, setFavCards] = useState([]);
  useEffect(() => {
    checkAuth();
    axios
      .get("/api/v1/users/profile/" + localStorage.getItem("bdID"))
      .then((res) => {
        setProfile(res.data);
        setFavCards(res.data.favoriteCards);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="profilePage">
      {auth === true && (
        <div className="profileBox">
          <h1>User {profile.username}'s Favorites</h1>
          <div className="favFlex bioBox">
            {favCards.map((c, index) => {
              return (
                <Link
                  key={index}
                  to={`/${c.name.replace(/\\|\//g, "")}/${c.id}`}
                >
                  <div>
                    <img src={c.imageUrl} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
