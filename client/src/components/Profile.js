import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext, createRef } from "react";
import { UserContext } from "./contexts/UserContext";
import "../styles/Profile.css";
import { Link } from "react-router-dom";
import drawIcon from "./images/drawIcon.png";
import Loading from "./Loading";

export default function Profile() {
  const { user, setUser, id, auth, checkAuth } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [favCards, setFavCards] = useState([]);
  const [modBio, setModBio] = useState(false);
  const [userDecksIds, setUserDecksIds] = useState([]);
  const [displaydecks, setDisplayDecks] = useState([]);
  const bioRef = createRef();
  const [isLoaded, setIsLoaded] = useState(false);

  // check if login is authorized and fetch user data //

  useEffect(() => {
    checkAuth();
    axios
      .get("/api/v1/users/profile/" + localStorage.getItem("bdID"))
      .then((res) => {
        setProfile(res.data);
        setFavCards(res.data.favoriteCards);
        setUserDecksIds(res.data.decks);
      })
      .catch(() => {});
  }, []);

  // create a state array to display deck information and fetch decks //

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

  // refetch user data after modifying bio  //

  useEffect(() => {
    checkAuth();
    axios
      .get("/api/v1/users/profile/" + localStorage.getItem("bdID"))
      .then((res) => {
        setProfile(res.data);
        setFavCards(res.data.favoriteCards);
      })
      .catch(() => {});
  }, [modBio]);

  // display textarea when user clicks edit button//

  const modifyBio = () => {
    if (modBio === false) {
      setModBio(true);
    } else {
      setModBio(false);
    }
  };

  // create patch request to add new bio to user object //

  const modPost = () => {
    axios
      .patch("/api/v1/users/" + localStorage.getItem("bdID"), {
        bio: bioRef.current.value,
      })
      .then((res) => {});
    setModBio(false);
  };

  return (
    <div className="profilePage">
      {auth === true && (
        <div className="profileBox">
          <div>
            <h1>User: {profile.username}</h1>
          </div>
          <div>
            <h4>
              User Bio{" "}
              <img onClick={modifyBio} className="icon" src={drawIcon} />:
            </h4>
            {modBio === false && <div className="bioBox">{profile.bio}</div>}
            {modBio === true && (
              <div className="bioBox">
                <textarea
                  ref={bioRef}
                  placeholder="Enter new bio here..."
                  className="textArea"
                  rows="13"
                />
                <button onClick={modPost} className="subMod">
                  Submit
                </button>
              </div>
            )}
          </div>
          <div>
            <h4>Decks:</h4>
            <div className="deckBoxFlex">
              {isLoaded === false && <Loading />}

              {/* check if decks exist in user object and render accordingly */}

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
