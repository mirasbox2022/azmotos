/*
  # Fix Profiles Table RLS Policies

  1. Changes
    - Drop existing policies
    - Create new policies for profiles table that properly handle authentication
    
  2. Security
    - Enable RLS
    - Add policies for INSERT, SELECT, and UPDATE operations
    - Ensure users can only manage their own profiles
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Пользователи могут видеть только " ON profiles;
DROP POLICY IF EXISTS "Пользователи могут добавлять толь" ON profiles;
DROP POLICY IF EXISTS "Пользователи могут обновлять толь" ON profiles;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Enable insert for authenticated users only"
ON profiles FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on user_id"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);