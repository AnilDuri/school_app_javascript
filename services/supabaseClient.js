import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import 'react-native-url-polyfill/auto'

const supabaseUrl = "https://jirazaztbxoqxrpjjrou.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppcmF6YXp0YnhvcXhycGpqcm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NDk0MzUsImV4cCI6MTk5MjIyNTQzNX0.0-9AdUDdguSIycPepvG0RwDu5sI4gZz4s2_pYUNm6qI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
