import { useState, useMemo } from "react";
import {
  buildTitleSet,
  getTitleError,
  getReleaseDateError,
  toStorageDate,
} from "../utils/validation";

export default function MovieCreate({ onCancel, onSave, existingMovies }) {
  const [form, setForm] = useState({ Title: "", ReleaseDate: "" });
  const [touched, setTouched] = useState({});

  const normalizedTitles = useMemo(() => buildTitleSet(existingMovies), [existingMovies]);

  const errors = useMemo(() => {
    const e = {};
    const titleErr = getTitleError(form.Title, normalizedTitles);
    if (titleErr) e.Title = titleErr;

    const dateErr = getReleaseDateError(form.ReleaseDate);
    if (dateErr) e.ReleaseDate = dateErr;

    return e;
  }, [form, normalizedTitles]);

  const disableSave = Object.keys(errors).length > 0;

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));

  const handleSubmit = () => {
    if (disableSave) return;

    const nextId =
      (existingMovies?.length ?? 0) > 0
        ? String(Math.max(...existingMovies.map(m => Number(m.ID))) + 1)
        : "1";

    onSave({
      ID: nextId,
      Title: form.Title.trim(),
      ReleaseDate: toStorageDate(form.ReleaseDate.trim()),
    });

    alert("Movie created successfully.");
    onCancel();
  };

  return (
    <div style={{ marginTop: 20, borderTop: "1px solid #ccc", paddingTop: 10 }}>
      <h3>Create New Movie</h3>

      <div className="form-field">
        <input
          name="Title"
          value={form.Title}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Title"
          aria-invalid={!!errors.Title}
        />
        {touched.Title && errors.Title && <div className="error">{errors.Title}</div>}
      </div>

      <div className="form-field">
        <input
          name="ReleaseDate"
          value={form.ReleaseDate}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Release Date (DD.MM.YYYY)"
          aria-invalid={!!errors.ReleaseDate}
        />
        {touched.ReleaseDate && errors.ReleaseDate && <div className="error">{errors.ReleaseDate}</div>}
      </div>

      <div style={{ display: "flex", gap: ".5rem" }}>
        <button onClick={handleSubmit} disabled={disableSave} className={disableSave ? "btn-disabled" : ""}>
          Save
        </button>
        <button onClick={onCancel} className="btn-ghost">Cancel</button>
      </div>
    </div>
  );
}
