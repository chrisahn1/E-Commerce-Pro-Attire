import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Signup() {
  const navigate = useNavigate();

  const [username_input, setUsername] = useState('');
  const [email_input, setEmail] = useState('');
  const [password_input, setPassword] = useState('');

  const handleUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setUsername(e.target.value);
  };

  const handleEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log(username_input);
    console.log(email_input);
    console.log(password_input);
    try {
      const body = {
        username: username_input,
        email: email_input,
        password: password_input,
      };
      //127.0.0.1:5173/
      //http:localhost:5173/
      const response = await fetch('http://localhost:5173/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log(result);
    } catch (error: unknown) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
    navigate('/');
  };

  return (
    <div>
      <div>Signup</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username_input}
            placeholder="Username.."
            onChange={handleUsername}
            required
          />
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
