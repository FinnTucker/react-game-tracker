import React from 'react';

function GameCard({ game, onDelete }) {
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
            <button onClick={onDelete}>Delete</button>
        </li>
    );
}
export default GameCard;