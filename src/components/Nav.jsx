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
      {/* Logo */}
      <a href="#hero" className={`nav-logo${heroVisible ? ' nav-logo--hero-visible' : ''}`} style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.15rem',
        color: 'var(--txt)',
        letterSpacing: '-0.01em',
      }}>
        dmbzzr<span style={{ color: 'var(--acc)' }}>.</span>
      </a>

      {/* Links */}
      <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem', letterSpacing: '0.08em',
            color: 'var(--mut)',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--txt)'}
          onMouseLeave={e => e.target.style.color = 'var(--mut)'}
          >{l.label}</a>
        ))}
      </div>

      {/* Right side */}
      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Lang toggle */}
        <button
          type="button"
          aria-label={lang === 'ru' ? 'Switch language to English' : 'Переключить язык на русский'}
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          letterSpacing: '0.12em',
          background: 'var(--b1)',
          border: '1px solid var(--b2)',
          color: 'var(--txt2)',
          padding: '0.35rem 0.75rem',
          borderRadius: '5px',
          transition: 'all 0.2s',
          }}
        onMouseEnter={e => { e.target.style.borderColor = 'var(--acc)'; e.target.style.color = 'var(--acc)'; }}
        onMouseLeave={e => { e.target.style.borderColor = 'var(--b2)'; e.target.style.color = 'var(--txt2)'; }}
        >
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>

        <a href="https://github.com/AREKKUZZERA" target="_blank" rel="noreferrer"
          className="btn-ghost"
          data-mobile-hide="true"
          style={{ padding: '0.35rem 0.9rem', fontSize: '0.7rem' }}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}
