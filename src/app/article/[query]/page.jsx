'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BASE_API_URL =
  'https://lks5ix2fxrfihvyl3rdeyhwkci0vogjc.lambda-url.ap-south-1.on.aws/';
import { use } from 'react';

export default function ArticlePage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [pageData, setPageData] = useState(null);
  const [pageTags, setPageTags] = useState([]);
  const [articleId, setArticleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkStatus, setBookmarkStatus] = useState(false); 

  const query = params.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = localStorage.getItem('auth_token');
        if (!authToken) {
          alert('Authorization token missing. Redirecting to login.');
          router.push('/login');
          return;
        }

        const response = await fetch(
          `${BASE_API_URL}/get-data?query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPageData(data.page_data);
          setPageTags(data.page_tags);
          setArticleId(data.article_id);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookmark = async () => {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
      alert('Authorization token missing. Redirecting to login.');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(
        `${BASE_API_URL}/add-bookmark?article_id=${articleId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        setBookmarkStatus(true);
        alert('Article bookmarked!');
      } else {
        throw new Error('Failed to bookmark article');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <button onClick={handleBookmark} style={styles.bookmarkButton}>
        {bookmarkStatus ? 'Bookmarked' : 'Bookmark'}
      </button>
      <h1>{query}</h1>
      <div style={styles.content}>
        <p>{pageData || 'No content available.'}</p>
      </div>
      <div style={styles.tags}>
        <h3>Tags:</h3>
        <div>
          {pageTags.length > 0 ? (
            pageTags.map((tag, index) => (
              <span key={index} style={styles.tag}>
                {tag}
                {index < pageTags.length - 1 && ', '}
              </span>
            ))
          ) : (
            <p>No tags available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  bookmarkButton: {
    padding: '10px 20px',
    marginBottom: '20px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  content: {
    marginTop: '20px',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  tags: {
    marginTop: '30px',
  },
  tag: {
    display: 'inline-block',
    marginRight: '10px',
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#eee',
  },
};
