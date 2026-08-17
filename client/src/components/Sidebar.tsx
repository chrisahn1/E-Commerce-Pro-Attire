import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
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
    <div className="sidebar-container">
      <div>Sidebar</div>
      <div>
        <button>Home</button>
      </div>
      <div>
        <button>Top Wear</button>
      </div>
      <div>
        <button>Pants</button>
      </div>
      <div>
        <button>Shoes</button>
      </div>
      <div>
        <button>Purchase List</button>
      </div>
      <div>
        <button>Kart</button>
      </div>
      <div>
        <button>Settings</button>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
