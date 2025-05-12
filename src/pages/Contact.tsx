import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  // Открытие WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/87774936193', '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Контакты</h1>
          
          <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Форма обратной связи */}
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6">Напишите нам</h2>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input-field"
                      placeholder="Имя Фамилия"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input-field"
                      placeholder="example@mail.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="input-field"
                      placeholder="+7 (XXX) XXX-XX-XX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Ваше сообщение..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full py-3"
                  >
                    Отправить сообщение
                  </button>
                </form>
              </div>
              
              {/* Информация о контактах */}
              <div className="bg-gradient-to-br from-red-900 to-red-700 p-6 md:p-8 flex flex-col">
                <h2 className="text-xl font-bold text-white mb-6">Контактная информация</h2>
                
                <div className="space-y-6 flex-grow">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-white mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-white/80 mb-1">Телефон</p>
                      <p className="text-white font-medium">+7 (777) 493-61-93 (Whatsapp)</p>
                      <p className="text-white font-medium">+7 (778) 478-56-30</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-white mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-white/80 mb-1">Email</p>
                      <p className="text-white font-medium">zhandoldin1@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-white mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-white/80 mb-1">Адрес</p>
                      <p className="text-white font-medium">Алматы, ул. Уржар, 26</p>
                      <p className="text-sm text-white/80 mt-1">Пн-Вс: 10:00 - 20:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-white/90 text-sm mb-3">Для быстрой связи:</p>
                  <button
                    onClick={openWhatsApp}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md w-full transition-all"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Связаться в WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;