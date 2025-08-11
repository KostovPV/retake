import { useState, useMemo, useEffect } from "react";
import Modal from "./Modal";
import RoleForm from "./RoleForm";
import RoleList from "./RoleList";
import {
  buildNameMap,
  getActorNameError,
  getBirthdateError,
} from "../utils/validation";
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
  allActors = [],
}) {
  if (!isOpen || !actor) return null;

  const nameMap = useMemo(() => {
    // map of name->id for all actors
    return buildNameMap(allActors.length ? allActors : [actor]);
  }, [allActors, actor]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    FullName: actor.FullName || "",
    Birthdate: actor.Birthdate || "",
  });
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setEditData({
      FullName: actor.FullName || "",
      Birthdate: actor.Birthdate || "",
    });
    setTouched({});
  }, [actor]);

  const errors = useMemo(() => {
    const e = {};
    const nameErr = getActorNameError(editData.FullName, nameMap, actor.ID);
    if (nameErr) e.FullName = nameErr;

    const birthErr = getBirthdateError(editData.Birthdate);
    if (birthErr) e.Birthdate = birthErr;

    return e;
  }, [editData, nameMap, actor.ID]);

  const disableSave = Object.keys(errors).length > 0;

  const handleSave = () => {
    if (disableSave) return;
    onUpdateActor({
      ...actor,
      FullName: editData.FullName.trim(),
      Birthdate: editData.Birthdate.trim(),
    });
    alert("Actor updated successfully!");
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this actor?")) return;
    onDeleteActor(actor.ID);
    onClose();
  };

  const onChange = (e) => setEditData(d => ({ ...d, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));

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
                onChange={onChange}
                onBlur={onBlur}
                placeholder='Full Name (e.g., "Tom Hanks")'
                aria-invalid={!!errors.FullName}
              />
              {touched.FullName && errors.FullName && <div className="error">{errors.FullName}</div>}
            </div>

            <div className="form-field">
              <input
                id="actor-birthdate"
                name="Birthdate"
                value={editData.Birthdate}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Birthdate (optional, DD.MM.YYYY)"
                aria-invalid={!!errors.Birthdate}
              />
              {touched.Birthdate && errors.Birthdate && <div className="error">{errors.Birthdate}</div>}
            </div>

            <div className="modal-buttons">
              <button className={`btn-primary small ${disableSave ? "btn-disabled" : ""}`} onClick={handleSave} disabled={disableSave}>
                Save
              </button>
              <button className="btn-ghost small" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h3>{actor.FullName}</h3>
            <p><strong>Birthdate:</strong> {actor.Birthdate || "Unknown"}</p>

            <div className="modal-buttons">
              <button className="btn-primary small" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn-ghost small" onClick={handleDelete}>Delete</button>
            </div>

            <h4>Roles</h4>
            <RoleList roles={roles} movies={movies} onUpdate={onUpdateRole} onDelete={onDeleteRole} existingRolesForActor={roles} />
            <RoleForm actorId={actor.ID} movies={movies} onAddRole={onAddRole} existingRolesForActor={roles} />
          </>
        )}
      </div>
    </Modal>
  );
}

export default ActorModal;
