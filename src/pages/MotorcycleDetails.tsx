import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Gauge, Weight, Zap, Clock, Shield, Truck } from 'lucide-react';
import type { Motorcycle } from '../types/supabase';

const MotorcycleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from('motorcycles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setMotorcycle(data as Motorcycle);
      } catch (err: any) {
        console.error('Ошибка при загрузке мотоцикла:', err);
        setError(err.message || 'Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycle();
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  // Форматирование цены
  const formattedPrice = motorcycle ? new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(motorcycle.price) : '';

  // Извлечение спецификаций
  const specs = motorcycle?.specs as { 
    engine: string; 
    power: string;
    weight: string;
    topSpeed: string;
  } | null;

  // Открытие WhatsApp с сообщением о мотоцикле
  const openWhatsApp = () => {
    if (!motorcycle) return;
    
    const message = encodeURIComponent(
      `Здравствуйте! Меня интересует мотоцикл ${motorcycle.brand} ${motorcycle.model} за ${formattedPrice}. Можно узнать подробнее?`
    );
    
    window.open(`https://wa.me/87774936193?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-red-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-lg">Загрузка информации...</p>
        </div>
      </div>
    );
  }

  if (error || !motorcycle) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-8 rounded-xl max-w-md w-full text-center">
          <h2 className="text-2xl text-white mb-4">Мотоцикл не найден</h2>
          <p className="text-gray-400 mb-6">{error || 'Запрашиваемый мотоцикл не существует или был удален'}</p>
          <button onClick={goBack} className="btn-primary flex items-center justify-center mx-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Кнопка назад */}
        <button
          onClick={goBack}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Назад к каталогу
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Фото мотоцикла */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden bg-zinc-900"
          >
            <img
              src={motorcycle.image_url || 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg'}
              alt={`${motorcycle.brand} ${motorcycle.model}`}
              className="w-full h-64 md:h-96 object-cover"
            />
          </motion.div>

          {/* Информация о мотоцикле */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-zinc-900 rounded-xl p-6 md:p-8">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {motorcycle.brand} {motorcycle.model}
                  </h1>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-gray-400">{motorcycle.year} год</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{formattedPrice}</div>
              </div>

              <p className="text-gray-300 mb-6">
                {motorcycle.description || 'Описание отсутствует.'}
              </p>

              {/* Характеристики */}
              <h2 className="text-xl font-bold text-white mb-4">Характеристики</h2>
              
              {specs && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center bg-zinc-800 rounded-lg p-3">
                    <Gauge className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-xs text-gray-400">Двигатель</p>
                      <p className="text-white font-medium">{specs.engine}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-zinc-800 rounded-lg p-3">
                    <Zap className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-xs text-gray-400">Мощность</p>
                      <p className="text-white font-medium">{specs.power}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-zinc-800 rounded-lg p-3">
                    <Weight className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-xs text-gray-400">Вес</p>
                      <p className="text-white font-medium">{specs.weight}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-zinc-800 rounded-lg p-3">
                    <Clock className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-xs text-gray-400">Макс. скорость</p>
                      <p className="text-white font-medium">{specs.topSpeed}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Преимущества */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Преимущества покупки у нас</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-red-500 mr-3" />
                    <p className="text-gray-300">Гарантия 1 года на все мотоциклы</p>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-red-500 mr-3" />
                    <p className="text-gray-300">Доставка по всему Казахстану</p>
                  </div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={openWhatsApp}
                  className="btn-primary flex-1 flex items-center justify-center py-3"
                >
                  Связаться по WhatsApp
                </button>
                <button className="btn-secondary flex-1 flex items-center justify-center py-3">
                  Запросить тест-драйв
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleDetails;