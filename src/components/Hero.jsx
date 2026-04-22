import { useEffect, useRef } from 'react';

const T = {
  ru: {
    badge: 'Открыт к сотрудничеству',
    role1: 'Дизайнер',
    role2: 'интерфейсов',
    role3: '& визуальных систем',
    desc: 'Создаю продуманные цифровые продукты — от UX-концепции до пиксельно-точного финала. Figma, Adobe CC, фирменный стиль, UI-системы.',
    cta1: 'Смотреть работы',
    cta2: 'Связаться',
    s1v: '4+', s1l: 'Лет в дизайне',
    s2v: '20+', s2l: 'Проектов',
    s3v: 'BA+MA', s3l: 'Образование',
  },
  en: {
    badge: 'Available for work',
    role1: 'Interface',
    role2: 'Designer',
    role3: '& Visual Systems',
    desc: 'Creating thoughtful digital products — from UX concept to pixel-perfect delivery. Figma, Adobe CC, brand identity, UI systems.',
    cta1: 'View works',
    cta2: 'Contact',
    s1v: '6+', s1l: 'Years in design',
    s2v: '20+', s2l: 'Projects',
    s3v: 'BA+MA', s3l: 'Education',
  },
};

export default function Hero({ lang }) {
  const t = T[lang];
  const noiseRef = useRef(null);

  // subtle noise on hero bg
  useEffect(() => {
    const canvas = noiseRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const img = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 18;
      img.data[i] = img.data[i+1] = img.data[i+2] = v;
      img.data[i+3] = 28;
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', padding: '0 2.5rem',
    }}>
      {/* Noise texture */}
      <canvas ref={noiseRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.6,
      }} />

      {/* Subtle grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(var(--b1) 1px, transparent 1px), linear-gradient(90deg, var(--b1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Accent blobs */}
      <div style={{
        position: 'absolute', top: '8%', right: '6%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242,57,135,0.07) 0%, transparent 65%)',
        filter: 'blur(60px)', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,230,118,0.05) 0%, transparent 65%)',
        filter: 'blur(60px)', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100, margin: '0 auto', paddingTop: '5rem' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.3rem 0.9rem',
          background: 'var(--grn-d)',
          border: '1px solid rgba(0,230,118,0.2)',
          borderRadius: '100px', marginBottom: '2.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.18em', color: 'var(--grn)',
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--grn)', boxShadow: '0 0 6px var(--grn)',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          {t.badge}
        </div>

        {/* Headline */}
        <h1 style={{ marginBottom: '1.5rem' }}>
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 400, lineHeight: 0.92,
            letterSpacing: '-0.02em', color: 'var(--txt)',
          }}>{t.role1}</span>
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 400, lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: 'var(--acc)',
          }}>{t.role2}</span>
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            fontWeight: 400, lineHeight: 2,
            letterSpacing: '0.04em', color: 'var(--txt2)',
          }}>{t.role3}</span>
        </h1>

        {/* Desc + CTA */}
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 460 }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.95rem', lineHeight: 1.75,
              color: 'var(--txt2)', marginBottom: '2rem',
            }}>{t.desc}</p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary">{t.cta1} →</a>
              <a href="#contact"  className="btn-ghost">{t.cta2}</a>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2.5rem', paddingBottom: '0.2rem' }}>
            {[
              { v: t.s1v, l: t.s1l },
              { v: t.s2v, l: t.s2l },
              { v: t.s3v, l: t.s3l },
            ].map(s => (
              <div key={s.l}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem', fontWeight: 400,
                  color: 'var(--txt)', lineHeight: 1,
                }}>{s.v}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem', letterSpacing: '0.1em',
                  color: 'var(--mut)', marginTop: '0.35rem',
                  textTransform: 'uppercase',
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom marquee strip */}
        <div style={{
          marginTop: '6rem',
          borderTop: '1px solid var(--b1)',
          paddingTop: '1.2rem',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', gap: '3rem', whiteSpace: 'nowrap',
            animation: 'marquee 18s linear infinite',
          }}>
            {Array(3).fill(['Figma','Adobe Photoshop','Illustrator','UI Design','UX Research','Brand Identity','Typography','Motion Design','Figma','Adobe Photoshop','Illustrator','UI Design','UX Research','Brand Identity','Typography','Motion Design']).flat().map((item, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem', letterSpacing: '0.18em',
                color: i % 8 === 0 ? 'var(--acc)' : 'var(--mut)',
                textTransform: 'uppercase',
              }}>
                {item}{i % 8 === 0 ? ' ✦' : ' ·'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
