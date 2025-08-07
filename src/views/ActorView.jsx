import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

function ActorView() {
  const { actors, roles, movies, updateActors } = useContext(DataContext);
  const [selectedActorId, setSelectedActorId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ FullName: "", Birthdate: "" });
  const [newActor, setNewActor] = useState({ FullName: "", Birthdate: "" });

  const handleSelectActor = (id) => {
    setSelectedActorId(String(id));
    setIsEditing(false);
  };

  const handleEditClick = () => {
    const actor = actors.find((a) => String(a.ID) === String(selectedActorId));
    setEditData({
      FullName: actor.FullName,
      Birthdate: actor.Birthdate || "",
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updated = actors.map((a) =>
      String(a.ID) === String(selectedActorId)
        ? { ...a, FullName: editData.FullName, Birthdate: editData.Birthdate }
        : a
    );
    updateActors(updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this actor?")) {
      const updated = actors.filter((a) => String(a.ID) !== String(selectedActorId));
      updateActors(updated);
      setSelectedActorId(null);
      setIsEditing(false);
    }
  };

  const handleCreate = () => {
    if (!newActor.FullName) {
      alert("Full Name is required");
      return;
    }

    const nextId = Math.max(...actors.map((a) => Number(a.ID))) + 1;
    const created = { ID: String(nextId), ...newActor };
    const updated = [...actors, created];
    updateActors(updated);
    setNewActor({ FullName: "", Birthdate: "" });
  };

  const selectedActor = actors.find((a) => String(a.ID) === String(selectedActorId));
  const selectedRoles = roles.filter((r) => String(r.ActorID) === String(selectedActorId));

  return (
    <div className="actor-view">
      <h2>Actor List</h2>
      {/* Create New Actor */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Add New Actor</h3>
        <input
          value={newActor.FullName}
          onChange={(e) => setNewActor({ ...newActor, FullName: e.target.value })}
          placeholder="Full Name"
        />
        <input
          value={newActor.Birthdate}
          onChange={(e) => setNewActor({ ...newActor, Birthdate: e.target.value })}
          placeholder="Birthdate"
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {actors.length > 0 ? (
        <ul>
          {actors.map((actor) => (
            <li
              key={actor.ID}
              onClick={() => handleSelectActor(actor.ID)}
              style={{
                cursor: "pointer",
                fontWeight: actor.ID === selectedActorId ? "bold" : "normal",
              }}
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
          {isEditing ? (
            <>
              <h3>Edit Actor</h3>
              <input
                value={editData.FullName}
                onChange={(e) => setEditData({ ...editData, FullName: e.target.value })}
                placeholder="Full Name"
              />
              <input
                value={editData.Birthdate}
                onChange={(e) => setEditData({ ...editData, Birthdate: e.target.value })}
                placeholder="Birthdate"
              />
              <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>{selectedActor.FullName}</h3>
              <p><strong>Birthdate:</strong> {selectedActor.Birthdate || "Unknown"}</p>
              <div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ActorView;
