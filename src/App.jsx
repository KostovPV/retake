import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import MovieView from './views/MovieView';
import ActorView from './views/ActorView';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/movies" element={<MovieView />} />
        <Route path="/actors" element={<ActorView />} />
      </Routes>

    </>

  );
}

export default App;

