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
    navigate('/');
  };

  return (
    <div>
      <div>Login</div>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
