import React from "react";
import data from "./data/CardData";
import Gameboard from "./screens/gameboard/Gameboard";

import "./styles.css";

export default function App() {
  return (
    <div className="Memory">
      <h1 className="Memory__title">Memory Game</h1>
      <Gameboard data={data} />
    </div>
  );
}
