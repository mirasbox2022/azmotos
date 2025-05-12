import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Создаем URL и ключ на основе переменных окружения или используем заглушки для разработки
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Создаем и экспортируем клиент Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);