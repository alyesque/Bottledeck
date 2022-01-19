import "./styles/App.css";
import NavTop from "./components/NavTop";
import NavSide from "./components/NavSide";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Library from "./components/Library";
import CardPage from "./components/CardPage";
import Login from "./components/Login";
import Register from "./components/Register";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/contexts/UserContext";
import Profile from "./components/Profile";
import axios from "axios";
import Favorites from "./components/Favorites";
import DeckBuilder from "./components/DeckBuilder";
import Home from "./components/Home";
import ViewDeck from "./components/ViewDeck";
import NavMobile from "./components/NavMobile";
import ViewProfile from "./components/ViewProfile";

function App() {
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [id, user]);

  function checkAuth() {
    axios
      .get("/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAuth(res.data);
      });
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (auth === true) {
      setUser(localStorage.getItem("bdUN"));
      setId(localStorage.getItem("bdID"));
    }
  }, [auth]);

  return (
    <div className="appBody">
      <BrowserRouter>
        <UserContext.Provider
          value={{ user, setUser, id, auth, setAuth, checkAuth }}
        >
          <NavTop></NavTop>
          <NavMobile />
          <div className="subBody">
            <NavSide></NavSide>
            <div className="right">
              <Switch>
                <Route exact path="/" element={<Home />} />
                {auth === true && (
                  <>
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/favorites" element={<Favorites />} />
                    <Route
                      exact
                      path="/deckbuilder"
                      element={<DeckBuilder />}
                    />
                  </>
                )}
                <Route exact path="/library" element={<Library />} />
                <Route exact path="/:name/:id" element={<CardPage />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/view/deck/:id" element={<ViewDeck />} />
                <Route
                  exact
                  path="/view/profile/:username"
                  element={<ViewProfile />}
                />
                <Route exact path="/*" element={<Home />} />
              </Switch>
            </div>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
