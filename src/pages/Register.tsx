import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bike, Mail, Lock, User, AlertCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/catalog');
    }
  }, [user, navigate]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      // Implement exponential backoff for retries
      const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 60000); // Max 60 seconds
      if (retryCount > 0) {
        await sleep(backoffTime);
      }

      const { data, error: signUpError } = await signUp(email, password);
      
      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('Данный email уже зарегистрирован');
        } else if (signUpError.message.includes('over_email_send_rate_limit')) {
          setError('Превышен лимит отправки email. Пожалуйста, подождите минуту и попробуйте снова.');
          setRetryCount(prev => prev + 1);
        } else {
          setError(signUpError.message);
        }
        return;
      }

      if (data.user) {
        // Wait a moment to ensure the authentication is properly set up
        await sleep(1000);

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              email: email,
              full_name: fullName,
              phone: phone
            }
          ]);

        if (profileError) {
          console.error('Ошибка при создании профиля:', profileError);
          setError('Ошибка при создании профиля пользователя. Пожалуйста, попробуйте позже.');
          return;
        }

        navigate('/catalog');
      }
    } catch (err) {
      setError('Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900 p-8 rounded-xl shadow-2xl max-w-md w-full"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 p-3 rounded-full">
            <Bike className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-6">Регистрация в AZMOTOS</h2>
        
        {error && (
          <div className="bg-red-900/40 border border-red-500 rounded-md p-3 mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <span className="text-sm text-red-200">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
              Полное имя
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field pl-10"
                placeholder="Иван Иванов"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Электронная почта
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="mail@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Телефон
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field pl-10"
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="Минимум 6 символов"
                required
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Подтверждение пароля
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="Повторите пароль"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex justify-center items-center h-12"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Создать аккаунт"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">
            Войти
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
