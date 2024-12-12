export const calcScore = (prevScore, winners) => {
  const score = { ...prevScore };

  if (winners.length > 1) {
    winners.forEach((winner) => {
      score[winner] += 2;
    });
    for (const player in score) {
      if (!winners.includes(player)) {
        score[player] -= 1;
      }
    }
  } else {
    winners.forEach((winner) => {
      score[winner] += 3;
    });
    for (const player in score) {
      if (!winners.includes(player)) {
        score[player] -= 2;
      }
    }
  }
  return score;
};
