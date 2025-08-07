import { Link } from 'react-router-dom';


const Header = () => (
  <header className="header">
  <Link to='/'>Home page</Link>
  <Link to='/movies'>Movies page</Link>
  <Link to='/actors'>Actors page</Link>
  </header>
);

export default Header;

