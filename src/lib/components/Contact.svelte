<script lang="ts">
  import { t, locale } from '$lib/i18nStore';
  
  // شماره واتساپ خودت رو اینجا بدون صفر و با کد کشور وارد کن (مثلاً برای ایران 98)
  const WHATSAPP_NUMBER = "‌+93792435462"; 

  let name = $state('');
  let email = $state('');
  let message = $state('');

  function handleWhatsAppSubmit(event: Event) {
    event.preventDefault();
    
    // ساختن یک متن شیک و مرتب برای پیام واتساپ
    const fullText = `سلام Space4!\n\n👤 نام: ${name}\n📧 ایمیل: ${email}\n\n📝 پیام:\n${message}`;
    
    // انکود کردن متن برای قرارگیری در URL
    const encodedText = encodeURIComponent(fullText);
    
    // ساخت لینک رسمی واتساپ
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    
    // باز کردن واتساپ در یک تب جدید
    window.open(whatsappUrl, '_blank');
  }
</script>

<section id="contact" class="py-24 border-t border-slate-900/60 relative overflow-hidden">
  <!-- هاله نوری پس‌زمینه -->
  <div class="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

  <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
    <h2 class="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-100 via-purple-200 to-slate-400 bg-clip-text text-transparent">
      {$t.contact}
    </h2>
    <p class="text-slate-400 font-light text-base md:text-lg">
      {$t.contactSubtitle}
    </p>
  </div>

  <div class="max-w-2xl mx-auto bg-slate-900/10 border border-slate-900 p-8 md:p-10 rounded-3xl backdrop-blur-sm">
    <form on:submit={handleWhatsAppSubmit} class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-xs text-slate-400 font-medium px-1">{$t.nameLabel}</label>
          <input type="text" bind:value={name} required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-sm focus:outline-none focus:border-purple-500 transition" />
        </div>
        <div class="space-y-2">
          <label class="text-xs text-slate-400 font-medium px-1">{$t.emailLabel}</label>
          <input type="email" bind:value={email} required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-sm focus:outline-none focus:border-purple-500 transition text-left dir-ltr" />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs text-slate-400 font-medium px-1">{$t.messageLabel}</label>
        <textarea rows="5" bind:value={message} required class="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-sm focus:outline-none focus:border-purple-500 transition"></textarea>
      </div>

      <button 
        type="submit" 
        class="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-emerald-600/10 cursor-pointer flex items-center justify-center gap-2"
      >
        <!-- آیکون مینی‌مال چت -->
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        {$t.sendButton} (WhatsApp)
      </button>
    </form>
  </div>
</section>