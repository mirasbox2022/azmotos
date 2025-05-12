import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bike, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await signOut();
    closeMenu();
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-zinc-900 shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center text-white">
            <Bike className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-xl font-bold">AZMOTOS</span>
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex space-x-6">
            {user && (
              <>
                <Link 
                  to="/catalog" 
                  className={`text-white hover:text-red-500 transition-colors ${
                    location.pathname === '/catalog' ? 'font-bold text-red-500' : ''
                  }`}
                >
                  Каталог
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-white hover:text-red-500 transition-colors ${
                    location.pathname === '/contact' ? 'font-bold text-red-500' : ''
                  }`}
                >
                  Контакты
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:text-red-500 transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Выйти
                </button>
              </>
            )}
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className={`text-white hover:text-red-500 transition-colors ${
                    location.pathname === '/login' ? 'font-bold text-red-500' : ''
                  }`}
                >
                  Вход
                </Link>
                <Link 
                  to="/register" 
                  className={`text-white hover:text-red-500 transition-colors ${
                    location.pathname === '/register' ? 'font-bold text-red-500' : ''
                  }`}
                >
                  Регистрация
                </Link>
              </>
            )}
          </nav>

          {/* Кнопка мобильного меню */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-zinc-900 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {user && (
                  <>
                    <Link 
                      to="/catalog" 
                      onClick={closeMenu}
                      className={`text-white hover:text-red-500 transition-colors py-2 ${
                        location.pathname === '/catalog' ? 'font-bold text-red-500' : ''
                      }`}
                    >
                      Каталог
                    </Link>
                    <Link 
                      to="/contact" 
                      onClick={closeMenu}
                      className={`text-white hover:text-red-500 transition-colors py-2 ${
                        location.pathname === '/contact' ? 'font-bold text-red-500' : ''
                      }`}
                    >
                      Контакты
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-white hover:text-red-500 transition-colors py-2 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Выйти
                    </button>
                  </>
                )}
                {!user && (
                  <>
                    <Link 
                      to="/login" 
                      onClick={closeMenu}
                      className={`text-white hover:text-red-500 transition-colors py-2 ${
                        location.pathname === '/login' ? 'font-bold text-red-500' : ''
                      }`}
                    >
                      Вход
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={closeMenu}
                      className={`text-white hover:text-red-500 transition-colors py-2 ${
                        location.pathname === '/register' ? 'font-bold text-red-500' : ''
                      }`}
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;