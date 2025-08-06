import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import TopActorPair from '../components/TopActorPair';

function HomeView() {
  const { actors, roles, movies } = useContext(DataContext);

  return (
    <div className="home-view">
      <h1>Home view component</h1>
      <TopActorPair actors={actors} roles={roles} movies={movies} />

    </div>
  );
}

export default HomeView;
