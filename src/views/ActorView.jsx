import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

function ActorView() {
  const { actors, roles, movies } = useContext(DataContext);
  const [selectedActorId, setSelectedActorId] = useState(null);

  const handleSelectActor = (id) => {
    setSelectedActorId(String(id));
  };

  const selectedActor = actors.find((a) => String(a.ID) === String(selectedActorId));
  const selectedRoles = roles.filter((r) => String(r.ActorID) === String(selectedActorId));

  return (
    <div className="actor-view">
      <h2>Actor List</h2>
      {actors.length > 0 ? (
        <ul>
          {actors.map((actor) => (
            <li
              key={actor.ID}
              onClick={() => handleSelectActor(actor.ID)}
              style={{ cursor: "pointer" }}
            >
              {actor.FullName}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading actors...</p>
      )}

      {selectedActor && (
        <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <h3>{selectedActor.FullName}</h3>
          <h4>Movies</h4>
          <ul>
            {selectedRoles.length > 0 ? (
              selectedRoles.map((role) => {
                const movie = movies.find((m) => String(m.ID) === String(role.MovieID));
                return (
                  <li key={role.ID}>
                    {movie ? movie.Title : "Unknown Movie"} — {role.RoleName || "Unnamed"}
                  </li>
                );
              })
            ) : (
              <p>No movies available for this actor.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ActorView;
