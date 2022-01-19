import React, { useEffect, useState } from "react";
import "../styles/RenderCards.css";
import { Link } from "react-router-dom";

export default function RenderCards({ cards, deck, setDeck }) {
  const [currentCardPage, setCurrentCardPage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [subDeck, setSubDeck] = useState([]);

  const createPagination = (cards) => {
    let masterArray = [];
    let firstArray = [];
    let secondArray = [];
    let thirdArray = [];
    let fourthArray = [];
    let fifthArray = [];
    let sixthArray = [];
    let seventhArray = [];
    let eighthArray = [];
    let increment = 0;

    cards.map((card, index) => {
      if (index < 12) {
        firstArray.push(card);
        increment++;
      } else if (index > 12 && index < 25) {
        secondArray.push(card);
        increment++;
      } else if (index > 24 && index < 37) {
        thirdArray.push(card);
        increment++;
      } else if (index > 36 && index < 49) {
        fourthArray.push(card);
        increment++;
      } else if (index > 48 && index < 61) {
        fifthArray.push(card);
        increment++;
      } else if (index > 60 && index < 73) {
        sixthArray.push(card);
        increment++;
      } else if (index > 72 && index < 85) {
        seventhArray.push(card);
        increment++;
      } else if (index > 96 && index < 101) {
        eighthArray.push(card);
        increment++;
      }
    });

    for (var i = 0; i < increment / 12; i++) {
      if (i === 0) {
        masterArray.push(firstArray);
      } else if (i === 1) {
        masterArray.push(secondArray);
      } else if (i === 2) {
        masterArray.push(thirdArray);
      } else if (i === 3) {
        masterArray.push(fourthArray);
      } else if (i === 4) {
        masterArray.push(fifthArray);
      } else if (i === 5) {
        masterArray.push(sixthArray);
      } else if (i === 6) {
        masterArray.push(seventhArray);
      } else if (i === 7) {
        masterArray.push(eighthArray);
      }
    }

    const addToDeck = (card) => {
      let number = deck.filter((item) => item == card).length;
      if (number < 4) {
        setDeck((oldArray) => [...oldArray, card]);
      }
    };

    return (
      <>
        {cards.length > 0 && (
          <div>
            <div className="RenderCards">
              {masterArray[currentCardPage].map((card, index) => {
                return (
                  <div
                    onClick={() => addToDeck(card)}
                    className="card"
                    key={index}
                  >
                    <img src={card.imageUrl} />
                  </div>
                );
              })}
            </div>
            <div className="buttonArray">
              {masterArray.map((subArray, index) => {
                if (index !== currentCardPage) {
                  return (
                    <button
                      className="buttonUnclicked"
                      onClick={() => setCurrentCardPage(index)}
                      key={index}
                    >
                      {index + 1}
                    </button>
                  );
                } else {
                  return (
                    <button
                      className="buttonClicked"
                      onClick={() => setCurrentCardPage(index)}
                      key={index}
                    >
                      {index + 1}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        )}
      </>
    );
  };

  return <>{createPagination(cards)}</>;
}
