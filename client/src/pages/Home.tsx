import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log(email_input);
    console.log(password_input);
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
