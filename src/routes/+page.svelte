<script lang="ts">
  import { t, locale } from '$lib/i18nStore';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import SpaceBackground3D from '$lib/components/SpaceBackground3D.svelte';
  import Contact from '$lib/components/Contact.svelte'; // ۱. وارد کردن کامپوننت تماس
  
  let { data } = $props(); 
</script>

<svelte:head>
  <title>{$t.title}</title>
</svelte:head>

<header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-900">
  <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
    <div class="text-2xl font-black tracking-widest bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
      SPACE4
    </div>
    
    <button 
      class="px-5 py-2 rounded-full border border-slate-800 bg-slate-900/40 hover:border-indigo-500/50 transition-all duration-300 text-xs font-semibold uppercase tracking-wider text-slate-300 cursor-pointer"
      on:click={() => locale.update(l => l === 'en' ? 'fa' : 'en')}
    >
      {$locale === 'en' ? 'فارسی' : 'English'}
    </button>
  </div>
</header>

<main class="max-w-7xl mx-auto px-6">
  <Hero />
  <SpaceBackground3D />
  <section id="projects" class="py-20">
    <h2 class="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
      {$t.projects}
    </h2>

    {#if data.projects.length === 0}
      <p class="text-center text-slate-500 font-light">No projects released yet. Stay tuned!</p>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.projects as project}
          <div class="group relative bg-slate-900/40 border border-slate-900 rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-500 backdrop-blur-sm flex flex-col justify-between">
            <div class="absolute -inset-px bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-10 transition duration-500 pointer-events-none"></div>
            
            <div>
              {#if project.updates && project.updates.length > 0}
                {@const lastUpdate = project.updates.sort((a, b) => new Date(b.released_at).getTime() - new Date(a.released_at).getTime())[0]}
                <div class="mb-3 inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-xs font-mono font-bold animate-pulse">
                  <span class="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Latest: {lastUpdate.version}
                </div>
              {/if}
              {#if project.image_url}
  <div class="w-full h-48 rounded-2xl overflow-hidden mb-4 border border-slate-950/50">
    <img src={project.image_url} alt={project.title_en} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  </div>
{/if}

              <h3 class="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                {$locale === 'fa' ? project.title_fa : project.title_en}
              </h3>
              
              <p class="mt-3 text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                {$locale === 'fa' ? project.description_fa : project.description_en}
              </p>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              {#each project.technologies as tech}
                <span class="text-xs px-3 py-1 bg-slate-950 border border-slate-800 text-indigo-300 rounded-full">{tech}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <About />

  <Contact />
</main>

<footer class="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 font-light tracking-wide">
  <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div>{$t.footerRights}</div>
    <div class="flex gap-6 font-mono text-slate-400">
      <a href="https://github.com" target="_blank" class="hover:text-indigo-400 transition">GITHUB</a>
      <a href="#" class="hover:text-indigo-400 transition">LINKEDIN</a>
      <a href="#" class="hover:text-indigo-400 transition">TELEGRAM</a>
    </div>
  </div>
</footer>