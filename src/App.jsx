import shuffle from "./utilities/shuffle.js";
import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card.jsx";
import Header from "./components/Header.jsx";
import useSound from "use-sound";
import cardSound from "./card.mp3";
import matchCardSound from "./cardMatch.mp3";

function App() {
  const [wins, setWins] = useState(0);
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [play] = useSound(cardSound, {
    // playbackRate,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
    interrupt: true,
    volume,
  });
  const [playMatch] = useSound(matchCardSound);

  // Array of gradient colors
  const gradients = [
    // "linear-gradient(to right, #ff7e5f, #feb47b)", // Warm gradient
    // "linear-gradient(to right, #6a11cb, #2575fc)", // Purple to blue gradient
    // "linear-gradient(to right, #00b4db, #0083b0)", // Cyan to blue gradient
    // "linear-gradient(to right, #ff4b1f, #1fddff)", // Red to light blue gradient
    // "linear-gradient(to right, #fbc2eb, #a6c1ee)", // Pink to light blue gradient
    "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
    "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)",
    "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
    "linear-gradient(to top, #f43b47 0%, #453a94 100%)",
  ];

  // State to keep track of the current gradient index
  const [currentGradient, setCurrentGradient] = useState(0);

  // Function to shuffle the background gradient
  const shuffleGradient = () => {
    setCurrentGradient((prevGradient) => (prevGradient + 1) % gradients.length);
  };

  const handleClick = (card) => {
    setVolume(Math.random());
    play();
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    // setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {
    const localWins = localStorage.getItem("wins");
    if (localWins) {
      setWins(Number(localWins));
    }
  }, []);

  useEffect(() => {
    let pickTimer;
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              shuffleGradient();
              document.body.style.background = gradients[currentGradient];
              playMatch();
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, playMatch]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);

    if (cards.length && checkWin.length < 1) {
      console.log("You win!");
      setWins(wins + 1);
      localStorage.setItem("wins", Number(wins) + 1);
      handleTurn();
      shuffleGradient();
      document.body.style.background = gradients[currentGradient];
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
