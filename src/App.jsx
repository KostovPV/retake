import './App.css';
import { useContext } from "react";
import { DataContext } from "../src/context/DataContext";
import { formatDate } from "../src/utils/formatDate";

function App() {
  const { actors, movies, roles } = useContext(DataContext);

  return (
    <div>
      <h2>Actors</h2>
      {actors.slice(0, 3).map((actor) => (
        <div key={actor.ID}>
          <strong>{actor.FullName}</strong> — Born: {formatDate(actor.BirthDate)}
        </div>
      ))}

      <h2>Movies</h2>
      {movies.slice(0, 3).map((movie) => (
        <div key={movie.ID}>
          <strong>{movie.Title}</strong> — Released: {formatDate(movie.ReleaseDate)}
        </div>
      ))}

      <h2>Roles</h2>
      {roles.slice(0, 3).map((role) => (
        <div key={role.ID}>
          Actor #{role.ActorID} — Movie #{role.MovieID} — Role: {role.RoleName || "Unnamed"}
        </div>
      ))}
    </div>
  );
}


export default App
