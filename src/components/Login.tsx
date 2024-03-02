import useAuth from '@hooks/useAuth';
import React, { useState } from 'react';

interface Props {
  isNew: boolean;
}

function Login({ isNew }: Props) {
  const { login, register, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isNew ? register(email, password, name) : login(email, password);
  };

  return (
    <div>
      <h1>{isNew ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        {isNew && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={loading} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
