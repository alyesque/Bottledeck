import React from "react";
import "../styles/Loading.css";

import load from "./images/loadload.gif";

export default function Loading() {
  return (
    <div className="loading">
      <h1>LOADING...</h1>
      <img className="load" src={load} />
    </div>
  );
}
