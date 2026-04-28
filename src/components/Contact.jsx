import sakuraUrl from '../assets/webp/sakura.webp';
import ScrollParallaxImage from './ScrollParallaxImage';

const T = {
  ru: {
    label: 'Контакты',
    title1: 'Давайте', title2: 'создадим что-то',
    desc: 'Открыт к новым проектам, коллаборациям и интересным задачам. Пишите — отвечаю быстро.',
    tg: 'Написать в Telegram',
    gh: 'GitHub',
    built: 'Сделан на React + Vite. Деплой на Vercel.',
    rights: '© 2026 AREKKUZZERA',
  },
  en: {
    label: 'Contact',
    title1: "Let's", title2: 'create something',
    desc: "Open to new projects, collaborations, and interesting challenges. Write — I reply fast.",
    tg: 'Write on Telegram',
    gh: 'GitHub',
    built: 'Built with React + Vite. Deployed on Vercel.',
    rights: '© 2026 AREKKUZZERA',
  },
};

export default function Contact({ lang }) {
  const t = T[lang];
  return (
    <section id="contact" className="page-section contact-section" style={{ position: 'relative', isolation: 'isolate', padding: '8rem 2.5rem 6rem', maxWidth: 1100, margin: '0 auto' }}>
      <ScrollParallaxImage
        src={sakuraUrl}
        className="sakura-parallax--contact"
        speed={0.9}
        distance={190}
        xDistance={36}
        rotateDistance={7}
        rotate={-10}
        flipX
      />
      {/* Big CTA */}
      <div className="contact-cta-wrap" style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p className="section-label" style={{ justifyContent: 'center' }}>{t.label}</p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 400, lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--txt)', marginBottom: '1.5rem',
        }}>
          {t.title1}<br />
          <span style={{ fontStyle: 'italic', color: 'var(--acc)' }}>{t.title2}</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-ui)', fontSize: '0.95rem',
          lineHeight: 1.7, color: 'var(--txt2)',
          maxWidth: 420, margin: '0 auto 2.5rem',
        }}>{t.desc}</p>

        <div className="contact-action-row" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Telegram */}
          <a href="https://t.me/bvbvbvbvbvbvbvbvbvvbv" target="_blank" rel="noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '0.9rem 2.2rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.955l-2.968-.924c-.644-.204-.657-.644.136-.953l11.57-4.461c.537-.194 1.006.131.896.604z"/>
            </svg>
            {t.tg}
          </a>

          {/* GitHub */}
          <a href="https://github.com/AREKKUZZERA" target="_blank" rel="noreferrer" className="btn-ghost"
            style={{ fontSize: '0.82rem', padding: '0.9rem 2.2rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {t.gh} ↗
          </a>
        </div>
      </div>

      {/* Divider line decor */}
      <div className="contact-footer-row" style={{
        borderTop: '1px solid var(--b1)', paddingTop: '2.5rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--txt)' }}>
          dmbzzr<span style={{ color: 'var(--acc)' }}>.</span>
        </span>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>{t.built}</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>{t.rights}</p>
      </div>
    </section>
  );
}
