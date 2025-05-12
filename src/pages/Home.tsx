import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Героический баннер с изображением */}
      <div className="relative h-screen bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/2519375/pexels-photo-2519375.jpeg)' }}></div>
        
        <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Лучшие спортивные мотоциклы в России
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Погрузитесь в мир скорости и адреналина с эксклюзивной коллекцией мотоциклов от ведущих мировых производителей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="btn-primary text-center py-3 px-8 text-lg">
                Смотреть каталог
              </Link>
              <Link to="/contact" className="btn-secondary text-center py-3 px-8 text-lg">
                Связаться с нами
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Прокрутка вниз */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-white/80 text-sm mb-2">Прокрутите вниз</span>
            <ChevronRight className="h-6 w-6 text-white transform rotate-90" />
          </motion.div>
        </div>
      </div>
      
      {/* Основной контент */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Почему выбирают нас</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Мы предлагаем только лучшие мотоциклы с проверенной историей и гарантией качества
          </p>
        </div>
        
        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-6 rounded-xl"
          >
            <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Широкий выбор</h3>
            <p className="text-gray-400">
              Мы предлагаем мотоциклы от ведущих мировых производителей: Ducati, BMW, Suzuki, Kawasaki, Honda и других.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-6 rounded-xl"
          >
            <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Гарантия качества</h3>
            <p className="text-gray-400">
              Каждый мотоцикл проходит тщательную проверку перед продажей. Мы предоставляем гарантию на все мотоциклы.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-6 rounded-xl"
          >
            <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Профессиональная консультация</h3>
            <p className="text-gray-400">
              Наши специалисты помогут выбрать мотоцикл, который идеально подходит для ваших потребностей и уровня мастерства.
            </p>
          </motion.div>
        </div>
        
        {/* Призыв к действию */}
        <div className="bg-gradient-to-r from-red-900 to-red-600 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Готовы испытать скорость и мощь?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Посетите наш каталог мотоциклов и выберите свой идеальный спортбайк прямо сейчас!
            </p>
            <Link 
              to="/catalog"
              className="inline-block bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition-colors text-lg"
            >
              Перейти к каталогу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;