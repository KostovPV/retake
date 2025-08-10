import { useState, useMemo } from "react";
import Modal from "./Modal";
import "./RoleModal.css";

function normalize(s) {
  return (s ?? "").toString().trim().toLowerCase().replace(/\s+/g, " ");
}

export default function RoleModal({ role, movies, onUpdate, onDelete, onClose, existingRolesForActor = [] }) {
  const [form, setForm] = useState({
    MovieID: role.MovieID,
    RoleName: role.RoleName || "",
  });
  const [touched, setTouched] = useState({});

  // Build set of (MovieID::RoleName) for the same actor, excluding the current role id
  const existingPairs = useMemo(
    () =>
      new Set(
        existingRolesForActor
          .filter(r => String(r.ActorID) === String(role.ActorID) && String(r.ID) !== String(role.ID))
          .map(r => `${r.MovieID}::${normalize(r.RoleName)}`)
      ),
    [existingRolesForActor, role.ActorID, role.ID]
  );

  const errors = useMemo(() => {
    const e = {};
    if (!form.MovieID) e.MovieID = "Select a movie.";
    if (!form.RoleName.trim()) e.RoleName = "Role name is required.";
    const key = `${form.MovieID}::${normalize(form.RoleName)}`;
    if (!e.MovieID && !e.RoleName && existingPairs.has(key)) {
      e.RoleName = "This role already exists for this actor in that movie.";
    }
    return e;
  }, [form, existingPairs]);

  const disableSave = Object.keys(errors).length > 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSave = () => {
    if (disableSave) return;
    onUpdate(role.ID, { MovieID: form.MovieID, RoleName: form.RoleName.trim() });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Delete this role?")) {
      onDelete(role.ID);
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="role-modal">
        <h3>Edit Role</h3>

        <div className="form-field">
          <label>Movie</label>
          <select
            name="MovieID"
            value={form.MovieID}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!errors.MovieID}
          >
            <option value="">Select a movie</option>
            {movies.map((m) => (
              <option key={m.ID} value={m.ID}>
                {m.Title}
              </option>
            ))}
          </select>
          {touched.MovieID && errors.MovieID && <div className="error">{errors.MovieID}</div>}
        </div>

        <div className="form-field">
          <label>Role Name</label>
          <input
            name="RoleName"
            value={form.RoleName}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!errors.RoleName}
          />
          {touched.RoleName && errors.RoleName && <div className="error">{errors.RoleName}</div>}
        </div>

        <div className="role-modal-buttons">
          <button onClick={handleSave} disabled={disableSave} className={disableSave ? "btn-disabled" : ""}>
            Save
          </button>
          <button onClick={handleDelete} className="btn-ghost">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
