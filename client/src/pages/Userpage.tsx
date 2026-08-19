import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

export default function Userpage() {
  const { accessToken } = useAuth();
  // const navigate = useNavigate();
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
  return (
    <div>
      {/* <div>
        <button onClick={deleteUsers}>Delete Users</button>
      </div> */}
      <h1 color="black">Home</h1>
      <div>
        <div>
          <button onClick={testAuth}>Testing Auth</button>
        </div>
      </div>
    </div>
  );
}
