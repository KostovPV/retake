import { useState } from "react";

function RoleList({ roles, movies, onDelete, onUpdate }) {
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editData, setEditData] = useState({ MovieID: "", RoleName: "" });

  const startEdit = (role) => {
    setEditingRoleId(role.ID);
    setEditData({
      MovieID: role.MovieID,
      RoleName: role.RoleName || "",
    });
  };

  const cancelEdit = () => {
    setEditingRoleId(null);
    setEditData({ MovieID: "", RoleName: "" });
  };

  const saveEdit = () => {
    onUpdate(editingRoleId, editData);
    cancelEdit();
  };

  return (
    <ul>
      {roles.length > 0 ? (
        roles.map((role) => {
          const movie = movies.find((m) => String(m.ID) === String(role.MovieID));

          if (editingRoleId === role.ID) {
            return (
              <li key={role.ID}>
                <select
                  value={editData.MovieID}
                  onChange={(e) => setEditData({ ...editData, MovieID: e.target.value })}
                >
                  <option value="">Select movie</option>
                  {movies.map((m) => (
                    <option key={m.ID} value={m.ID}>
                      {m.Title}
                    </option>
                  ))}
                </select>
                <input
                  value={editData.RoleName}
                  onChange={(e) => setEditData({ ...editData, RoleName: e.target.value })}
                  placeholder="Role Name"
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </li>
            );
          }

          return (
            <li key={role.ID}>
              {movie ? movie.Title : "Unknown Movie"} — {role.RoleName || "Unnamed"}
              <button style={{ marginLeft: 10 }} onClick={() => startEdit(role)}>Edit</button>
              <button style={{ marginLeft: 5 }} onClick={() => onDelete(role.ID)}>Delete</button>
            </li>
          );
        })
      ) : (
        <p>No roles assigned.</p>
      )}
    </ul>
  );
}

export default RoleList;
