import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { Actions } from './$types';

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return fail(400, { message: 'لطفاً ایمیل و رمز عبور را وارد کنید.' });
    }

    // ورود به Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return fail(400, { message: 'ایمیل یا رمز عبور اشتباه است.' });
    }

    // ذخیره توکن در کوکی برای ماندگاری لاگین (به مدت ۱ روز)
    if (data.session) {
      cookies.set('sb-session', data.session.access_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24
      });
    }

    // هدایت به داشبورد ادمین بعد از موفقیت
    throw redirect(303, '/admin');
  }
};