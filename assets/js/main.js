
// Mobile menu
const navbar = document.querySelector('.navbar');
const toggle = document.querySelector('.menu-toggle');
if (toggle){ toggle.addEventListener('click', ()=> navbar.classList.toggle('open')); }

// Fade-in on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.15});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// Load basic config for dynamic bits (optional)
fetch('/site.config.json').then(r => r.ok ? r.json() : null).then(cfg => {
  if(!cfg) return;
  // Apply accent color dynamically if present
  if (cfg.accentColor) document.documentElement.style.setProperty('--brand-accent', cfg.accentColor);
  if (cfg.secondaryColor) document.documentElement.style.setProperty('--brand-surface', cfg.secondaryColor);
  if (cfg.analytics && cfg.analytics.gtmId){
    // Add GTM if set (noscript not included in this quick starter)
    const s = document.createElement('script');
    s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${cfg.analytics.gtmId}');`;
    document.head.appendChild(s);
  }
}).catch(()=>{});
