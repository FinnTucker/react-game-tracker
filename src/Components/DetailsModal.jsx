
function DetailsModal({game, onClose}) {
  if (!game) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <span id='close' style={{cursor: 'pointer', float: 'right'}} onClick={{onClose}}>X</span>
        <h2>{game.title}</h2>
        {game.background_image && (
          <img src={game.background_image} alt='{game.title}' width='300'/>
        )}
        <p>Platform: {game.platform}</p>
        <p>Metacritic: {game.metacritic}</p>
        <p>Genres: {game.genre}</p>
      </div>
    </div>
  );
}
export default DetailsModal;