import { useState, useMemo } from "react";
import "./RoleForm.css";

function normalize(s) {
  return (s ?? "").toString().trim().toLowerCase().replace(/\s+/g, " ");
}

export default function RoleForm({ actorId, movies, onAddRole, existingRolesForActor = [] }) {
  const [form, setForm] = useState({ MovieID: "", RoleName: "" });
  const [touched, setTouched] = useState({});

  const existingPairs = useMemo(
    () =>
      new Set(
        existingRolesForActor
          .filter(r => String(r.ActorID) === String(actorId))
          .map(r => `${r.MovieID}::${normalize(r.RoleName)}`)
      ),
    [existingRolesForActor, actorId]
  );

  const errors = useMemo(() => {
    const e = {};
    if (!form.MovieID) e.MovieID = "Select a movie.";
    if (!form.RoleName.trim()) e.RoleName = "Role name is required.";

    const key = `${form.MovieID}::${normalize(form.RoleName)}`;
    if (!e.RoleName && !e.MovieID && existingPairs.has(key)) {
      e.RoleName = "This role already exists for this actor in that movie.";
    }
    return e;
  }, [form, existingPairs]);

  const disableAdd = Object.keys(errors).length > 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = () => {
    if (disableAdd) return;
    onAddRole({ ...form, ActorID: actorId });
    setForm({ MovieID: "", RoleName: "" });
    setTouched({});
  };

  return (
    <div className="role-form">
      <h4>Add Role</h4>

      <div className="form-field">
        <select
          name="MovieID"
          value={form.MovieID}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!errors.MovieID}
        >
          <option value="">Select movie</option>
          {movies.map((m) => (
            <option key={m.ID} value={m.ID}>
              {m.Title}
            </option>
          ))}
        </select>
        {touched.MovieID && errors.MovieID && <div className="error">{errors.MovieID}</div>}
      </div>

      <div className="form-field">
        <input
          name="RoleName"
          value={form.RoleName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Role Name"
          aria-invalid={!!errors.RoleName}
        />
        {touched.RoleName && errors.RoleName && <div className="error">{errors.RoleName}</div>}
      </div>

      <button onClick={handleSubmit} disabled={disableAdd} className={disableAdd ? "btn-disabled" : ""}>
        Add
      </button>
    </div>
  );
}
