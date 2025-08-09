import "./RoleList.css";

function RoleList({ roles, movies, onOpenModal }) {
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
            const movie = movies.find((m) => String(m.ID) === String(role.MovieID));
            return (
              <tr key={role.ID} onClick={() => onOpenModal(role.ID)}>
                <td>{movie ? movie.Title : "Unknown Movie"}</td>
                <td>{role.RoleName || "Unnamed"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RoleList;
