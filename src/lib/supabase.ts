import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public'; // تغییر از static به dynamic

// استفاده از شیء env برای خواندن پویا
const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ هشدارهای امنیتی: کلیدهای Supabase هنوز لود نشده‌اند.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);