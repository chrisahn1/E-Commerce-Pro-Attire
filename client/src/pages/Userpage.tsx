import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Userpage() {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  // const deleteUsers = async () => {
  //   const response = await fetch('http://127.0.0.1:5173/api/deleteusers', {
  //     method: 'DELETE',
  //     credentials: 'include',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   const result = await response.json();
  //   console.log(result.message);
  // };
  const testAuth = async () => {
    const response = await fetch('/api/users/username', {
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
    const result = await response.json();
    console.log(result);
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
    <div>
      <div>Hello, Userpage</div>
      {/* <div>
        <button onClick={deleteUsers}>Delete Users</button>
      </div> */}
      <div>
        <button onClick={testAuth}>Testing Auth</button>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
