import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../styles/Viewdeck.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function ViewDeck() {
  let params = useParams();
  const [deck, setDeck] = useState([]);
  const [displayDeck, setDisplayDeck] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/decks/" + params.id).then((res) => {
      setDeck(res.data.deck);
      testFilter(res.data.deck.cards);
    });
  }, []);

  const testFilter = (x) => {
    let newCards = x;
    let finalArray = [];

    newCards.forEach((card, index) => {
      const newIndex = newCards.findIndex((object) => {
        return object.name === card.name;
      });

      if (index === newIndex) {
        finalArray.push(card);
      }
    });
    setDisplayDeck(finalArray);
    setIsLoaded(true);
  };

  return (
    <div className="deckFrame">
      {isLoaded === false && (
        <div className="viewDeckName">
          <Loading />
        </div>
      )}
      {isLoaded === true && (
        <div className="viewDeckName">
          <h1>{deck.deckname}</h1>
          <h3 className="specHeader">
            Created by{" "}
            <Link to={`/view/profile/` + deck.username}>{deck.username} </Link>
          </h3>
          <p className="decsrip">
            <strong>Deck Description</strong>: <br />
            <br /> {deck.description}
          </p>
          <div className="deckGrid">
            <div className="creature">
              {deck.cards !== undefined && (
                <>
                  <h4>Creatures:</h4>
                  {displayDeck.map((card, index) => {
                    if (card.types.includes("Creature")) {
                      return (
                        <Link
                          to={`/${card.name.replace(/\\|\//g, "")}/${card.id}`}
                        >
                          <div key={index}>
                            {" "}
                            x
                            {
                              deck.cards.filter(
                                (item) => item.name == card.name
                              ).length
                            }{" "}
                            - {card.name}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </>
              )}
            </div>
            <div className="spells">
              {deck.cards !== undefined && (
                <>
                  <h4>Spells:</h4>
                  {displayDeck.map((card, index) => {
                    if (
                      card.types.includes("Instant") ||
                      card.types.includes("Sorcery")
                    ) {
                      return (
                        <Link
                          to={`/${card.name.replace(/\\|\//g, "")}/${card.id}`}
                        >
                          <div key={index}>
                            {" "}
                            x
                            {
                              deck.cards.filter(
                                (item) => item.name == card.name
                              ).length
                            }{" "}
                            - {card.name}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </>
              )}
            </div>
            <div className="artifacts">
              {deck.cards !== undefined && (
                <>
                  <h4>Artifacts:</h4>
                  {displayDeck.map((card, index) => {
                    if (card.types.includes("Artifact")) {
                      return (
                        <Link
                          to={`/${card.name.replace(/\\|\//g, "")}/${card.id}`}
                        >
                          <div key={index}>
                            {" "}
                            x
                            {
                              deck.cards.filter(
                                (item) => item.name == card.name
                              ).length
                            }{" "}
                            - {card.name}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </>
              )}
            </div>
            <div className="enchantments">
              {deck.cards !== undefined && (
                <>
                  <h4>Enchantments:</h4>
                  {displayDeck.map((card, index) => {
                    if (
                      card.types.includes("Enchantment") &&
                      card.types.includes("Creature") === false
                    ) {
                      return (
                        <Link
                          to={`/${card.name.replace(/\\|\//g, "")}/${card.id}`}
                        >
                          <div key={index}>
                            {" "}
                            x
                            {
                              deck.cards.filter(
                                (item) => item.name == card.name
                              ).length
                            }{" "}
                            - {card.name}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </>
              )}
            </div>
            <div className="lands">
              {deck.cards !== undefined && (
                <>
                  <h4>Lands:</h4>
                  {displayDeck.map((card, index) => {
                    if (card.types.includes("Land")) {
                      return (
                        <Link
                          to={`/${card.name.replace(/\\|\//g, "")}/${card.id}`}
                        >
                          <div key={index}>
                            {" "}
                            x
                            {
                              deck.cards.filter(
                                (item) => item.name == card.name
                              ).length
                            }{" "}
                            - {card.name}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </>
              )}
            </div>
          </div>
          <h2 className="specHeader"> View Cards: </h2>
          <div className="viewCardsFlex">
            {displayDeck.map((card, index) => {
              return (
                <div className="card3" key={index}>
                  <Link to={`/${card.name.replace(/\\|\//g, "")}/${card.id}`}>
                    <img src={card.imageUrl} />x
                  </Link>
                  {deck.cards.filter((item) => item.name == card.name).length}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
