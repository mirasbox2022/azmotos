/*
  # Создание таблиц для сайта продажи мотоциклов

  1. Новые таблицы
    - `profiles` - данные пользователей
      - `id` (uuid, primary key)
      - `email` (text)
      - `full_name` (text)
      - `phone` (text)
      - `created_at` (timestamp)
    - `motorcycles` - каталог мотоциклов
      - `id` (uuid, primary key)
      - `brand` (text)
      - `model` (text)
      - `year` (integer)
      - `price` (integer)
      - `description` (text)
      - `specs` (jsonb)
      - `image_url` (text)
      - `created_at` (timestamp)
  2. Безопасность
    - Включение RLS для всех таблиц
    - Политики для чтения данных
    - Политики для изменения профиля
*/

-- Создание таблицы профилей пользователей
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Создание таблицы мотоциклов
CREATE TABLE IF NOT EXISTS motorcycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  specs JSONB,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Включение Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;

-- Политики безопасности для профилей
CREATE POLICY "Пользователи могут видеть только свой профиль"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Пользователи могут обновлять только свой профиль"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Пользователи могут добавлять только свой профиль"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Политики безопасности для мотоциклов
CREATE POLICY "Мотоциклы доступны для чтения всем"
  ON motorcycles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Мотоциклы доступны для чтения анонимам"
  ON motorcycles
  FOR SELECT
  TO anon
  USING (true);

-- Вставка тестовых данных мотоциклов
INSERT INTO motorcycles (brand, model, year, price, description, specs, image_url)
VALUES 
  ('Ducati', 'Panigale V4', 2023, 2850000, 'Мощный спортивный мотоцикл с характерным дизайном Ducati', 
   '{"engine": "1103 cc", "power": "214 л.с.", "weight": "175 кг", "topSpeed": "299 км/ч"}', 
   'https://images.pexels.com/photos/2611688/pexels-photo-2611688.jpeg'),
  
  ('BMW', 'S1000RR', 2023, 2400000, 'Флагманский супербайк от BMW с новейшими технологиями', 
   '{"engine": "999 cc", "power": "207 л.с.", "weight": "197 кг", "topSpeed": "299 км/ч"}', 
   'https://images.pexels.com/photos/5422527/pexels-photo-5422527.jpeg'),
  
  ('Suzuki', 'GSX-R1000R', 2023, 1850000, 'Легендарный спортбайк, совершенствуемый десятилетиями', 
   '{"engine": "999 cc", "power": "202 л.с.", "weight": "203 кг", "topSpeed": "299 км/ч"}', 
   'https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg'),
  
  ('Kawasaki', 'Ninja ZX-10R', 2023, 1950000, 'Чемпион WSBK, адаптированный для дорог общего пользования', 
   '{"engine": "998 cc", "power": "203 л.с.", "weight": "207 кг", "topSpeed": "299 км/ч"}', 
   'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'),
  
  ('Honda', 'CBR1000RR-R Fireblade SP', 2023, 2500000, 'Технологически продвинутый спортбайк с гоночными генами', 
   '{"engine": "999 cc", "power": "215 л.с.", "weight": "201 кг", "topSpeed": "299 км/ч"}', 
   'https://images.pexels.com/photos/595807/pexels-photo-595807.jpeg'),
  
  ('KTM', '1290 Super Duke R', 2023, 2100000, 'Нейкед с характером супербайка и запасом мощности', 
   '{"engine": "1301 cc", "power": "180 л.с.", "weight": "189 кг", "topSpeed": "285 км/ч"}', 
   'https://images.pexels.com/photos/2519375/pexels-photo-2519375.jpeg'),
  
  ('Aprilia', 'RSV4 Factory', 2023, 2750000, 'Итальянский спортбайк с уникальной V4 компоновкой двигателя', 
   '{"engine": "1099 cc", "power": "217 л.с.", "weight": "202 кг", "topSpeed": "299 км/ч"}', 
   'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg'),
  
  ('Honda', 'CBR600RR', 2023, 1500000, 'Компактный и маневренный спортбайк среднего класса', 
   '{"engine": "599 cc", "power": "120 л.с.", "weight": "187 кг", "topSpeed": "260 км/ч"}', 
   'https://images.pexels.com/photos/63249/pexels-photo-63249.jpeg'),
  
  ('Ducati', 'Monster', 2023, 1650000, 'Культовый нейкед от Ducati с новым двигателем', 
   '{"engine": "937 cc", "power": "111 л.с.", "weight": "166 кг", "topSpeed": "250 км/ч"}', 
   'https://images.pexels.com/photos/258092/pexels-photo-258092.jpeg');