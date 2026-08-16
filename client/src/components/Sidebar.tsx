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
    <div>
      <div>Sidebar</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
