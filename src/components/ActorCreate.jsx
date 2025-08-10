import { useState, useMemo } from "react";
import "./ActorCreate.css";

const DATE_RE = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/;

export default function ActorCreate({ existingActors, onSave, onCancel }) {
  const [form, setForm] = useState({ FullName: "", Birthdate: "" });
  const [touched, setTouched] = useState({});

  const normalizedNames = useMemo(
    () => new Set(existingActors.map(a => (a.FullName || "").trim().toLowerCase())),
    [existingActors]
  );

  const errors = useMemo(() => {
    const e = {};
    const name = form.FullName.trim();
    const birth = form.Birthdate.trim();

    if (!name) e.FullName = "Full name is required.";
    else if (normalizedNames.has(name)) e.FullName = "An actor with this name already exists.";

    if (birth && !DATE_RE.test(birth)) e.Birthdate = "Use DD.MM.YYYY or leave empty.";
    return e;
  }, [form, normalizedNames]);

  const disableSave = Object.keys(errors).length > 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSave = () => {
    if (disableSave) return;

    const nextId =
      existingActors.length > 0
        ? String(Math.max(...existingActors.map((a) => Number(a.ID))) + 1)
        : "1";

    onSave({
      ID: nextId,
      FullName: form.FullName.trim(),
      Birthdate: form.Birthdate.trim(),
    });
  };

  return (
    <div className="add-actor-form">
      <div className="form-field">
        <input
          name="FullName"
          value={form.FullName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Full Name"
          aria-invalid={!!errors.FullName}
        />
        {touched.FullName && errors.FullName && <div className="error">{errors.FullName}</div>}
      </div>

      <div className="form-field">
        <input
          name="Birthdate"
          value={form.Birthdate}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Birthdate (optional, DD.MM.YYYY)"
          aria-invalid={!!errors.Birthdate}
        />
        {touched.Birthdate && errors.Birthdate && <div className="error">{errors.Birthdate}</div>}
      </div>

      <div className="add-actor-actions">
        <button onClick={handleSave} disabled={disableSave} className={`btn-primary small ${disableSave ? "btn-disabled" : ""}`}>
          Save
        </button>
        <button className="btn-ghost small" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
