import { useState } from "react";
import RoleModal from "./RoleModal";
import "./RoleList.css";

function RoleList({ roles, movies, onUpdate, onDelete, existingRolesForActor = [] }) {
  const [openRoleId, setOpenRoleId] = useState(null);
  const currentRole = roles.find(r => String(r.ID) === String(openRoleId));

  const close = () => setOpenRoleId(null);

  return (
    <div className="role-list">
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            const movie = movies.find(m => String(m.ID) === String(role.MovieID));
            return (
              <tr
                key={role.ID}
                className="role-row"
                onClick={() => setOpenRoleId(role.ID)}
                title="Click to edit"
              >
                <td>{movie ? movie.Title : "Unknown Movie"}</td>
                <td>{role.RoleName || "Unnamed"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {currentRole && (
        <RoleModal
          role={currentRole}
          movies={movies}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onClose={close}
          existingRolesForActor={existingRolesForActor}
        />
      )}
    </div>
  );
}

export default RoleList;
