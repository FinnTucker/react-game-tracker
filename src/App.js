import './App.css';
import { useState, useEffect } from 'react';
import GameCard from './Components/GameCard';
import SearchResultCard from './Components/SearchResultCard';
import Header from './Components/Header'
import Nav from './Components/Nav'

const API_KEY = "ca5f2915d47a49ca9843722b14036a72";

function App() {
  const [showDatabase, setShowDatabase] = useState(false);
  const [showGameList, setShowGameList] = useState(false);

  const toggleDatabase= () => {
    setShowGameList(false);
    setShowDatabase(true);
  }

  const toggleGameList = () => {
    setShowGameList(true);
    setShowDatabase(false);
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("games");
    if (saved) setGames(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(searchQuery)}`;
    const res = await fetch(url);
    const data = await res.json();
    setSearchResults(data.results || []);
  };

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

  const filteredGames = (query) =>
    games.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.platform.toLowerCase().includes(query)
    );

  return (
    <div className="App">
      <Header />
      <Nav onViewGames={toggleGameList} onQueryDatabase={toggleDatabase}/>


      {showDatabase && (
        <div>
          <h2>Search the RAWG Database</h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Game Title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button type="submit">Search</button>
          </form>
          <h3>Search Results</h3>
          <div>{searchResults.map((game) => (
            <SearchResultCard key={game.id} game={game} onAdd={addGame} />
          ))}
          </div>
        </div>
      )}

      {showGameList && (
        <div>
          <h2>Search Your List</h2>
          <input
            type="text"
            placeholder="Search for a game"
            onChange={(e) => setGames(filteredGames(e.target.value.toLowerCase()))}
          />
          <h2>My Games</h2>
            <ul>
              {games.map((game, index) => (
                <GameCard key={index} game={game} />
              ))}
            </ul>
        </div>
      )}
    </div>
  );
}

export default App;
