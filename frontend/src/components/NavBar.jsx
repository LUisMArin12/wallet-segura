import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand">
        <span className="brand-mark">W</span>
        <span>Wallet Segura</span>
      </Link>

      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Perfil</NavLink>
            <NavLink to="/payment-methods">Métodos</NavLink>
            <button type="button" className="link-button" onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registro</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
