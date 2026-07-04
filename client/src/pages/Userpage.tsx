export default function Userpage() {
  const deleteUsers = async () => {
    const response = await fetch('http://127.0.0.1:5173/api/deleteusers', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    console.log(result.message);
  };
  return (
    <div>
      <div>Hello, Userpage</div>
      <div>
        <button onClick={deleteUsers}>Delete Users</button>
      </div>
    </div>
  );
}
