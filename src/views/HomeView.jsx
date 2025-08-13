// src/views/HomeView.jsx
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import TopActorPair from '../components/TopActorPair';
import WrongFormat from '../components/WrongFormat';
import { isAllOk } from '../utils/schemaGuards';
import './HomeView.css';

function HomeView() {
  const { actors = [], roles = [], movies = [], loading = false } = useContext(DataContext);

  if (loading) {
    return <div className="home-view"><div className="loading">Loading…</div></div>;
  }

  const counts = { a: actors.length, m: movies.length, r: roles.length };
  const hasAnyData = counts.a || counts.m || counts.r;
  const allNonEmpty = counts.a && counts.m && counts.r;

  // 1) Nothing loaded at all -> empty state
  if (!hasAnyData) {
    return (
      <div className="home-view">
        <div className="empty-state">
          <h2>Welcome 👋</h2>
          <p>Add some actors, movies, and roles to see insights here.</p>
        </div>
      </div>
    );
  }

  // 2) Some loaded but not all -> still empty-state (prompt to complete data)
  if (!allNonEmpty) {
    return (
      <div className="home-view">
        <div className="empty-state">
          <h2>Welcome 👋</h2>
          <p>Add some actors, movies, and roles to see insights here.</p>
        </div>
      </div>
    );
  }

  // 3) All lists non-empty -> now run schema check
  if (!isAllOk({ actors, movies, roles })) {
    return <div className="home-view"><WrongFormat where="Home" /></div>;
  }

  // 4) Normal content
  return (
    <div className="home-view">
      <TopActorPair actors={actors} roles={roles} movies={movies} />
    </div>
  );
}
export default HomeView;
