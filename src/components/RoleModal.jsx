import { useState, useMemo } from "react";
import Modal from "./Modal";
import "./RoleModal.css";

function normalize(s) {
  return (s ?? "").toString().trim().toLowerCase().replace(/\s+/g, " ");
}

export default function RoleModal({
  role,
  movies,
  onUpdate,
  onDelete,
  onClose,
  existingRolesForActor = [],
}) {
  const fixedMovieID = role.MovieID;
  const [form, setForm] = useState({
    RoleName: role.RoleName || "",
  });
  const [touched, setTouched] = useState({});

  const movieTitle =
    movies.find((m) => String(m.ID) === String(fixedMovieID))?.Title ||
    "Unknown Movie";
    
  const existingPairs = useMemo(
    () =>
      new Set(
        existingRolesForActor
          .filter(
            (r) =>
              String(r.ActorID) === String(role.ActorID) &&
              String(r.ID) !== String(role.ID)
          )
          .map((r) => `${r.MovieID}::${normalize(r.RoleName)}`)
      ),
    [existingRolesForActor, role.ActorID, role.ID]
  );

  const errors = useMemo(() => {
    const e = {};
    if (!form.RoleName.trim()) e.RoleName = "Role name is required.";
    const key = `${fixedMovieID}::${normalize(form.RoleName)}`;
    if (!e.RoleName && existingPairs.has(key)) {
      e.RoleName = "This role already exists for this actor in that movie.";
    }
    return e;
  }, [form, fixedMovieID, existingPairs]);

  const disableSave = Object.keys(errors).length > 0;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSave = () => {
    if (disableSave) return;
    onUpdate(role.ID, { MovieID: fixedMovieID, RoleName: form.RoleName.trim() });
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

        {/* Read-only movie display */}
        <div className="form-field">
          <label>Movie</label>
          <div className="readonly-field" title="Movie cannot be changed here">
            {movieTitle}
          </div>
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
          {touched.RoleName && errors.RoleName && (
            <div className="error">{errors.RoleName}</div>
          )}
        </div>

        <div className="role-modal-buttons">
          <button
            onClick={handleSave}
            disabled={disableSave}
            className={disableSave ? "btn-disabled" : ""}
          >
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
