import { useState, useMemo } from "react";
import {
  buildNameSet,
  getActorNameError,
  getBirthdateError,
} from "../utils/validation";
import "./ActorCreate.css";

export default function ActorCreate({ existingActors, onSave, onCancel }) {
  const [form, setForm] = useState({ FullName: "", Birthdate: "" });
  const [touched, setTouched] = useState({});

  const normalizedNames = useMemo(() => buildNameSet(existingActors), [existingActors]);

  const errors = useMemo(() => {
    const e = {};
    const nameErr = getActorNameError(form.FullName, normalizedNames);
    if (nameErr) e.FullName = nameErr;

    const birthErr = getBirthdateError(form.Birthdate);
    if (birthErr) e.Birthdate = birthErr;

    return e;
  }, [form, normalizedNames]);

  const disableSave = Object.keys(errors).length > 0;

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));

  const handleSave = () => {
    if (disableSave) return;
    const nextId =
      (existingActors?.length ?? 0) > 0
        ? String(Math.max(...existingActors.map(a => Number(a.ID))) + 1)
        : "1";

    onSave({
      ID: nextId,
      FullName: form.FullName.trim(),
      Birthdate: form.Birthdate.trim(),
    });
    alert("Actor created successfully!");
  };

  return (
    <div className="add-actor-form">
      <div className="form-field">
        <input
          name="FullName"
          value={form.FullName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Full Name (e.g., Tom Hanks)"
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
