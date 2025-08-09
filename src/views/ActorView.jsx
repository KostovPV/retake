import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import ActorModal from "../components/ActorModal";
import "./ActorView.css";

function ActorView() {
  const { actors, roles, movies, updateActors, updateRoles } = useContext(DataContext);
  const [selectedActorId, setSelectedActorId] = useState(null);
  const [isActorModalOpen, setIsActorModalOpen] = useState(false);
  const [newActor, setNewActor] = useState({ FullName: "", Birthdate: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const openActorModal = (id) => {
    setSelectedActorId(String(id));
    setIsActorModalOpen(true);
  };
  const closeActorModal = () => setIsActorModalOpen(false);

  const handleUpdateActor = (updatedActor) => {
    const updated = actors.map((a) => String(a.ID) === String(updatedActor.ID) ? updatedActor : a);
    updateActors(updated);
  };

  const handleDeleteActor = (actorId) => {
    updateActors(actors.filter((a) => String(a.ID) !== String(actorId)));
    updateRoles(roles.filter((r) => String(r.ActorID) !== String(actorId)));
    setIsActorModalOpen(false);
    setSelectedActorId(null);
  };

  const handleCreateActor = () => {
    if (!newActor.FullName) return alert("Full name required");
    const nextId = String(Math.max(0, ...actors.map((a) => Number(a.ID))) + 1);
    updateActors([...actors, { ID: nextId, ...newActor }]);
    setNewActor({ FullName: "", Birthdate: "" });
  };

  const handleAddRole = (role) => {
    const nextId = String(Math.max(0, ...roles.map((r) => Number(r.ID))) + 1);
    updateRoles([...roles, { ID: nextId, ...role }]);
  };

  const handleUpdateRole = (roleId, updates) => {
    updateRoles(roles.map((r) => String(r.ID) === String(roleId) ? { ...r, ...updates } : r));
  };

  const handleDeleteRole = (roleId) => {
    updateRoles(roles.filter((r) => String(r.ID) !== String(roleId)));
  };

  const selectedActor = actors.find((a) => String(a.ID) === String(selectedActorId));
  const actorRoles = roles.filter((r) => String(r.ActorID) === String(selectedActorId));

  return (
    <div className="actor-view">
      <input
        type="text"
        placeholder="Search actors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2>Actors</h2>
      <div className="add-actor-form">
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
        <button onClick={handleCreateActor}>Create</button>
      </div>

      <div className="actor-buttons">
        {actors
          .filter((a) => a.FullName.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((a) => (
            <button key={a.ID} onClick={() => openActorModal(a.ID)}>
              {a.FullName}
            </button>
          ))}
      </div>
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
