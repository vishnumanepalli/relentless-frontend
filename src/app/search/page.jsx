'use client'
import { useState } from 'react';

const BASE_API_URL =
  'https://lks5ix2fxrfihvyl3rdeyhwkci0vogjc.lambda-url.ap-south-1.on.aws/';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a search term.');
      return;
    }

    try {
      const authToken = localStorage.getItem('auth_token'); // Retrieve token from localStorage
      if (!authToken) {
        alert('You are not logged in. Redirecting to login page...');
        window.location.href = '/login';
        return;
      }

      const response = await fetch(
        `${BASE_API_URL}search?query=${query}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.data[0]);
        console.log('Search successful of 0:', data.data[0]);
      } else {
        alert('Search failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Enter search term"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
      <div style={styles.results}>
        <h2>Results:</h2>
        {results.map((result, index) => (
          <div
            key={index}
            style={styles.resultBar}
            onClick={() => (window.location.href = `/article/${result}`)}
          >
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
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
  results: {
    marginTop: '20px',
    textAlign: 'left',
  },
  resultBar: {
    padding: '20px',
    margin: '10px 0',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
