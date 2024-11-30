'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    alert('You have been logged out.');
    router.push('/login');
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <button
            style={styles.navLink}
            onClick={() => router.push('/bookmarks')}
          >
            Bookmarks
          </button>
        </li>
        <li style={styles.navItem}>
          <button style={styles.navLink} onClick={() => router.push('/search')}>
            Search
          </button>
        </li>
        <li style={styles.navItem}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: 0,
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '16px',
  },
  logoutButton: {
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
