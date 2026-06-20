<script lang="ts">
  import { t } from '$lib/i18nStore';
  import { onMount } from 'svelte';
  import { animate, inView } from 'motion';

  let titleRef: HTMLHeadingElement;
  let subtitleRef: HTMLParagraphElement;
  let ctaRef: HTMLDivElement;

  onMount(() => {
    // انیمیشن ورود عنوان اصلی (Fade in و حرکت ملایم به بالا)
    animate(titleRef, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, ease: "easeOut" });
    
    // انیمیشن زیرعنوان با کمی تاخیر
    animate(subtitleRef, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.2, ease: "easeOut" });
    
    // انیمیشن دکمه‌ها
    animate(ctaRef, { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.5, delay: 0.4 });
  });
</script>

<section class="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
  <!-- افکت نوری کهکشانی در پس‌زمینه -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
  <div class="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

  <!-- عنوان اصلی با گرادینت فضایی -->
  <h1 
    bind:this={titleRef}
    class="text-5xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none opacity-0"
  >
    {$t.heroTitle}
  </h1>

  <!-- توضیحات زیر عنوان -->
  <p 
    bind:this={subtitleRef}
    class="mt-6 text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed opacity-0"
  >
    {$t.heroSubtitle}
  </p>

  <!-- دکمه‌های فراخوانی (CTA) -->
  <div bind:this={ctaRef} class="mt-10 flex flex-wrap gap-4 justify-center opacity-0">
    <a 
      href="#projects" 
      class="px-8 py-4 bg-indigo-650 hover:bg-indigo-600 border border-indigo-500/30 text-white font-medium rounded-full shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
    >
      {$t.projects}
    </a>
    <a 
      href="#about" 
      class="px-8 py-4 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5 backdrop-blur-sm"
    >
      {$t.about}
    </a>
  </div>
</section>