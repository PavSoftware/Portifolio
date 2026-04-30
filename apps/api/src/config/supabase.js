import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY (inicio):", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20));
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key is missing. Storage uploads will fail.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
