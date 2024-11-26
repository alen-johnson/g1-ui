export function makeImposter (items, players){
    if (items.length < 2) return console.log("Start New Game");

    const imposterItem = getRandomItem(items);
    const commonItem = getRandomItem(items);

    const imposterIndex = Math.floor(Math.random() * players.length);
    return players.reduce((dict, player, index) => {
      dict[player] = index === imposterIndex ? imposterItem : commonItem;
      return dict;
    }, {});
  };

// Function to get random item from the list and remove it
function getRandomItem (items)  {
    const randomIndex = Math.floor(Math.random() * items.length);
    const [item] = items.splice(randomIndex, 1);
    return item;
  };