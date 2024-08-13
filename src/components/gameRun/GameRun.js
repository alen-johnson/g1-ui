import React, { useEffect, useState } from "react";
import { items } from "../../assets/contents/contens";

function GameRun() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [player_set, setPlayer_set] = useState(null);

  //function returns a list of players
  const createPlayers = () => {
    let n = 5;
    let p_list = [];
    for (let i = 1; i <= n; i++) {
      p_list.push(`Player ${i}`);
    }

    return p_list;
  };

  const players = createPlayers();
  const item_list = items;

  // function return a dictionary with key as player and value as assigned names, where one player has a unique name
  const makeImposter = (items, players) => {
    if (items.length < 2) {
      console.log("Start New Game");
    }

    let n = Math.floor(Math.random() * items.length);

    let imposter_item = items[n];
    items.splice(n, 1);
    // console.log(imposter_item)

    n = Math.floor(Math.random() * items.length);

    let common_item = items[n];
    items.splice(n, 1);
    // console.log(common_item);

    n = Math.floor(Math.random() * players.length);
    let dict = {};
    //loop assigns item names for players
    for (let i = 0; i < players.length; i++) {
      if (i === n) {
        dict[players[i]] = imposter_item;
      } else {
        dict[players[i]] = common_item;
      }
    }

    return dict;
  };

  useEffect(() => {
    const initialPlayerSet = makeImposter([...item_list], players);
    setPlayer_set(initialPlayerSet);
  }, []);

  //for some reason - doesnt convert null to object without the below code
  if (!player_set) {
    return <div>Loading...</div>;
  }

  const entries = Object.entries(player_set);

  // Function to display the next key-value pair
  const handleNextClick = () => {
    if (currentIndex === entries.length - 1) {
      // If last player has been displayed, reset and create new player set
      const newPlayerSet = makeImposter([...item_list], players);
      setPlayer_set(newPlayerSet);
      setCurrentIndex(0); // Reset index to start from the first player
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="gamePage">
      <div id="display-area">
        <p>{`${entries[currentIndex][0]}: ${entries[currentIndex][1]}`}</p>
      </div>
      <button id="next-button" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
}

export default GameRun;
