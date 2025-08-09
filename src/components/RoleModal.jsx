import { useState } from "react";
import Modal from "./Modal";
import "./RoleModal.css";

function RoleModal({ role, movies, onUpdate, onDelete, onClose }) {
  const [form, setForm] = useState({
    MovieID: role.MovieID,
    RoleName: role.RoleName || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(role.ID, form);
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

        <label>Movie</label>
        <select name="MovieID" value={form.MovieID} onChange={handleChange}>
          <option value="">Select a movie</option>
          {movies.map((m) => (
            <option key={m.ID} value={m.ID}>{m.Title}</option>
          ))}
        </select>

        <label>Role Name</label>
        <input name="RoleName" value={form.RoleName} onChange={handleChange} />

        <div className="role-modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </Modal>
  );
}

export default RoleModal;
