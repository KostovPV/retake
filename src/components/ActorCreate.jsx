import { useState } from "react";
import "./ActorCreate.css";

function ActorCreate({ existingActors, onSave, onCancel }) {
  const [form, setForm] = useState({ FullName: "", Birthdate: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.FullName.trim()) {
      alert("Full name is required");
      return;
    }
    const nextId =
      existingActors.length > 0
        ? String(Math.max(...existingActors.map((a) => Number(a.ID))) + 1)
        : "1";

    onSave({ ID: nextId, FullName: form.FullName.trim(), Birthdate: form.Birthdate.trim() });
  };

  return (
    <div className="add-actor-form">
      <input
        name="FullName"
        value={form.FullName}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        name="Birthdate"
        value={form.Birthdate}
        onChange={handleChange}
        placeholder="Birthdate"
      />
      <div className="add-actor-actions">
        <button className="btn-primary small" onClick={handleSave}>Save</button>
        <button className="btn-ghost small" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default ActorCreate;
