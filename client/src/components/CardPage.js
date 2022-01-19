import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import "../styles/CardPage.css";
import manaCostParser from "./ManaCostParser";
import parseColor from "./ParseColors";
import ParseCardText from "./ParseCardText";
import axios from "axios";
import load from "./images/loadload.gif";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function CardPage() {
  const { user, setUser, id, auth } = useContext(UserContext);
  const [added, setAdded] = useState("default");
  const [remove, setRemove] = useState(false);
  let location = useLocation();
  let params = useParams();

  // create card useState with empty object to avoid render errors //

  const [card, setCard] = useState({
    name: "",
    imageUrl: "",
    manaCost: [],
    colorIdentity: [],
    text: "",
    empty: true,
  });

  useEffect(() => {
    // fetch card info from API if card is not passed to component as a prompt //
    if (location.state === null) {
      axios
        .get(
          "https://api.magicthegathering.io/v1/cards?contains=imageUrl&pageSize=10&id=" +
            params.id
        )
        .then((res) => {
          setCard(res.data.cards[0]);
          let favorites = [];
          let checkCard = res.data.cards[0];

          // determine if card is already in user favorites on render //

          axios
            .get("/api/v1/users/profile/" + localStorage.getItem("bdID"))
            .then((res) => {
              favorites = res.data.favoriteCards;
              if (
                favorites.filter((e) => e.name === checkCard.name).length > 0
              ) {
                setRemove(true);
              } else {
                setRemove(false);
              }
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCard(location.state.card);
    }
  }, []);

  // convert mana string from API into rendered images //

  const showManaCost = (x) => {
    if (x !== undefined) {
      return x.map((c, index) => (
        <img className="mana" src={parseColor(c)} alt="" key={index} />
      ));
    }
  };

  // similar to showManaCost but parses a different string format which the API //
  // sometimes returns //

  function showManaId(x) {
    if (x !== undefined) {
      return x.map((c, index) => (
        <img className="mana" src={parseColor(c)} alt="" key={index} />
      ));
    }
  }

  // add a card to user favorites on click //

  const addToFavorites = () => {
    let favorites = [];

    // get the user data and store returned data to array //
    // if already in favorites return an error, otherwise add to favorites //

    axios
      .get("/api/v1/users/profile/" + localStorage.getItem("bdID"))
      .then((res) => {
        favorites = res.data.favoriteCards;
        if (favorites.filter((e) => e.name === card.name).length > 0) {
          setAdded("error");
        } else {
          favorites.push(card);
          setRemove(true);
        }
        axios
          .patch("/api/v1/users/" + localStorage.getItem("bdID"), {
            favoriteCards: favorites,
          })
          .then((res) => {});
      });
  };

  // similar to above but removes a card from user favorites.//
  // same get and patch method with axios //

  const removeFromFavorites = () => {
    let favorites = [];
    axios
      .get("/api/v1/users/profile/" + localStorage.getItem("bdID"))
      .then((res) => {
        favorites = res.data.favoriteCards;
        let removedFavorites = favorites.filter(function (obj) {
          return obj.name !== card.name;
        });
        axios
          .patch("/api/v1/users/" + localStorage.getItem("bdID"), {
            favoriteCards: removedFavorites,
          })
          .then((res) => {
            setRemove(false);
          });
      });
  };

  return (
    <div className="CardPage">
      {card.empty === true && (
        <div className="loading">
          <h1>LOADING...</h1>
          <img className="load" src={load} />
        </div>
      )}
      {card.empty !== true && (
        <div className="mainBox">
          <h1>{card.name}</h1>
          <div className="CPbody1">
            <img className="cardImg" src={card.imageUrl} />
            <div className="CPright">
              <div className="manaInfo">
                <div>
                  <strong>Mana Cost: </strong>
                  {showManaId(manaCostParser(card.manaCost))}
                </div>
                <div>
                  <strong>Color Identity: </strong>
                  {showManaCost(card.colorIdentity)}
                </div>
              </div>
              <div className="box">
                <strong>Card Text: </strong> <br />
                <br />
                <div
                  dangerouslySetInnerHTML={{ __html: ParseCardText(card.text) }}
                ></div>
                {}
              </div>
              {auth === true && (
                <>
                  {remove === true && (
                    <button
                      onClick={removeFromFavorites}
                      className="favButton favError"
                    >
                      Remove from Favorites
                    </button>
                  )}
                  {remove === false && (
                    <>
                      {added === "default" && (
                        <button onClick={addToFavorites} className="favButton">
                          Add to Favorites
                        </button>
                      )}
                      {added === "added" && (
                        <button
                          onClick={addToFavorites}
                          className="favButton favAdded"
                        >
                          Added to favorites!
                        </button>
                      )}
                      {added === "error" && (
                        <button
                          onClick={addToFavorites}
                          className="favButton favError"
                        >
                          Already in favorites.
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="CPbody2">
            {card.legalities !== undefined && (
              <table className="legality">
                <tbody>
                  <tr>
                    <th>Format</th>
                    <th>legality</th>
                  </tr>
                  {card.legalities.map((legality, index) => {
                    return (
                      <tr key={index}>
                        <td>{legality.format}</td>
                        <td>{legality.legality}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {card.rulings !== undefined && (
              <table className="rulings">
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Ruling</th>
                  </tr>
                  {card.rulings.map((ruling, index) => {
                    return (
                      <tr key={index}>
                        <td>{ruling.date}</td>
                        <td> {ruling.text}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
