import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const home = async () => {
    navigate('/userpage');
  };

  const topwear = async () => {
    navigate('/topwear');
  };

  const pants = async () => {
    navigate('/pants');
  };

  const shoes = async () => {
    navigate('/shoes');
  };

  const purchaselist = async () => {
    navigate('/purchaselist');
  };

  const kart = async () => {
    navigate('/kart');
  };

  const settings = async () => {
    navigate('/settings');
  };

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
        <button onClick={home}>Home</button>
      </div>
      <div>
        <button onClick={topwear}>Top Wear</button>
      </div>
      <div>
        <button onClick={pants}>Pants</button>
      </div>
      <div>
        <button onClick={shoes}>Shoes</button>
      </div>
      <div>
        <button onClick={purchaselist}>Purchase List</button>
      </div>
      <div>
        <button onClick={kart}>Kart</button>
      </div>
      <div>
        <button onClick={settings}>Settings</button>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
