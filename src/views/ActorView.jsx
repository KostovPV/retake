import { useState, useContext, useMemo, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 10;


  const filteredActors = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return actors;
    return actors.filter(a => (a.FullName || "").toLowerCase().includes(q));
  }, [actors, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredActors.length / actorsPerPage));
  const startIndex = (currentPage - 1) * actorsPerPage;
  const pagedActors = filteredActors.slice(startIndex, startIndex + actorsPerPage);


  useEffect(() => { setCurrentPage(1); }, [searchTerm]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [totalPages, currentPage]);


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
    setSelectedActorId(null);
    setIsActorModalOpen(false);
  };


  const handleUpdateActor = (updatedActor) => {
    updateActors(actors.map(a => String(a.ID) === String(updatedActor.ID) ? updatedActor : a));
  };

  const handleDeleteActor = (actorId) => {
    if (!window.confirm("Are you sure you want to delete this actor?")) return;
    updateActors(actors.filter(a => String(a.ID) !== String(actorId)));
    updateRoles(roles.filter(r => String(r.ActorID) !== String(actorId)));
    closeActorModal();
  };

  const handleAddRole = (role) => {
    const nextId = String(Math.max(0, ...roles.map(r => Number(r.ID))) + 1);
    updateRoles([...roles, { ID: nextId, ...role }]);
  };

  const handleUpdateRole = (roleId, updates) => {
    updateRoles(roles.map(r => String(r.ID) === String(roleId) ? { ...r, ...updates } : r));
  };

  const handleDeleteRole = (roleId) => {
    updateRoles(roles.filter(r => String(r.ID) !== String(roleId)));
  };

  const selectedActor = actors.find(a => String(a.ID) === String(selectedActorId));
  const actorRoles = roles.filter(r => String(r.ActorID) === String(selectedActorId));

  return (
    <div className="actor-view">
      <h2>Actors</h2>

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

      {isCreating && (
        <ActorCreate
          existingActors={actors}
          onSave={handleCreateSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="actor-buttons">
        {pagedActors.map((a) => (
          <button key={a.ID} onClick={() => openActorModal(a.ID)}>
            {a.FullName}
          </button>
        ))}
        {filteredActors.length === 0 && <p>No actors match your search.</p>}
      </div>

      {filteredActors.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
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
        allActors={actors}
      />

    </div>
  );
}

export default ActorView;
