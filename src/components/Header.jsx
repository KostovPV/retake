import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // custom styles

const Header = () => {
  const location = useLocation();

  return (
    <header className="custom-navbar">
      <nav className="custom-navbar-container">
        <div className="custom-navbar-links">
          <Link
            to="/"
            className={`custom-navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className={`custom-navbar-link ${location.pathname === '/movies' ? 'active' : ''}`}
          >
            Movies
          </Link>
          <Link
            to="/actors"
            className={`custom-navbar-link ${location.pathname === '/actors' ? 'active' : ''}`}
          >
            Actors
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
