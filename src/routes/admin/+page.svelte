<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  let loadingProject = $state(false);
  let loadingUpdate = $state(false);
</script>

<div class="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-100" dir="rtl">
  <div class="max-w-5xl mx-auto space-y-12">
    
    <div class="flex justify-between items-center border-b border-slate-900 pb-6">
      <div>
        <h1 class="text-3xl font-black">داشبورد مدیریت Space4</h1>
        <p class="text-sm text-slate-400 mt-1 font-light">مدیریت هماهنگ پروژه‌ها و نسخه‌ها</p>
      </div>
      <a href="/" class="px-5 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs hover:bg-slate-800 transition">مشاهده فرانت‌اَند سایت</a>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <div class="bg-slate-900/20 border border-slate-900 p-6 md:p-8 rounded-3xl backdrop-blur-sm space-y-6">
        <h2 class="text-xl font-bold text-indigo-400">➕ افزودن پروژه جدید</h2>
        
        {#if form?.success && form?.action === 'project'}
          <div class="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl text-center">
            پروژه با موفقیت منتشر شد! 🎉
          </div>
        {/if}

        <form method="POST" action="?/createProject" use:enhance={() => { loadingProject = true; return async ({ update }) => { loadingProject = false; await update(); }; }} class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input type="text" name="title_en" placeholder="Project Name (EN)" required class="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left dir-ltr text-sm" />
            <input type="text" name="title_fa" placeholder="نام پروژه (FA)" required class="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-sm" />
          </div>
          <div class="space-y-1">
    <label class="text-xs text-slate-400 mr-1">تصویر یا کاور پروژه</label>
    <input type="file" name="project_image" accept="image/*" class="w-full p-3 bg-slate-950 border border-slate-850 rounded-2xl text-sm file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white file:cursor-pointer" />
  </div>
          <textarea name="description_en" placeholder="Description (EN)" rows="2" required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left dir-ltr text-sm"></textarea>
          <textarea name="description_fa" placeholder="توضیحات پروژه (FA)" rows="2" required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-sm"></textarea>
          <input type="text" name="technologies" placeholder="تکنولوژی‌ها (Svelte, Kotlin, ...)" required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left dir-ltr text-sm" />
          <div class="grid grid-cols-2 gap-4">
            <input type="url" name="github_link" placeholder="GitHub URL" class="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left dir-ltr text-sm" />
            <input type="url" name="demo_link" placeholder="Live Demo URL" class="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left dir-ltr text-sm" />
          </div>
          <button type="submit" disabled={loadingProject} class="w-full py-4 bg-indigo-650 hover:bg-indigo-600 border border-indigo-500/30 text-white font-bold rounded-2xl text-sm cursor-pointer transition">
            {loadingProject ? 'در حال ثبت...' : 'انتشار پروژه'}
          </button>
        </form>
      </div>

      <div class="bg-slate-900/20 border border-slate-900 p-6 md:p-8 rounded-3xl backdrop-blur-sm space-y-6">
        <h2 class="text-xl font-bold text-purple-400">🚀 رلیز نسخه جدید (Update)</h2>

        {#if form?.success && form?.action === 'update'}
          <div class="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl text-center">
            آپدیت جدید برای برنامه با موفقیت ثبت شد! 🚀
          </div>
        {/if}

        <form method="POST" action="?/createUpdate" use:enhance={() => { loadingUpdate = true; return async ({ update }) => { loadingUpdate = false; await update(); }; }} class="space-y-4">
          
          <div class="space-y-1">
            <label class="text-xs text-slate-400 mr-1">انتخاب پروژه</label>
            <select name="project_id" required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-slate-300 text-sm focus:outline-none">
              <option value="">-- پروژه مورد نظر را انتخاب کنید --</option>
              {#each data.projects as proj}
                <option value={proj.id}>{proj.title_fa} ({proj.title_en})</option>
              {/each}
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-xs text-slate-400 mr-1">شماره نسخه</label>
            <input type="text" name="version" placeholder="e.g. v1.0.4 یا v2.0.0" required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left dir-ltr text-sm" />
          </div>

          <div class="space-y-1">
            <label class="text-xs text-slate-400 mr-1">تغییرات اعمال شده (EN - با کاما جدا کنید)</label>
            <textarea name="changes_en" placeholder="Added dark mode, Fixed UI bugs, Improved speed" rows="2" required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left dir-ltr text-sm"></textarea>
          </div>

          <div class="space-y-1">
            <label class="text-xs text-slate-400 mr-1">تغییرات اعمال شده (FA - با کاما جدا کنید)</label>
            <textarea name="changes_fa" placeholder="افزودن حالت تاریک, رفع باگ‌های واکشی داده، بهبود سرعت اپ" rows="2" required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-sm"></textarea>
          </div>

          <button type="submit" disabled={loadingUpdate} class="w-full py-4 bg-purple-650 hover:bg-purple-600 border border-purple-500/30 text-white font-bold rounded-2xl text-sm cursor-pointer transition">
            {loadingUpdate ? 'در حال ثبت نسخه...' : 'انتشار نسخه جدید'}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>