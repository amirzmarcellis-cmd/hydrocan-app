import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import type { Database } from './database.types';

// Env vars are read at JS-bundle build time. If they're missing we degrade
// to a safe placeholder client so the UI still boots — every Supabase call
// will fail at runtime, but no screen crashes on startup.
const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? PLACEHOLDER_URL;
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? PLACEHOLDER_KEY;

export const isSupabaseConfigured =
  url !== PLACEHOLDER_URL && anon !== PLACEHOLDER_KEY && !!url && !!anon;

if (!isSupabaseConfigured && __DEV__) {
  console.warn(
    '[hydrocan] Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY.\n' +
      'Copy .env.example to .env.local in the project root and restart with `npx expo start --clear`.\n' +
      'The app will boot in mock-data mode until env vars are available.',
  );
}

const SecureStoreAdapter = {
  getItem: (k: string) => SecureStore.getItemAsync(k),
  setItem: (k: string, v: string) => SecureStore.setItemAsync(k, v),
  removeItem: (k: string) => SecureStore.deleteItemAsync(k),
};

export const supabase = createClient<Database>(url, anon, {
  auth: {
    storage: Platform.OS === 'web' ? undefined : SecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type SupabaseClient = typeof supabase;
