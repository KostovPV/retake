import { convertToEuropeanDate } from "../utils/dateUtils";

function MovieDetails({
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
}) {
  return (
    <div style={{ marginTop: "20px", borderTop: "1px solid black", paddingTop: "10px" }}>
      {isEditing ? (
        <>
          <h3>Edit Movie</h3>
          <input
            value={editData.Title}
            onChange={(e) => setEditData({ ...editData, Title: e.target.value })}
            placeholder="Title"
          />
          <input
            value={editData.ReleaseDate}
            onChange={(e) => setEditData({ ...editData, ReleaseDate: e.target.value })}
            placeholder="Release Date (DD.MM.YYYY)"
          />
          <div>
            <button onClick={onSaveEdit}>Save</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3>{movie.Title}</h3>
          <p>
            <strong>Release Date:</strong> {convertToEuropeanDate(movie.ReleaseDate) || "Unknown"}
          </p>
          <div>
            <button onClick={onEditClick}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
          <h4>Cast</h4>
          {roles.length > 0 ? (
            <ul>
              {roles.map((role) => {
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
        </>
      )}
    </div>
  );
}

export default MovieDetails;
