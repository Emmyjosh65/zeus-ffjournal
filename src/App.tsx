import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Layout } from './components/Layout';
import { storage } from './services/storage';

// Lazy load pages (placeholder names for now)
import Home from './pages/Home';
import News from './pages/News';
import Redeem from './pages/Redeem';
import Events from './pages/Events';
import Guides from './pages/Guides';
import Search from './pages/Search';
import Tournaments from './pages/Tournaments';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  React.useEffect(() => {
    storage.init();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/events" element={<Events />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
