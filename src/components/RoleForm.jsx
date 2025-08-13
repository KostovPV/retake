import { useState, useMemo } from "react";
import "./RoleForm.css";

function normalize(s) {
  return (s ?? "").toString().trim().toLowerCase().replace(/\s+/g, " ");
}

export default function RoleForm({
  actorId,
  movies,
  onAddRole,
  existingRolesForActor = [],
}) {
  const [form, setForm] = useState({ MovieID: "", RoleName: "" });
  const [touched, setTouched] = useState({});

  // (movie, roleName) pairs for this actor — exclude current entry logic not needed here
  const existingPairs = useMemo(
    () =>
      new Set(
        existingRolesForActor
          .filter((r) => String(r.ActorID) === String(actorId))
          .map((r) => `${r.MovieID}::${normalize(r.RoleName)}`)
      ),
    [existingRolesForActor, actorId]
  );

  const errors = useMemo(() => {
    const e = {};
    if (!form.MovieID) e.MovieID = "Select a movie.";

    const trimmed = (form.RoleName ?? "").trim();

    // Only check duplicate if a role name is provided
    if (trimmed) {
      const key = `${form.MovieID}::${normalize(trimmed)}`;
      if (!e.MovieID && existingPairs.has(key)) {
        e.RoleName = "This role already exists for this actor in that movie.";
      }
    }

    // NOTE: no 'required' error — empty is allowed (NULL)
    return e;
  }, [form.MovieID, form.RoleName, existingPairs]);

  const disableAdd = Object.keys(errors).length > 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = () => {
    if (disableAdd) return;
    const trimmed = (form.RoleName ?? "").trim();
    const finalRoleName = trimmed === "" ? null : trimmed; // allow NULL
    onAddRole({ ...form, ActorID: actorId, RoleName: finalRoleName });
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
        {touched.MovieID && errors.MovieID && (
          <div className="error">{errors.MovieID}</div>
        )}
      </div>

      <div className="form-field">
        <input
          name="RoleName"
          value={form.RoleName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Role Name (leave empty for Unnamed)"
          aria-invalid={!!errors.RoleName}
        />
        {touched.RoleName && errors.RoleName && (
          <div className="error">{errors.RoleName}</div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={disableAdd}
        className={disableAdd ? "btn-disabled" : ""}
      >
        Add
      </button>
    </div>
  );
}
