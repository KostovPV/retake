import { useState, useMemo } from "react";

// Convert DD.MM.YYYY -> MM/DD/YYYY for storage
const toStorageDate = (eu) => {
  const [dd, mm, yyyy] = eu.split(".");
  return `${mm}/${dd}/${yyyy}`;
};

const DATE_RE = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/;

export default function MovieCreate({ onCancel, onSave, existingMovies }) {
  const [form, setForm] = useState({ Title: "", ReleaseDate: "" });
  const [touched, setTouched] = useState({});

  const normalizedTitles = useMemo(
    () => new Set(existingMovies.map(m => (m.Title || "").trim().toLowerCase())),
    [existingMovies]
  );

  const errors = useMemo(() => {
    const e = {};
    const title = form.Title.trim();
    const date = form.ReleaseDate.trim();

    if (!title) e.Title = "Title is required.";
    else if (normalizedTitles.has(title)) e.Title = "A movie with this title already exists.";

    if (!date) e.ReleaseDate = "Release date is required.";
    else if (!DATE_RE.test(date)) e.ReleaseDate = "Use DD.MM.YYYY (e.g., 07.09.2020).";

    return e;
  }, [form, normalizedTitles]);

  const disableSave = Object.keys(errors).length > 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = () => {
    if (disableSave) return;

    const nextId =
      existingMovies.length > 0
        ? String(Math.max(...existingMovies.map((m) => Number(m.ID))) + 1)
        : "1";

    onSave({
      ID: nextId,
      Title: form.Title.trim(),
      ReleaseDate: toStorageDate(form.ReleaseDate.trim()),
    });
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
        {touched.ReleaseDate && errors.ReleaseDate && (
          <div className="error">{errors.ReleaseDate}</div>
        )}
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
