<script lang="ts">
  import { enhance } from '$app/forms';
  
  // دسترسی به ارورها یا پیام‌های برگشتی از سرور در Svelte 5
  let { form } = $props();
  let loading = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
  <div class="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] top-1/4 left-1/4"></div>

  <div class="w-full max-w-md bg-slate-900/50 border border-slate-850 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
    <h1 class="text-3xl font-black text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
      SPACE4 ADMIN
    </h1>
    <p class="text-center text-sm text-slate-400 mt-2 font-light">ورود به پنل مدیریت آژانس</p>

    <form method="POST" action="?/login" use:enhance={() => {
      loading = true;
      return async ({ update }) => {
        loading = false;
        await update();
      };
    }} class="mt-8 space-y-6" dir="rtl">
      
      {#if form?.message}
        <div class="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-2xl text-center font-light">
          {form.message}
        </div>
      {/if}

      <div class="space-y-2">
        <label for="email" class="text-xs font-semibold tracking-wider text-slate-400 uppercase mr-1">ایمیل ادمین</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          required
          class="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-indigo-500 transition duration-300 text-left dir-ltr"
          placeholder="admin@space4.com"
        />
      </div>

      <div class="space-y-2">
        <label for="password" class="text-xs font-semibold tracking-wider text-slate-400 uppercase mr-1">رمز عبور</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          required
          class="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-indigo-500 transition duration-300 text-left dir-ltr"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition duration-300 cursor-pointer"
      >
        {loading ? 'در حال بررسی...' : 'ورود به حساب'}
      </button>
    </form>
  </div>
</div>