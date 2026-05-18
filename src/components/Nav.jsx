import { useEffect, useRef, useState } from 'react';

const LINKS = {
  ru: [
    { href: '#about',    label: 'Обо мне' },
    { href: '#stack',    label: 'Навыки' },
    { href: '#projects', label: 'Работы' },
    { href: '#resume',   label: 'Резюме' },
    { href: '#contact',  label: 'Контакты' },
  ],
  en: [
    { href: '#about',    label: 'About' },
    { href: '#stack',    label: 'Skills' },
    { href: '#projects', label: 'Works' },
    { href: '#resume',   label: 'Resume' },
    { href: '#contact',  label: 'Contact' },
  ],
};

export default function Nav({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const scrolledRef = useRef(false);
  const heroVisibleRef = useRef(true);
  const links = LINKS[lang];

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const nextScrolled = scrolledRef.current ? window.scrollY > 40 : window.scrollY > 96;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const requestUpdate = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return undefined;

    const syncHeroVisible = (nextHeroVisible) => {
      if (nextHeroVisible !== heroVisibleRef.current) {
        heroVisibleRef.current = nextHeroVisible;
        setHeroVisible(nextHeroVisible);
      }
    };

    if (!('IntersectionObserver' in window)) {
      let rafId = 0;

      const update = () => {
        rafId = 0;
        const rect = hero.getBoundingClientRect();
        syncHeroVisible(rect.bottom > 0 && rect.top < window.innerHeight);
      };

      const requestUpdate = () => {
        if (!rafId) rafId = window.requestAnimationFrame(update);
      };

      requestUpdate();
      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate);

      return () => {
        window.removeEventListener('scroll', requestUpdate);
        window.removeEventListener('resize', requestUpdate);
        if (rafId) window.cancelAnimationFrame(rafId);
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      syncHeroVisible(entry.isIntersecting);
    });

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}>
      <a href="#hero" className={`nav-logo${heroVisible ? ' nav-logo--hero-visible' : ''}`}>
        dmbzzr<span>.</span>
      </a>

      <div className="nav-links">
        {links.map(l => (
          <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
        ))}
      </div>

      <div className="nav-actions">
        <button
          type="button"
          aria-label={lang === 'ru' ? 'Switch language to English' : 'Переключить язык на русский'}
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className="nav-lang-toggle"
        >
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>

        <a href="https://github.com/AREKKUZZERA" target="_blank" rel="noreferrer"
          className="btn-ghost nav-github-link"
          data-mobile-hide="true"
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}
