import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
    } else {
      setMessage(data.message);
    }
  };

  const fetchProtected = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/protected', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Bank Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button onClick={handleRegister} className="w-full py-2 mb-2 rounded bg-gray-500 text-white">
        Register
      </button>
      <button onClick={handleLogin} className="w-full py-2 mb-2 rounded bg-blue-500 text-white">
        Login
      </button>
      <button onClick={fetchProtected} className="w-full py-2 rounded bg-green-500 text-white">
        Get Protected Data
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default App;
