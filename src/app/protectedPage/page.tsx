// app/protected/page.tsx
'use client';

import { useEffect, useState } from 'react';

const ProtectedPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const res = await fetch('/api/protected', {
          headers: {
            Authorization: token,
          },
        });

        console.log('res: ',res)

        if (!res.ok) {
          throw new Error('Invalid or expired token');
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Protected Data</h1>
      <p>{data.message || 'Access granted'}</p>
    </div>
  );
};

export default ProtectedPage;
