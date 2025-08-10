import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import TopActorPair from '../components/TopActorPair';
import './HomeView.css';

function HomeView() {
  const ctx = useContext(DataContext);

  const actors = Array.isArray(ctx?.actors) ? ctx.actors : [];
  const roles  = Array.isArray(ctx?.roles)  ? ctx.roles  : [];
  const movies = Array.isArray(ctx?.movies) ? ctx.movies : [];

  // If everything is empty, show an empty state
  const nothingLoaded = actors.length === 0 && roles.length === 0 && movies.length === 0;

  return (
    <div className="home-view">
      {nothingLoaded ? (
        <div className="empty-state">
          <h2>Welcome 👋</h2>
          <p>Add some actors, movies, and roles to see insights here.</p>
        </div>
      ) : (
        <TopActorPair actors={actors} roles={roles} movies={movies} />
      )}
    </div>
  );
}

export default HomeView;
