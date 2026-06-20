import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';

// این بخش لیست پروژه‌ها را برای منوی کشویی فرم آپدیت می‌آورد
export const load: PageServerLoad = async () => {
  const { data: projects } = await supabase
    .from('projects')
    .select('id, title_fa, title_en');
  
  return { projects: projects || [] };
};

export const actions: Actions = {
  // اکشن قبلی برای ساخت پروژه
  createProject: async ({ request }) => {
    const formData = await request.formData();
    const title_en = formData.get('title_en') as string;
    const title_fa = formData.get('title_fa') as string;
    const description_en = formData.get('description_en') as string;
    const description_fa = formData.get('description_fa') as string;
    const github_link = formData.get('github_link') as string;
    const demo_link = formData.get('demo_link') as string;
    const technologies = (formData.get('technologies') as string).split(',').map(t => t.trim()).filter(Boolean);
const imageFile = formData.get('project_image') as File;
    let image_url = '';

    // اگر کاربر عکسی انتخاب کرده بود، فرآیند آپلود شروع می‌شود
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      // ساخت یک نام یکتا برای فایل جهت جلوگیری از تداخل
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      // آپلود فایل در باکت Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        return fail(500, { message: 'خطا در آپلود تصویر پروژه.' });
      }

      // دریافت URL عمومی فایل آپلود شده
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);
        
      image_url = urlData.publicUrl;
    }

    // ثبت پروژه همراه با لینک عکس در دیتابیس
    const { error } = await supabase.from('projects').insert([{
      title_en, title_fa, description_en, description_fa, github_link, demo_link, technologies, image_url
    }]);

    if (error) return fail(505, { message: 'خطا در ثبت پروژه.' });
    return { success: true, action: 'project' };
  },

  // اکشن جدید برای ثبت آپدیت و نسخه جدید نرم‌افزار
  createUpdate: async ({ request }) => {
    const formData = await request.formData();
    const project_id = formData.get('project_id') as string;
    const version = formData.get('version') as string;
    
    // تغییرات را با ویرگول جدا می‌کنند و ما تبدیل به آرایه می‌کنیم
    const changes_en = (formData.get('changes_en') as string).split(',').map(c => c.trim()).filter(Boolean);
    const changes_fa = (formData.get('changes_fa') as string).split(',').map(c => c.trim()).filter(Boolean);

    const { error } = await supabase.from('updates').insert([{
      project_id, version, changes_en, changes_fa
    }]);

    if (error) return fail(500, { message: 'خطا در ثبت آپدیت جدید.' });
    return { success: true, action: 'update' };
  }
};