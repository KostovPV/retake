import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import ActorCreate from "../components/ActorCreate";
import ActorModal from "../components/ActorModal";
import "./ActorView.css";

function ActorView() {
  const { actors, roles, movies, updateActors, updateRoles } = useContext(DataContext);

  const [selectedActorId, setSelectedActorId] = useState(null);
  const [isActorModalOpen, setIsActorModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Open/close modal
  const openActorModal = (id) => {
    setSelectedActorId(String(id));
    setIsActorModalOpen(true);
  };
  const closeActorModal = () => {
    setIsActorModalOpen(false);
    setSelectedActorId(null);
  };

  const handleCreateClick = () => setIsCreating(true);
  const handleCreateSave = (newActor) => {
    updateActors([...actors, newActor]);
    setIsCreating(false);
    setSelectedActorId(String(newActor.ID));
    setIsActorModalOpen(true);
  };

  const handleUpdateActor = (updatedActor) => {
    const updated = actors.map((a) =>
      String(a.ID) === String(updatedActor.ID) ? updatedActor : a
    );
    updateActors(updated);
  };

  const handleDeleteActor = (actorId) => {
    if (!window.confirm("Are you sure you want to delete this actor?")) return;
    updateActors(actors.filter((a) => String(a.ID) !== String(actorId)));
    updateRoles(roles.filter((r) => String(r.ActorID) !== String(actorId)));
    closeActorModal();
  };

  const handleAddRole = (role) => {
    const nextId = String(Math.max(0, ...roles.map((r) => Number(r.ID))) + 1);
    updateRoles([...roles, { ID: nextId, ...role }]);
  };

  const handleUpdateRole = (roleId, updates) => {
    const updated = roles.map((r) =>
      String(r.ID) === String(roleId) ? { ...r, ...updates } : r
    );
    updateRoles(updated);
  };

  const handleDeleteRole = (roleId) => {
    updateRoles(roles.filter((r) => String(r.ID) !== String(roleId)));
  };

  const selectedActor = actors.find((a) => String(a.ID) === String(selectedActorId));
  const actorRoles = roles.filter((r) => String(r.ActorID) === String(selectedActorId));
  const filteredActors = actors.filter((a) =>
    a.FullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="actor-view">
      <h2>Actors</h2>

      {/* Controls row */}
      <div className="movie-controls">
        <input
          type="text"
          placeholder="Search actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="movie-search"
        />
        <button className="create-btn" onClick={handleCreateClick}>
          Create New Actor
        </button>
      </div>


      {/* Create form which to toggle */}
      {isCreating && (
        <ActorCreate
          existingActors={actors}
          onSave={handleCreateSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {/* Actor list (buttons) */}
      <div className="actor-buttons">
        {filteredActors.map((a) => (
          <button key={a.ID} onClick={() => openActorModal(a.ID)}>
            {a.FullName}
          </button>
        ))}
      </div>

      {/* Modal*/}
      <ActorModal
        isOpen={isActorModalOpen}
        onClose={closeActorModal}
        actor={selectedActor || null}
        roles={actorRoles}
        movies={movies}
        onUpdateActor={handleUpdateActor}
        onDeleteActor={handleDeleteActor}
        onAddRole={handleAddRole}
        onUpdateRole={handleUpdateRole}
        onDeleteRole={handleDeleteRole}
      />
    </div>
  );
}

export default ActorView;
