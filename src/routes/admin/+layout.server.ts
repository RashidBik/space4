import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const session = cookies.get('sb-session');

  // اگر کاربر توکن نداشت و خواست وارد صفحات ادمین بشه، بفرستش صفحه لاگین
  if (!session && !url.pathname.endsWith('/admin/login')) {
    throw redirect(303, '/admin/login');
  }

  // اگر لاگین بود و خواست دوباره بره صفحه لاگین، بفرستش مستقیم داشبورد
  if (session && url.pathname.endsWith('/admin/login')) {
    throw redirect(303, '/admin');
  }

  return {};
};