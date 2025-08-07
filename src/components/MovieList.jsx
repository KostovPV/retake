function MovieList({ movies, selectedMovieId, onSelect, searchTerm }) {
  return (
    <div>
      <h2>Movie List</h2>
      {movies.length > 0 ? (
        <ul>
          {movies
            .filter((m) =>
              m.Title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((movie) => (
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
