import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import MovieView from './views/MovieView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/movies" element={<MovieView />} />
      
    </Routes>
  );
}

export default App;

