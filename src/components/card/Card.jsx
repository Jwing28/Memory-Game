import React from "react";
import "./styles/Card.css";

const Card = ({ card, onClick }) => {
  return (
    <div
      id={card.id}
      className={
        card.selected
          ? "Card Card--selected"
          : card.matched
          ? "Card Card--matched"
          : "Card"
      }
      onClick={onClick}
    >
      {card.label}
    </div>
  );
};

export default Card;
