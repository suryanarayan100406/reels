import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Hero from './components/hero/Hero';
import Gallery from './components/gallery/Gallery';
import Login from './components/admin/Login';
import RequireAdmin from './components/admin/RequireAdmin';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <Hero />
          <Gallery />
        </AppLayout>
      } />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={
        <RequireAdmin>
          <Dashboard />
        </RequireAdmin>
      } />
    </Routes>
  );
}

export default App;
