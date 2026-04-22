import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = LINKS[lang];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '1rem 2.5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(24,24,24,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--b1)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <a href="#" style={{
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Lang toggle */}
        <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} style={{
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
          style={{ padding: '0.35rem 0.9rem', fontSize: '0.7rem' }}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}
