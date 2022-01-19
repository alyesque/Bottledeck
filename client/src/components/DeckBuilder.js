import React, { useState, createRef, useEffect } from "react";
import "../styles/Deckbuilder.css";
import DbRenderCards from "./DbRenderCards";
import load from "./images/loadload.gif";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";

export default function DeckBuilder() {
  const { user, setUser, id, auth, checkAuth } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState();
  const [cards, setCards] = useState([]);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const inputRef = createRef();
  const [deck, setDeck] = useState([]);
  const [count, setCount] = useState(0);
  const [cardClass, setCardClass] = useState("card2");
  const [submitted, setSubmitted] = useState(false);
  const [urlPath, setUrlPath] = useState("");
  // advanced search refs //

  const cmcRef = createRef();
  const layourRef = createRef();
  const typeRef = createRef();
  const rarityRef = createRef();
  const setRef = createRef();
  const [colorRef, setColorRef] = useState([]);

  // form refs //

  const tagsRef = createRef();
  const descRef = createRef();
  const nameRef = createRef();

  useEffect(() => {
    setDeck(deck);
  }, [deck]);

  const search = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    setCards([]);

    if (advancedExpanded !== true) {
      axios
        .get(
          "https://api.magicthegathering.io/v1/cards?contains=imageUrl&name=" +
            inputRef.current.value
        )
        .then((res) => {
          setTimeout(() => {
            setCards(res.data.cards);
            setIsLoaded(true);
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `https://api.magicthegathering.io/v1/cards?contains=imageUrl&name=${
            inputRef.current.value
          }&layout=${layourRef.current.value}&cmc=${
            cmcRef.current.value
          }&type=${typeRef.current.value}&rarity=${
            rarityRef.current.value
          }&set=${setRef.current.value}&colorIdentity=${colorRef.toString()}`
        )
        .then((res) => {
          setTimeout(() => {
            setCards(res.data.cards);
            setIsLoaded(true);
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const detectColor = (e) => {
    if (colorRef.includes(e.target.value)) {
      let newArray = colorRef;
      let index = newArray.indexOf(e.target.value);
      newArray.splice(index, 1);
      setColorRef(newArray);
    } else {
      let newArray = colorRef;
      newArray.push(e.target.value);
      setColorRef(newArray);
    }
  };

  const filterDeck = () => {
    let chars = deck;
    let uniqueChars = [...new Set(deck)];
    return uniqueChars;
  };

  const addOneCardToDeck = (card) => {
    let number = deck.filter((item) => item == card).length;

    if (card.types.includes("Land")) {
      setDeck((oldArray) => [...oldArray, card]);
    } else if (number < 4) {
      setDeck((oldArray) => [...oldArray, card]);
    }
  };

  const removeOneCardFromDeck = (card) => {
    let array = deck;
    let index = array.indexOf(card);
    array.splice(index, 1);
    setDeck([...array]);
  };

  const saveDeck = () => {
    checkAuth();

    let tagsArray = tagsRef.current.value.split(",");
    let reqBody = {
      username: user,
      userId: localStorage.getItem("bdID"),
      cards: deck,
      deckname: nameRef.current.value,
      description: nameRef.current.value,
      tags: tagsArray,
    };

    let body = JSON.stringify(reqBody);

    axios
      .post("/api/v1/decks", reqBody)
      .then((res) => {
        setSubmitted(true);
        let deckID = res.data.deck._id;
        setUrlPath(res.data.deck._id);
        axios.get("/api/v1/users/" + id).then((res) => {
          let deckArray = res.data.user.decks;
          deckArray.push(deckID);
          axios
            .patch("/api/v1/users/" + id, {
              decks: deckArray,
            })
            .then((res) => {});
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dbBox">
      <div className="dbBody">
        <h1> Create a New Deck</h1>
        <div className="dbFlex">
          <form className="dbFlexChild flexForm">
            <h3>Deck Information</h3>
            <input ref={nameRef} placeholder="Deck Name"></input>
            <textarea
              ref={descRef}
              rows="10"
              placeholder="Deck description..."
            ></textarea>
            <input
              ref={tagsRef}
              placeholder="Enter tags (separate by commas)"
            />
            <div className="deckSize"> Deck Size: {deck.length}</div>
          </form>
          <div className="dbFlexChild">
            <h3>Current Cards In Deck:</h3>
            <div className="subHead">(Hover over a card to enlarge it)</div>
            <div className="RenderCards">
              {filterDeck().map((card, index) => {
                return (
                  <div key={index} className={cardClass}>
                    <img src={card.imageUrl} />
                    <div className="showTotal">
                      <button
                        onClick={() => removeOneCardFromDeck(card)}
                        className="remove"
                      >
                        -
                      </button>
                      x{deck.filter((item) => item == card).length}
                      <button
                        onClick={() => addOneCardToDeck(card)}
                        className="remove"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {submitted === false && (
          <button onClick={saveDeck} className="saveDeck">
            Publish Deck
          </button>
        )}
        {submitted === true && (
          <Link to={`/view/deck/` + urlPath}>
            <div className="success">
              Your deck has been published. Click here to view!
            </div>
          </Link>
        )}
      </div>
      <div className="dbBody">
        <form className="searchbar2" onSubmit={search}>
          <label>Enter a search term: </label>
          <input ref={inputRef} />
          <button className="searchButton">Search</button>
          <div>
            {advancedExpanded === false && (
              <div className="see" onClick={() => setAdvancedExpanded(true)}>
                See Advanced Options...
              </div>
            )}
            {advancedExpanded === true && (
              <div className="advancedSearch">
                <h5>Advanced Search</h5>
                <div>
                  <label>Converted Mana Cost: </label>{" "}
                  <input ref={cmcRef}></input>
                </div>
                <div>
                  <label>Layout: </label>{" "}
                  <select ref={layourRef}>
                    <option value="">Unselected</option>
                    <option value="normal">Normal</option>
                    <option value="split">Split</option>
                    <option value="flip">Flip</option>
                    <option value="scheme">Scheme</option>
                    <option value="leveler">Leveler</option>
                    <option value="vanguard">Vanguard</option>
                    <option value="aftermath">Aftermath</option>
                  </select>
                </div>
                <div>
                  <label>Type: </label>
                  <select ref={typeRef}>
                    <option value="">Unselected</option>
                    <option value="Instant">Instant</option>
                    <option value="Sorcery">Sorcery</option>
                    <option value="Creature">Creature</option>
                    <option value="Legendary+Creature">
                      Legendary Creature
                    </option>
                    <option value="Planeswalker">Planeswalker</option>
                    <option value="Artifact">Artifact</option>
                    <option value="Enchantment">Enchantment</option>
                    <option value="Aura">Aura</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                <div>
                  <label>Rarity: </label>
                  <select ref={rarityRef}>
                    <option value="">Unselected</option>
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="mythic">Mythic Rare</option>
                    <option value="special">Special</option>
                  </select>
                </div>
                <div>
                  <label>Set: </label>
                  <select className="setSelect" ref={setRef}>
                    <option value="">Unselected</option>
                    <option value="LEA">Alpha</option>
                    <option value="LEB">Beta</option>
                    <option value="2ED">Unlimited Edition</option>
                    <option value="ARN">Arabian Nights</option>
                    <option value="ATQ">Antiquities</option>
                    <option value="3ED">Revised Edition</option>
                    <option value="LEG">Legends</option>
                    <option value="DRK">The Dark</option>
                    <option value="FEM">Fallen Empires</option>
                    <option value="4ED">Fourth Edition</option>
                    <option value="ICE">Ice Age</option>
                    <option value="CHR">Chronicles</option>
                    <option value="HML">Homelands</option>
                    <option value="ALL">Alliances</option>
                    <option value="MIR">Mirage</option>
                    <option value="VIS">Visions</option>
                    <option value="5ED">Fifth Edition</option>
                    <option value="POR">Portal</option>
                    <option value="WTH">Weatherlight</option>
                    <option value="TMP">Tempest</option>
                    <option value="STH">Stronghold</option>
                    <option value="EXO">Exodus</option>
                    <option value="USD">Urza's Saga</option>
                    <option value="ULG">Urza's Legacy</option>
                    <option value="6ED">Sixth Edition</option>
                    <option value="UDS">Urza's Destiny</option>
                    <option value="MMQ">Mercadian Masques</option>
                    <option value="NEM">Nemesis</option>
                    <option value="PCY">Prophecy</option>
                    <option value="INV">Invasion</option>
                    <option value="PLS">Planeshift</option>
                    <option value="7ED">Seventh Edition</option>
                    <option value="APC">Apocalypse</option>
                    <option value="ODY">Odyssey</option>
                    <option value="TOR">Torment</option>
                    <option value="JUD">Judgment</option>
                    <option value="ONS">Onslaught</option>
                    <option value="LGN">Legions</option>
                    <option value="SCG">Scourge</option>
                    <option value="8ED">Eighth Edition</option>
                    <option value="MRD">Mirrodin</option>
                    <option value="DST">Darksteel</option>
                    <option value="5DN">Fifth Dawn</option>
                    <option value="CHK">Champions of Kamigawa</option>
                    <option value="BOK">Betrayers of Kamigawa</option>
                    <option value="SOK">Saviors of Kamigawa</option>
                    <option value="9ED">Ninth Edition</option>
                    <option value="RAV">Ravnica: City of Guilds</option>
                    <option value="GPT">Guildpact</option>
                    <option value="DIS">Dissension</option>
                    <option value="CSP">Coldsnap</option>
                    <option value="TSP">Time Spiral</option>
                    <option value="PLC">Planar Chaos</option>
                    <option value="FUT">Future Sight</option>
                    <option value="10E">Tenth Edition</option>
                    <option value="LRW">Lorwyn</option>
                    <option value="MOR">Morningtide</option>
                    <option value="SHM">Shadowmoor</option>
                    <option value="EVE">Eventide</option>
                    <option value="ALA">Shards of Alara</option>
                    <option value="CON">Conflux</option>
                    <option value="ARB">Alara Reborn</option>
                    <option value="M10">Magic 2010</option>
                    <option value="ZEN">Zendikar</option>
                    <option value="ROE">Rise of the Eldrazi</option>
                    <option value="M11">Magic 2011</option>
                    <option value="SOM">Scars of Mirrodin</option>
                    <option value="MBS">Mirrodin Besieged</option>
                    <option value="NPH">New Phyrexia</option>
                    <option value="M12">Magic 2012</option>
                    <option value="ISD">Innistrad</option>
                    <option value="DKA">Dark Ascension</option>
                    <option value="AVR">Avacyn Restored</option>
                    <option value="M13">Magic 2013</option>
                    <option value="RTR">Return to Ravnica</option>
                    <option value="GTC">Gatecrash</option>
                    <option value="DGM">Dragon's Maze</option>
                    <option value="MMA">Modern Masters</option>
                    <option value="M14">Magic 2014</option>
                    <option value="THS">Theros</option>
                    <option value="BNG">Born of the Gods</option>
                    <option value="JOU">Journey into Nyx</option>
                    <option value="CNS">Conspiracy</option>
                    <option value="M15">Magic 2015</option>
                    <option value="KTK">Khans of Tarkir</option>
                    <option value="FRF">Fate Reforged</option>
                    <option value="DTK">Dragons of Tarkir</option>
                    <option value="MM2">Modern Masters 2015</option>
                    <option value="ORI">Magic Origins</option>
                    <option value="BFZ">Battle for Zendikar</option>
                    <option value="OGW">Oath of the Gatewatch</option>
                    <option value="SOI">Shadows over Innistrad</option>
                    <option value="EMA">Eternal Masters</option>
                    <option value="EMN">Eldritch Moon</option>
                    <option value="CN2">Conspiracy: Take the Crown</option>
                    <option value="KLD">Kaladesh</option>
                    <option value="AER">Aether Revolt</option>
                    <option value="MM3">Modern Masters 2017</option>
                    <option value="AKH">Amonkhet</option>
                    <option value="HOU">Hour of Devastation</option>
                    <option value="XLN">Ixalan</option>
                    <option value="IMA">Iconic Masters</option>
                    <option value="RIX">Rivals of Ixalan</option>
                    <option value="A25">Masters 25</option>
                    <option value="DOM">Dominaria</option>
                    <option value="BBD">Battlebond</option>
                    <option value="M19">Core Set 2019</option>
                    <option value="GRN">Guilds of Ravnica</option>
                    <option value="UMA">Ultimate Masters</option>
                    <option value="RNA">Ravnica Allegiance</option>
                    <option value="WAR">War of the Spark</option>
                    <option value="MH1">Modern Horizons</option>
                    <option value="M20">Core Set 2020</option>
                    <option value="ELD">Throne of Eldraine</option>
                    <option value="MB1">Mystery Booster</option>
                    <option value="THB">Theros Beyond Death</option>
                    <option value="IKO">Ikoria: Lair of Behemoths</option>
                    <option value="M21">Core Set 2021</option>
                    <option value="2XM">Double Masters</option>
                    <option value="ZNR">Zendikar Rising</option>
                    <option value="CMR">Commander Legends</option>
                    <option value="KHM">Kaldheim</option>
                    <option value="TSR">Time Spiral Remastered</option>
                    <option value="STX">Strixhaven: School of Mages</option>
                    <option value="MH2">Modern Horizons 2</option>
                    <option value="AFR">
                      Adventures in the Forgotten Realms
                    </option>
                    <option value="MID">Innistrad: Midnight Hunt</option>
                    <option value="VOW">Innistrad: Crimson Vow</option>
                  </select>
                </div>
                <div>
                  <label>Must include color:</label>
                  <br />
                  <div className="checkFlex">
                    <div className="checkDiv">
                      <input
                        className="checkBox"
                        onChange={detectColor}
                        type="checkbox"
                        value="r"
                        name="red"
                      />
                      <label htmlFor="red">Red</label>
                    </div>
                    <div className="checkDiv">
                      <input
                        className="checkBox"
                        onChange={detectColor}
                        type="checkbox"
                        value="g"
                        name="green"
                      />
                      <label htmlFor="green"> Green </label>
                    </div>
                    <div className="checkDiv">
                      <input
                        className="checkBox"
                        onChange={detectColor}
                        type="checkbox"
                        value="u"
                        name="blue"
                      />
                      <label htmlFor="red"> Blue </label>
                    </div>
                    <div className="checkDiv">
                      <input
                        className="checkBox"
                        onChange={detectColor}
                        type="checkbox"
                        value="b"
                        name="black"
                      />
                      <label htmlFor="black"> Black </label>
                    </div>
                    <div className="checkDiv">
                      <input
                        className="checkBox"
                        onChange={detectColor}
                        type="checkbox"
                        value="w"
                        name="white"
                      />
                      <label htmlFor="White"> White </label>
                    </div>
                  </div>
                </div>
                <div className="see" onClick={() => setAdvancedExpanded(false)}>
                  See Less...
                </div>
              </div>
            )}
          </div>
        </form>
        {isLoaded === false && (
          <div className="loading">
            <h1>LOADING...</h1>
            <img className="load" src={load} />
          </div>
        )}
        <div>
          <DbRenderCards deck={deck} setDeck={setDeck} cards={cards} />
        </div>
      </div>
    </div>
  );
}
