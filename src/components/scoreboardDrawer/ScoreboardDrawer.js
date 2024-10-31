import './ScoreboardDrawer.css'
import React from 'react'

function ScoreboardDrawer(scores ) {

    const sortedScores = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => Number(scoreB) - Number(scoreA));
  return (
    <div>
        <ol>
        {sortedScores.map(([player, score]) => (
          <li key={player}>{player} : {score}</li>
        ))}
      </ol>
    </div>
  )
}

export default ScoreboardDrawer