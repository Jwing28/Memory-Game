import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import _ from "underscore";

import "./styles/Gameboard.css";

const Gameboard = ({ data }) => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState({});

  // Shuffling cards improves player experience
  useEffect(() => {
    setCards(_.shuffle(data));
  }, [data]);

  useEffect(() => {
    if (Object.keys(selectedCards).length === 2) {
      if (selectedCards.card1 === selectedCards.card2) {
        // when user finds cards we update the card matched property
        setTimeout(() => {
          const updatedCards = cards.map((card) => {
            if (card.value === selectedCards.card1) {
              return {
                ...card,
                selected: false,
                matched: true,
              };
            }
            return card;
          });
          setCards(updatedCards);
        }, 1000);

        setSelectedCards({});
      } else {
        // wrong guess = reset selected cards
        setTimeout(() => {
          const updatedCards = cards.map((card) => {
            return {
              ...card,
              selected: false,
            };
          });
          setCards(updatedCards);
        }, 1000);

        clearSelectedCards();
      }
    }
  }, [cards, selectedCards]);

  /**
   * Toggles selected cards chosen. Will be used to determine if user guessed correctly.
   * @param {Array} cards
   * @param {Number} id
   * @param {Number} value
   * @returns transformed set of cards.
   */
  const updateCards = (cards, id, value) =>
    cards.map((card) => {
      if (card.value === value && card.id === id) {
        return {
          ...card,
          selected: !card.selected,
        };
      }
      return card;
    });

  /**
   * Sets chosen cards by player
   * @param {Event} e
   */
  const handleSelect = (e) => {
    const id = Number(e.target.id);
    const value = Number(e.target.innerHTML);
    if (Object.keys(selectedCards).length < 1) {
      setSelectedCards({
        card1: value,
      });
    } else {
      setSelectedCards({
        ...selectedCards,
        card2: value,
      });
    }
    setCards(updateCards(cards, id, value));
  };

  const clearSelectedCards = () => {
    setSelectedCards({});
  };

  const renderCards = (cards) => {
    return (
      !!cards &&
      cards.map((card) => (
        <Card key={card.id} card={card} onClick={handleSelect} />
      ))
    );
  };
  return <div className="Gameboard">{renderCards(cards)}</div>;
};

export default Gameboard;
