import './App.css';
import { useState, useEffect } from 'react';
import SearchResultCard from './Components/SearchResultCard';
import Header from './Components/Header';
import Nav from './Components/Nav';
import GameList from './Components/GameList';
import SearchDatabase from './Components/SearchDatabase';

function App() {
  const [showDatabase, setShowDatabase] = useState(false);
  const [showGameList, setShowGameList] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [games, setGames] = useState([]);

  const toggleDatabase = () => {
    setShowGameList(false);
    setShowDatabase(true);
  };

  const toggleGameList = () => {
    setShowGameList(true);
    setShowDatabase(false);
  };

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
  };

  return (
    <div className="App">
      <Header />
      <Nav onViewGames={toggleGameList} onQueryDatabase={toggleDatabase} />
      {showGameList && <GameList games={games} setGames={setGames} />}
      {showDatabase && (
        <SearchDatabase
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          onAddGame={addGame}
        />
      )}
    </div>
  );
}

export default App;
