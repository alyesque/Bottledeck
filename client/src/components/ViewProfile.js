import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext, createRef } from "react";
import { UserContext } from "./contexts/UserContext";
import "../styles/Profile.css";
import { Link } from "react-router-dom";
import drawIcon from "./images/drawIcon.png";
import Loading from "./Loading";
import { useParams } from "react-router";

export default function Profile() {
  const { user, setUser, id, auth, checkAuth } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [favCards, setFavCards] = useState([]);
  const [modBio, setModBio] = useState(false);
  const [userDecksIds, setUserDecksIds] = useState([]);
  const [displaydecks, setDisplayDecks] = useState([]);
  const bioRef = createRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error404, setError404] = useState(false);
  const params = useParams();

  useEffect(() => {
    checkAuth();
    axios
      .get("/api/v1/users/name/" + params.username)
      .then((res) => {
        setProfile(res.data.user);
        setFavCards(res.data.user.favoriteCards);
        setUserDecksIds(res.data.user.decks);
      })
      .catch(() => {
        setError404(true);
      });
  }, []);

  useEffect(() => {
    let array = [];
    userDecksIds.forEach((deckId) => {
      axios.get("/api/v1/decks/" + deckId).then((res) => {
        array.push(res.data.deck);
      });
    });
    setTimeout(() => {
      setDisplayDecks(array);
      setIsLoaded(true);
    }, 900);
  }, [userDecksIds]);

  return (
    <div className="profilePage">
      {error404 === true && (
        <div className="profileBox">
          <h1>There is no user with the username {params.username}</h1>
        </div>
      )}
      {error404 === false && (
        <div className="profileBox">
          <div>
            <h1>User: {profile.username}</h1>
          </div>
          <div>
            <h4>User Bio </h4>
            <div className="bioBox">{profile.bio}</div>
          </div>
          <div>
            <h4>Decks:</h4>
            <div className="deckBoxFlex">
              {isLoaded === false && <Loading />}
              {displaydecks.length === 0 && isLoaded === true && (
                <h3>No Decks Created</h3>
              )}
              {displaydecks.length > 0 && (
                <>
                  {displaydecks.map((deck, index) => {
                    return (
                      <div className="deckBox" key={index}>
                        <Link to={`/view/deck/` + deck._id}>
                          <h5>{deck.deckname}</h5>
                          <div className="twobytwo">
                            {deck.cards.map((card, index) => {
                              if (index < 4) {
                                return <img key={index} src={card.imageUrl} />;
                              }
                            })}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div>
            <h4>Favorite Cards:</h4>
            <div className="bioBox">
              {favCards !== [] && (
                <div className="favFlex">
                  {favCards.map((c, index) => {
                    if (index < 5) {
                      return (
                        <Link
                          key={index}
                          to={`/${c.name.replace(/\\|\//g, "")}/${c.id}`}
                        >
                          <div key={index}>
                            <img src={c.imageUrl} />
                          </div>
                        </Link>
                      );
                    } else if (index === 6) {
                      return (
                        <Link key={index} to="/favorites">
                          <div className="seeMore">See All Favorites</div>
                        </Link>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
          <div>
            <h4>Favorite Decks:</h4>
            <div className="bioBox"></div>
          </div>
        </div>
      )}
    </div>
  );
}
