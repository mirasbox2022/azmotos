import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Первая колонка */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">AZMOTOS</h3>
            <p className="text-gray-400 mb-4">
              Два друга, Амир и Жан, объединили свои усилия, чтобы создать лучший магазин мотоциклов в Казахстане. 
              Мы предлагаем только качественные и проверенные модели от ведущих производителей.
            </p>
          </div>

          {/* Вторая колонка */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Бренды</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-red-500 transition-colors"><a href="#">Ducati</a></li>
              <li className="hover:text-red-500 transition-colors"><a href="#">BMW</a></li>
              <li className="hover:text-red-500 transition-colors"><a href="#">Suzuki</a></li>
              <li className="hover:text-red-500 transition-colors"><a href="#">Kawasaki</a></li>
              <li className="hover:text-red-500 transition-colors"><a href="#">Honda</a></li>
              <li className="hover:text-red-500 transition-colors"><a href="#">KTM</a></li>
              <li className="hover:text-red-500 transition-colors"><a href="#">Aprilia</a></li>
            </ul>
          </div>

          {/* Третья колонка */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Контакты</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-red-500" />
                <a href="tel:87774936193" className="hover:text-white transition-colors">
                  +7 (777) 493-61-93
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-red-500" />
                <a href="tel:87784785630" className="hover:text-white transition-colors">
                  +7 (778) 478-56-30
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} AZMOTOS. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;