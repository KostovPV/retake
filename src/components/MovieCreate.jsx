import { useState } from "react";

// Convert DD.MM.YYYY -> MM/DD/YYYY for storage
const convertToStorageDate = (europeanDate) => {
  const [day, month, year] = europeanDate.split(".");
  return `${month}/${day}/${year}`;
};

function MovieCreate({ onCancel, onSave, existingMovies }) {
  const [form, setForm] = useState({ Title: "", ReleaseDate: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const nextId =
      existingMovies.length > 0
        ? Math.max(...existingMovies.map((m) => Number(m.ID))) + 1
        : 1;

    const newMovie = {
      ID: String(nextId),
      Title: form.Title,
      ReleaseDate: convertToStorageDate(form.ReleaseDate),
    };

    onSave(newMovie);
  };

  return (
    <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
      <h3>Create New Movie</h3>
      <input
        name="Title"
        value={form.Title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="ReleaseDate"
        value={form.ReleaseDate}
        onChange={handleChange}
        placeholder="Release Date (DD.MM.YYYY)"
      />
      <div>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default MovieCreate;
