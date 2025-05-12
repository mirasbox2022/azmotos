import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Filter, Search, ChevronRight } from 'lucide-react';
import type { Motorcycle } from '../types/supabase';
import MotorcycleCard from '../components/MotorcycleCard';

const brands = ['Все', 'Ducati', 'BMW', 'Suzuki', 'Kawasaki', 'Honda', 'KTM', 'Aprilia', 'Racer'];

const Catalog: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('Все');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        let query = supabase.from('motorcycles').select('*');
        
        if (selectedBrand !== 'Все') {
          query = query.eq('brand', selectedBrand);
        }
        
        if (searchTerm) {
          query = query.or(`model.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setMotorcycles(data || []);
      } catch (err) {
        console.error('Ошибка при загрузке мотоциклов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, [selectedBrand, searchTerm]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-red-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-lg">Загрузка мотоциклов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Баннер */}
        <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-red-900 to-red-600">
          <div className="p-8 md:p-12 lg:max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Лучшие спортбайки в Казахстане</h1>
            <p className="text-white/90 text-lg mb-6">
              Выберите мотоцикл своей мечты от ведущих мировых производителей. 
              Только качественные и проверенные модели.
            </p>
            <a href="#motorcycles" className="btn-primary inline-flex items-center">
              Смотреть каталог <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Фильтры и поиск */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-white">Каталог мотоциклов</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Поиск мотоциклов..."
                  className="input-field w-full md:w-64 pl-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button 
                onClick={toggleFilters}
                className="btn-secondary flex items-center gap-2"
              >
                <Filter className="h-4 w-4" /> 
                Фильтры
              </button>
            </div>
          </div>

          {/* Фильтры */}
          <motion.div 
            className="overflow-hidden"
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-zinc-900 rounded-lg mb-4">
              <h3 className="text-white font-medium mb-3">Марка мотоцикла</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      selectedBrand === brand 
                        ? 'bg-red-600 text-white' 
                        : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                    } transition-colors`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Каталог мотоциклов */}
        <div id="motorcycles">
          {motorcycles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-white mb-2">Мотоциклы не найдены</h3>
              <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {motorcycles.map((motorcycle) => (
                <MotorcycleCard 
                  key={motorcycle.id} 
                  motorcycle={motorcycle} 
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;