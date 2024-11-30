'use client';
import { useState } from 'react';
import { sendLoginData } from '@/services/userService';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      const response = await sendLoginData(username, password);
      if (response.ok) {
        const data = await response.json();
        const authToken = data.auth_token;
        localStorage.setItem('auth_token', authToken);
        alert('Login successful!');
        window.location.href = '/search';
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
