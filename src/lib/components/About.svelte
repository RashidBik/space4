<script lang="ts">
  import { t } from '$lib/i18nStore';
  
  // لیست مهارت‌های مهم و بازارپسند شما
  const skillList = [
    { name: 'SvelteKit / Vue / React', dynamic: '95%', color: 'from-orange-500 to-red-500' },
    { name: 'Android SDK / Kotlin', dynamic: '90%', color: 'from-green-400 to-emerald-600' },
    { name: 'Node.js / Databases (Postgres/Supabase)', dynamic: '88%', color: 'from-blue-500 to-indigo-650' },
    { name: 'UI/UX & Clean Architecture', dynamic: '85%', color: 'from-purple-500 to-pink-500' }
  ];
</script>

<section id="about" class="py-24 border-t border-slate-900/60 relative">
  <div class="absolute right-10 bottom-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

  <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
    <h2 class="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-100 via-indigo-200 to-slate-400 bg-clip-text text-transparent">
      {$t.about}
    </h2>
    <p class="text-slate-400 font-light text-base md:text-lg">
      {$t.aboutSubtitle}
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    
    <div class="group relative bg-slate-900/20 border border-slate-900 rounded-3xl p-8 hover:border-indigo-500/40 transition-all duration-500 backdrop-blur-sm flex flex-col justify-between">
      <div class="absolute -inset-px bg-gradient-to-b from-indigo-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
      <div>
        <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 font-bold mb-6">&lt;/&gt;</div>
        <h3 class="text-xl font-bold text-slate-100">{$t.brother1Name}</h3>
        <p class="text-xs text-indigo-400 font-mono mt-1 font-semibold">{$t.brother1Role}</p>
        <p class="mt-4 text-sm text-slate-450 font-light leading-relaxed">{$t.brother1Desc}</p>
      </div>
    </div>

    <div class="group relative bg-slate-900/20 border border-slate-900 rounded-3xl p-8 hover:border-purple-500/40 transition-all duration-500 backdrop-blur-sm flex flex-col justify-between">
      <div class="absolute -inset-px bg-gradient-to-b from-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
      <div>
        <div class="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 font-bold mb-6">📱</div>
        <h3 class="text-xl font-bold text-slate-100">{$t.brother2Name}</h3>
        <p class="text-xs text-purple-400 font-mono mt-1 font-semibold">{$t.brother2Role}</p>
        <p class="mt-4 text-sm text-slate-450 font-light leading-relaxed">{$t.brother2Desc}</p>
      </div>
    </div>

  </div>

  <div class="max-w-3xl mx-auto mt-24 space-y-8 bg-slate-900/10 border border-slate-900/50 p-8 rounded-3xl backdrop-blur-xs">
    <div class="text-center md:text-right space-y-1 mb-8">
      <h3 class="text-xl font-bold text-slate-200">{$t.marketSkills}</h3>
      <p class="text-xs text-slate-450 font-light">{$t.marketSkillsDesc}</p>
    </div>

    <div class="space-y-5">
      {#each skillList as skill}
        <div class="space-y-2">
          <div class="flex justify-between text-xs font-semibold tracking-wide text-slate-300 px-1">
            <span>{skill.name}</span>
            <span class="font-mono text-indigo-400">{skill.dynamic}</span>
          </div>
          <div class="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
            <div class="h-full bg-gradient-to-r {skill.color} rounded-full" style="width: {skill.dynamic}"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>