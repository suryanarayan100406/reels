import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/auth/verify')
      .then(res => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse text-terracotta">Verifying access...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
