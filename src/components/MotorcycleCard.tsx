import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type Motorcycle } from '../types/supabase';
import { ArrowRight } from 'lucide-react';

interface Props {
  motorcycle: Motorcycle;
}

const MotorcycleCard: React.FC<Props> = ({ motorcycle }) => {
  // Форматирование цены
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(motorcycle.price);

  // Извлечение мощности из спецификаций
  const specs = motorcycle.specs as { 
    engine: string; 
    power: string;
    weight: string;
    topSpeed: string;
  } | null;

  // Анимация для карточки
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div variants={item} className="card group">
      {/* Изображение */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img 
          src={motorcycle.image_url || 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg'} 
          alt={`${motorcycle.brand} ${motorcycle.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 p-2">
          <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {motorcycle.brand}
          </span>
        </div>
      </div>

      {/* Информация */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
          {motorcycle.brand} {motorcycle.model}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {motorcycle.description || 'Нет описания'}
        </p>
        
        {/* Спецификации */}
        {specs && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-zinc-800 rounded p-2">
              <p className="text-xs text-gray-400">Двигатель</p>
              <p className="text-sm text-white font-medium">{specs.engine}</p>
            </div>
            <div className="bg-zinc-800 rounded p-2">
              <p className="text-xs text-gray-400">Мощность</p>
              <p className="text-sm text-white font-medium">{specs.power}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-white">{formattedPrice}</span>
          <Link 
            to={`/motorcycle/${motorcycle.id}`} 
            className="flex items-center text-red-500 hover:text-red-400 font-medium"
          >
            Подробнее <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MotorcycleCard;