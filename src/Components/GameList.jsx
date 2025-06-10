// src/components/GameList.jsx
import { useEffect, useState } from 'react';
import GameCard from './GameCard';

function GameList({ games = [], setGames, onShowDetails, onClose }) {
  useEffect(() => {
    const savedGames = localStorage.getItem("games");
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    }
  }, []);

  const handleDelete = (index) => {
    console.log('deleting game at index: %d', index)
    const updatedGames = [...games];
    updatedGames.splice(index, 1);
    setGames(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
  };

  const filteredGames = (query) => {
    return games.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.platform.toLowerCase().includes(query.toLowerCase())
    );
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div id="game-list-section">
      <span id='close' style={{cursor: 'pointer', float: 'right'}} onClick={onClose}>X</span>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search for a game"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h2>My Games</h2>
      <ul id="game-list">
        {filteredGames(searchQuery).map((game, index) => (
          <GameCard 
            key={index} 
            game={game} 
            onDelete={() => handleDelete(index)} 
            showDetails={() => onShowDetails(game)} // Use prop
          />
        ))}
      </ul>
    </div>
  );
}

export default GameList;
