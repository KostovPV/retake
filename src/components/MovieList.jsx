import './MovieList.css';

function MovieList({ movies, selectedMovieId, onSelect, searchTerm }) {
  const filteredMovies = movies.filter((m) =>
    m.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list">
      {/* <h2 className="movie-list-heading">Movie List</h2> */}

      {filteredMovies.length > 0 ? (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.ID}
              className={`movie-card ${String(movie.ID) === String(selectedMovieId) ? 'selected' : ''}`}
              onClick={() => onSelect(movie.ID)}
            >
              <span className="movie-title">{movie.Title}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;
