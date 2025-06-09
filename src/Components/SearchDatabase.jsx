// src/Components/SearchDatabase.jsx
import React, { useState } from 'react';
import SearchResultCard from './SearchResultCard';
const API_KEY = "ca5f2915d47a49ca9843722b14036a72";

function SearchDatabase({ searchResults, setSearchResults, onAddGame }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(searchQuery)}`;
    const res = await fetch(url);
    const data = await res.json();
    setSearchResults(data.results || []);
    console.log(data);
  };

  return (
    <>
      <h2>Search the RAWG Database</h2>
      <form id="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Game Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((game) => (
          <SearchResultCard key={game.id} game={game} onAdd={onAddGame} />
        ))}
      </div>
    </>
  );
}

export default SearchDatabase;
