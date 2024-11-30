'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BASE_API_URL =
  'https://lks5ix2fxrfihvyl3rdeyhwkci0vogjc.lambda-url.ap-south-1.on.aws/';

interface Bookmark {
  _id: string;
  article_id: string;
  title: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = localStorage.getItem('auth_token');
        if (!authToken) {
          alert('Authorization token missing. Redirecting to login.');
          router.push('/login');
          return;
        }

        const response = await fetch(`${BASE_API_URL}/get-bookmarks`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setBookmarks(data.data);
          } else {
            throw new Error('Failed to fetch bookmarks');
          }
        } else {
          throw new Error('Failed to fetch bookmarks');
        }
      } catch (err) {
        setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [router]);

  const handleCardClick = (title: string) => {
    router.push(`/article/${title}`);
  };

  if (loading) return <p>Loading bookmarks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h1>Your Bookmarks</h1>
      <div style={styles.grid}>
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark._id}
            style={styles.card}
            onClick={() => handleCardClick(bookmark.title)}
          >
            <h3>{bookmark.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
};
