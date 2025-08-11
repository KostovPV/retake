import { useMemo } from "react";
import Modal from "./Modal";
import { convertToEuropeanDate } from "../utils/dateUtils";
import {
  buildTitleSet,
  getTitleError,
  getReleaseDateError,
} from "../utils/validation";
import "./MovieModal.css";

function MovieModal({
  isOpen,
  onClose,
  movie,
  roles,
  actors,
  isEditing,
  editData,
  setEditData,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  allMovies = [],
}) {
  if (!movie) return null;

  // other movie titles excluding current
  const otherTitles = useMemo(() => {
    const others = (allMovies || []).filter(m => String(m.ID) !== String(movie.ID));
    return buildTitleSet(others);
  }, [allMovies, movie?.ID]);

  const errors = useMemo(() => {
    if (!isEditing) return {};
    return {
      Title: getTitleError(editData.Title, otherTitles) || "",
      ReleaseDate: getReleaseDateError(editData.ReleaseDate) || "",
    };
  }, [isEditing, editData, otherTitles]);

  const disableSave = isEditing && (errors.Title || errors.ReleaseDate);

  const handleSave = () => {
    if (disableSave) return;
    onSaveEdit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="movie-modal">
        {isEditing ? (
          <>
            <h3>Edit Movie</h3>

            <div className="form-field">
              <input
                value={editData.Title}
                onChange={(e) => setEditData({ ...editData, Title: e.target.value })}
                placeholder="Title"
                aria-invalid={!!errors.Title}
              />
              {errors.Title && <div className="error">{errors.Title}</div>}
            </div>

            <div className="form-field">
              <input
                value={editData.ReleaseDate}
                onChange={(e) => setEditData({ ...editData, ReleaseDate: e.target.value })}
                placeholder="Release Date (DD.MM.YYYY)"
                aria-invalid={!!errors.ReleaseDate}
              />
              {errors.ReleaseDate && <div className="error">{errors.ReleaseDate}</div>}
            </div>

            <div className="movie-modal-buttons">
              <button onClick={handleSave} disabled={!!disableSave}>Save</button>
              <button onClick={onCancelEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h3>{movie.Title}</h3>
            <p>
              <strong>Release Date:</strong> {convertToEuropeanDate(movie.ReleaseDate) || "Unknown"}
            </p>
            <div className="movie-modal-buttons">
              <button onClick={onEditClick}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </div>

            <h4>Cast</h4>
            {roles.length > 0 ? (
              <ul>
                {roles.map((role) => {
                  const actor = actors.find(a => String(a.ID) === String(role.ActorID));
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
          </>
        )}
      </div>
    </Modal>
  );
}

export default MovieModal;
