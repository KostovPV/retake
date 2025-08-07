function MovieList({ movies, selectedMovieId, onSelect }) {
  return (
    <div>
      <h2>Movie List</h2>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.ID}
              onClick={() => onSelect(movie.ID)}
              style={{
                cursor: "pointer",
                fontWeight: String(movie.ID) === String(selectedMovieId) ? "bold" : "normal",
              }}
            >
              {movie.Title}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default MovieList;
