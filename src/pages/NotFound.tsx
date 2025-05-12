import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900 p-8 rounded-xl shadow-2xl max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-red-600 p-4 rounded-full">
              <Bike className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-white text-zinc-900 h-8 w-8 rounded-full flex items-center justify-center font-bold">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Страница не найдена</h1>
        
        <p className="text-gray-400 mb-8">
          Кажется, вы уехали не в том направлении. Страница, которую вы ищете, не существует или была перемещена.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="btn-primary flex items-center justify-center"
          >
            <Home className="mr-2 h-4 w-4" />
            На главную
          </Link>
          
          <Link 
            to="/catalog"
            className="btn-secondary flex items-center justify-center"
          >
            <Bike className="mr-2 h-4 w-4" />
            К мотоциклам
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;