import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  const isConfigured = Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    typeof supabaseUrl === 'string' &&
    typeof supabaseAnonKey === 'string' &&
    supabaseUrl.trim().length > 0 &&
    supabaseAnonKey.trim().length > 0
  );

  return isConfigured;
};

let clientInstance: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    clientInstance = createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    if (import.meta.env.DEV) {
      console.log('[DIAGNOSTIC] SUPABASE_CONFIGURED: true');
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[DIAGNOSTIC] SUPABASE_INIT_ERROR');
    }
    clientInstance = null;
  }
} else {
  if (import.meta.env.DEV) {
    console.log('[DIAGNOSTIC] SUPABASE_CONFIGURED: false');
  }
}

export const supabase = clientInstance;

export function getSupabase(): SupabaseClient | null {
  return supabase;
}

