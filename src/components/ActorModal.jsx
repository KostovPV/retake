import { useState } from "react";
import Modal from "./Modal";             
import RoleForm from "./RoleForm";
import RoleList from "./RoleList";
import RoleModal from "./RoleModal";     
import "./ActorModal.css";

function ActorModal({
  isOpen,
  onClose,
  actor,
  roles,
  movies,
  onUpdateActor,
  onDeleteActor,
  onAddRole,
  onUpdateRole,
  onDeleteRole,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(
    actor
      ? { FullName: actor.FullName, Birthdate: actor.Birthdate || "" }
      : { FullName: "", Birthdate: "" }
  );

  const [openRoleId, setOpenRoleId] = useState(null);
  const currentRole = roles.find((r) => String(r.ID) === String(openRoleId)) || null;

  if (actor && editData.FullName !== actor.FullName && !isEditing) {
    setEditData({ FullName: actor.FullName, Birthdate: actor.Birthdate || "" });
  }

  const handleSaveActor = () => {
    onUpdateActor({ ...actor, ...editData });
    setIsEditing(false);
  };

  const handleDeleteActorClick = () => {
    if (window.confirm("Delete this actor?")) {
      onDeleteActor(actor.ID);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {!actor ? (
        <div style={{ padding: "1rem" }}>No actor selected.</div>
      ) : (
        <div className="actor-modal">
          <section className="actor-modal__left">
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
                <div className="actor-modal__btns">
                  <button onClick={handleSaveActor}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3>{actor.FullName}</h3>
                <p><strong>Birthdate:</strong> {actor.Birthdate || "Unknown"}</p>
                <div className="actor-modal__btns">
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                  <button onClick={handleDeleteActorClick}>Delete</button>
                </div>
              </>
            )}

            <hr />
            <RoleForm actorId={actor.ID} movies={movies} onAddRole={onAddRole} />
          </section>

          <section className="actor-modal__right">
            <h3>Roles</h3>
            <RoleList
              roles={roles}
              movies={movies}
              onOpenModal={(roleId) => setOpenRoleId(roleId)} 
            />
          </section>

          {currentRole && (
            <RoleModal
              role={currentRole}
              movies={movies}
              onUpdate={onUpdateRole}
              onDelete={onDeleteRole}
              onClose={() => setOpenRoleId(null)}
            />
          )}
        </div>
      )}
    </Modal>
  );
}

export default ActorModal;
