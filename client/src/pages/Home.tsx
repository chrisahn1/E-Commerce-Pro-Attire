import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();

  const { setAccessToken } = useAuth();

  const [email_input, setEmail] = useState('');
  const [password_input, setPassword] = useState('');

  const handleEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        email: email_input,
        password: password_input,
      };
      // 'http://127.0.0.1:5173/api/login'
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      // console.log('logged in: ', result);
      const decoded_token = jwtDecode(result.accessToken);
      console.log(decoded_token);
      setAccessToken(result.accessToken);
      navigate('/userpage');
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  return (
    <div>
      <div>Login</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email_input}
            placeholder="Email.."
            onChange={handleEmail}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password_input}
            placeholder="Password.."
            onChange={handlePassword}
            required
          />
          <button className="submitButton" type="submit">
            Login
          </button>
        </form>
      </div>
      <button type="button" onClick={() => navigate('/signup')}>
        Signup
      </button>
      <button type="button" onClick={() => navigate('/userpage')}>
        Userpage
      </button>
    </div>
  );
}
