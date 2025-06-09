import React from 'react';

function SearchResultCard({game, onAdd}) {
    return (
        <div className='search-result-card'>
            <h3>{game.name}</h3>
            <img src={game.background_image} alt={game.name} width="300" />
            <p>Released: {game.released}</p>
            <p>Metacritic: {game.metacritic}</p>
            <button onClick={() => onAdd(game)}>Add to My List</button>
        </div>
    );
}

export default SearchResultCard;