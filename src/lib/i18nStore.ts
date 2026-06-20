import { writable } from 'svelte/store';
import { translations } from './translations';

// تعریف زبان پیش‌فرض
export const locale = writable<'en' | 'fa'>('en');

// تعریف استور اصلی برای متن‌ها
export const t = writable(translations['en']);

// هماهنگ‌سازی خودکار متن‌ها با تغییر زبان
locale.subscribe((lang) => {
  t.set(translations[lang]);
});