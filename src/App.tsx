import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

// Контекст для аутентификации
import { AuthProvider } from './contexts/AuthContext';

// Компоненты страниц
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import MotorcycleDetails from './pages/MotorcycleDetails';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Защищенный маршрут
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Обновляем состояние при изменении сессии
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Загрузка...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          } />
          <Route path="catalog" element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          } />
          <Route path="motorcycle/:id" element={
            <ProtectedRoute>
              <MotorcycleDetails />
            </ProtectedRoute>
          } />
          <Route path="contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;