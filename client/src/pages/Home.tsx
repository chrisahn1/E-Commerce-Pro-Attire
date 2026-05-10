import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div>Login</div>
      <button type="button" onClick={() => navigate('/signup')}>
        Signup
      </button>
    </div>
  );
}
