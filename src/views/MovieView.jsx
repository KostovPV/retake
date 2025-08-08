import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

import { convertToStorageDate, convertToEuropeanDate } from "../utils/dateUtils";
import MovieList from "../components/MovieList";
import MovieCreate from "../components/MovieCreate";
import MovieModal from "../components/MovieModal"; 
import './MovieView.css';

function MovieView() {
  const { movies, roles, actors, updateMovies } = useContext(DataContext);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editData, setEditData] = useState({ Title: "", ReleaseDate: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectMovie = (id) => {
    setSelectedMovieId(String(id));
    setIsEditing(false);
    setIsCreating(false);
  };

  const selectedMovie = movies.find((m) => String(m.ID) === String(selectedMovieId));
  const selectedRoles = roles.filter((r) => String(r.MovieID) === String(selectedMovieId));

  const handleEditClick = () => {
    setEditData({
      Title: selectedMovie.Title,
      ReleaseDate: convertToEuropeanDate(selectedMovie.ReleaseDate),
    });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updated = movies.map((m) =>
      String(m.ID) === String(selectedMovieId)
        ? {
          ...m,
          Title: editData.Title,
          ReleaseDate: convertToStorageDate(editData.ReleaseDate),
        }
        : m
    );
    updateMovies(updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const updated = movies.filter((m) => String(m.ID) !== String(selectedMovieId));
      updateMovies(updated);
      setSelectedMovieId(null);
      setIsEditing(false);
    }
  };

  const handleCreateClick = () => {
    setEditData({ Title: "", ReleaseDate: "" });
    setIsCreating(true);
    setSelectedMovieId(null);
  };

  const handleCreateSave = (newMovie) => {
    const updated = [...movies, newMovie];
    updateMovies(updated);
    setIsCreating(false);
    setSelectedMovieId(newMovie.ID);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
    setIsEditing(false);
  };

  return (
    <div className="movie-view">
      <h2>Movie List</h2>
      <div className="movie-controls">
        <button className="create-btn" onClick={handleCreateClick}>Create New Movie</button>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="movie-search"
        />
      </div>


      {isCreating && (
        <MovieCreate
          onSave={handleCreateSave}
          onCancel={() => setIsCreating(false)}
          existingMovies={movies}
        />
      )}

      <MovieList
        movies={movies}
        selectedMovieId={selectedMovieId}
        onSelect={handleSelectMovie}
        searchTerm={searchTerm}
      />

      <MovieModal
        isOpen={!!selectedMovieId}
        onClose={closeModal}
        movie={selectedMovie}
        roles={selectedRoles}
        actors={actors}
        isEditing={isEditing}
        editData={editData}
        setEditData={setEditData}
        onEditClick={handleEditClick}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={() => setIsEditing(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default MovieView;
