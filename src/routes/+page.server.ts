import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // دریافت پروژه‌ها به همراه آخرین آپدیت‌هایشان
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      updates (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return { projects: [] };
  }

  return { projects };
};