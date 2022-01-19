import React from "react";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="homeMain">
      <div className="homeBox">
        <h1>Welcome to Bottledeck</h1>
        <div className="homeFlex">
          <div className="homeFlexChild">
            <h3>About</h3>
            <p>
              Bottledeck is a resource for Magic The Gathering Players. Our site
              allows you to simulate draft sessions with a high level of
              customization, build and store decks, and search for and view
              information on cards from a vast library.{" "}
            </p>
            <p>
              Most of our features are only available after registering and
              logging into the app, although the card library is publicly
              available.
            </p>
            <p>
              Our project is only possible because of the incredible work being
              done by the folks at
              <a href="https://magicthegathering.io/">
                magicthegathering.io.
              </a>{" "}
              While we operate our own servers and databases in order to enable
              user and deck creation, the raw card data comes from this
              incredible community resource.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
