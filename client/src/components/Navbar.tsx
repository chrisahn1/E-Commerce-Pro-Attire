import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const result = await response.json();
    console.log(result);
    setAccessToken('');
    navigate('/', { replace: true });
  };
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/topwear">Topwear</NavLink>
        </li>
        <li>
          <NavLink to="/pants">Pants</NavLink>
        </li>
        <li>
          <NavLink to="/shoes">Shoes</NavLink>
        </li>
        <li>
          <NavLink to="/purchaselist">Purchase List</NavLink>
        </li>
        <li>
          <NavLink to="/kart">Kart</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
