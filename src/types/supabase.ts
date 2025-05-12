export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      motorcycles: {
        Row: {
          id: string
          brand: string
          model: string
          year: number
          price: number
          description: string | null
          specs: Json | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          brand: string
          model: string
          year: number
          price: number
          description?: string | null
          specs?: Json | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          brand?: string
          model?: string
          year?: number
          price?: number
          description?: string | null
          specs?: Json | null
          image_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Motorcycle = Database['public']['Tables']['motorcycles']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']