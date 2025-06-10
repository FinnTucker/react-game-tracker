import './App.css';
import { useState, useEffect } from 'react';
import SearchResultCard from './Components/SearchResultCard';
import Header from './Components/Header';
import Nav from './Components/Nav';
import GameList from './Components/GameList';
import SearchDatabase from './Components/SearchDatabase';
import DetailsModal from './Components/DetailsModal';

function App() {
  const [showDatabase, setShowDatabase] = useState(false);
  const [showGameList, setShowGameList] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const toggleDatabase = () => {
    setShowGameList(false);
    setShowDatabase(true);
  };

  const toggleGameList = () => {
    setShowGameList(true);
    setShowDatabase(false);
  };

  const handleShowDetails = (game) => {
    setSelectedGame(game);
  }

  const handleCloseDetails = () => {
    setSelectedGame(null);
  }

  useEffect(() => {
    const saved = localStorage.getItem("games");
    if (saved) setGames(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const addGame = (game) => {
    const platformList = game.parent_platforms?.map(p => p.platform.name) || [];
    const genreList = game.genres?.map(g => g.name) || [];

    const newGame = {
      title: game.name,
      background_image: game.background_image,
      platform: platformList.join(", "),
      metacritic: game.metacritic ?? "N/A",
      rating: "Not rated yet",
      review: "Not reviewed yet",
      genre: genreList.join(", "),
    };

    setGames(prev => [...prev, newGame]);
    alert(`${game.name} has been added to your game list!`);
  };

  return (
    <div className="App">
      <Header />
      <Nav onViewGames={toggleGameList} onQueryDatabase={toggleDatabase} />
      {showGameList && (
        <GameList 
          games={games} 
          setGames={setGames} 
          onShowDetails={handleShowDetails}
        />
      )}
      {showDatabase && (
        <SearchDatabase
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          onAddGame={addGame}
        />
      )}
      {selectedGame && (
        <DetailsModal game={selectedGame} onClose={handleCloseDetails} />
      )}
      <span id='close' style={{cursor: 'pointer', float: 'right'}} onClick={handleCloseDetails}>X</span>
      {selectedGame && <img src={selectedGame.background_image} alt={selectedGame.title} width='300'/>}

    </div>
  );
}

export default App;
