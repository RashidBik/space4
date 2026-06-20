<script lang="ts">
  import '../app.css'; // وارد کردن استایل تایلویند نسخه ۴
  import { locale } from '$lib/i18nStore';
</script>

<div dir={$locale === 'fa' ? 'rtl' : 'ltr'} lang={$locale} class="min-h-screen bg-slate-950 text-slate-50 font-sans transition-colors duration-300">
  <slot />
</div>