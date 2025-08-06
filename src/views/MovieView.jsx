import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { formatDate } from "../utils/formatDate";

function MovieView() {
    const { movies, roles, actors } = useContext(DataContext);
    console.log('movies', movies);
    console.log('roles', roles);


    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const handleSelectMovie = (id) => {
        setSelectedMovieId(String(id));
    };


    const selectedMovie = movies.find((m) => String(m.ID) === String(selectedMovieId));

    const selectedRoles = roles.filter((r) => String(r.MovieID) === String(selectedMovieId));

    console.log("selectedRoles", selectedRoles.map(r => ({ ...r })));


    return (
        <div className="movie-view">
            <h2>Movie List</h2>
            {movies.length > 0 ? (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.ID} onClick={() => handleSelectMovie(movie.ID)}>
                            {movie.Title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading movies...</p>
            )}

            {selectedMovie && (
                <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                    <h3>{selectedMovie.Title}</h3>
                    <p>
                        <strong>Release Date:</strong> {formatDate(selectedMovie.ReleaseDate)}
                    </p>
                    <h4>Cast</h4>
                    {selectedRoles.length > 0 ? (
                        <ul>
                            {selectedRoles.map((role) => {
                                const actor = actors.find((a) => String(a.ID) === String(role.ActorID));
                                return (
                                    <li key={role.ID}>
                                        {actor ? actor.FullName : "Unknown Actor"} — {role.RoleName || "Unnamed"}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No cast available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MovieView;
