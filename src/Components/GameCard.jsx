import React from 'react';

function GameCard({ game }) {
    return (
        <li className='game-card'>
            <strong>{game.title}</strong> ({game.platform})<br />
            {game.background_image && (
              <img src={game.background_image} alt={game.title} width='300' />
            )}
            <br/>
            Rating: {game.rating} <br />
            Review: {game.review} <br />
            Metascore: {game.metacritic} <br/>
            Genres: {game.genre}
        </li>
    )
}
export default GameCard;