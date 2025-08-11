import { useState } from "react";
import Modal from "./Modal";
import RoleForm from "./RoleForm";
import RoleList from "./RoleList";
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
  if (!isOpen || !actor) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    FullName: actor.FullName,
    Birthdate: actor.Birthdate || "",
  });

  const handleSave = () => {
    onUpdateActor({ ...actor, ...editData });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this actor?")) return;
    onDeleteActor(actor.ID);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="actor-modal">
        {isEditing ? (
          <>
            <h3>Edit Actor</h3>
            <div className="form-field">
              <input
                id="actor-fullname"
                name="FullName"
                value={editData.FullName}
                onChange={(e) =>
                  setEditData({ ...editData, FullName: e.target.value })
                }
                placeholder="Full Name"
              />
            </div>

            <div className="form-field">
              <input
                id="actor-birthdate"
                name="Birthdate"
                value={editData.Birthdate}
                onChange={(e) =>
                  setEditData({ ...editData, Birthdate: e.target.value })
                }
                placeholder="Birthdate (optional, DD.MM.YYYY)"
              />
            </div>

            <div className="modal-buttons">
              <button
                onClick={handleSave}
                className="btn-primary small"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-ghost small"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>{actor.FullName}</h3>
            <p>
              <strong>Birthdate:</strong> {actor.Birthdate || "Unknown"}
            </p>
            <div className="modal-buttons">
              <button className="btn-primary small" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="btn-ghost small" onClick={handleDelete}>
                Delete
              </button>
            </div>
            <h4>Roles</h4>
            <RoleList
              roles={roles}
              movies={movies}
              onUpdate={onUpdateRole}
              onDelete={onDeleteRole}
              existingRolesForActor={roles}
            />
            <RoleForm
              actorId={actor.ID}
              movies={movies}
              onAddRole={onAddRole}
              existingRolesForActor={roles}
            />
          </>
        )}
      </div>
    </Modal>
  );
}

export default ActorModal;
