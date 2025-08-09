import { useState } from "react";
import './RoleForm.css';

function RoleForm({ actorId, movies, onAddRole }) {
  const [form, setForm] = useState({ MovieID: "", RoleName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.MovieID || !form.RoleName) return alert("All fields required");
    onAddRole({ ...form, ActorID: actorId });
    setForm({ MovieID: "", RoleName: "" });
  };

  return (
    <div className="role-form">
      <h4>Add Role</h4>
      <select name="MovieID" value={form.MovieID} onChange={handleChange}>
        <option value="">Select movie</option>
        {movies.map((m) => (
          <option key={m.ID} value={m.ID}>{m.Title}</option>
        ))}
      </select>
      <input
        name="RoleName"
        value={form.RoleName}
        onChange={handleChange}
        placeholder="Role Name"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default RoleForm;
