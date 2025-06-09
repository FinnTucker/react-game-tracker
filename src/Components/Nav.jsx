import React from 'react';

function Nav({onViewGames, onQueryDatabase}) {
    return (
      <nav>
        <button onClick={ onViewGames }>View Games</button>
        <button onClick={ onQueryDatabase }>Query RAWG Database</button>
      </nav>
    )
};

export default Nav