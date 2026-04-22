import { useRef, useState } from 'react';
import { useSeamlessMarquee } from '../hooks/useSeamlessMarquee';
import { getGridParallaxStyle } from '../lib/parallax';
import { getHeroAmbientBlobStyle, getHeroBackgroundTextureStyle } from '../lib/heroBackground';
import {
  getMarqueeItemStyle,
  getMarqueeTrackStyle,
  getMarqueeViewportStyle,
  MARQUEE_ITEMS,
} from '../lib/marquee';

const T = {
  ru: {
    badge: 'Открыт к сотрудничеству',
    role1: 'Графический',
    role2: 'дизайнер',
    role3: 'интерфейсов & визуальных систем',
    desc: 'Создаю продуманные цифровые продукты — от UX-концепции до пиксельно-точного финала. Figma, Adobe CC, фирменный стиль, UI-системы.',
    cta1: 'Смотреть работы',
    cta2: 'Связаться',
    s1v: '6+', s1l: 'Лет в дизайне',
    s2v: '20+', s2l: 'Проектов',
    s3v: 'BA+MA', s3l: 'Образование',
  },
  en: {
    badge: 'Available for work',
    role1: 'Graphic',
    role2: 'Designer',
    role3: 'interfaces & visual systems',
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
  const marqueeViewportRef = useRef(null);
  const marqueeBaseRef = useRef(null);
  const [hoveredMarqueeIndex, setHoveredMarqueeIndex] = useState(null);
  const { baseWidth, renderedCopies } = useSeamlessMarquee(
    marqueeViewportRef,
    marqueeBaseRef,
    MARQUEE_ITEMS,
  );

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', padding: '0 2.5rem',
    }}>
      {/* Subtle grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(var(--b1) 1px, transparent 1px), linear-gradient(90deg, var(--b1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        opacity: 0.72,
        ...getGridParallaxStyle({ x: 10, y: 8 }),
      }} />

      <div style={getHeroBackgroundTextureStyle()} />

      <div style={getHeroAmbientBlobStyle('right')} />
      <div style={getHeroAmbientBlobStyle('left')} />

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
              <a href="#contact" className="btn-ghost">{t.cta2}</a>
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
        <div ref={marqueeViewportRef} style={getMarqueeViewportStyle()}>
          <div
            style={getMarqueeTrackStyle(baseWidth)}
            onMouseLeave={() => setHoveredMarqueeIndex(null)}
          >
            {renderedCopies.map((copyIndex) => (
              <div
                key={copyIndex}
                ref={copyIndex === 0 ? marqueeBaseRef : undefined}
                style={{ display: 'flex', alignItems: 'center', flex: 'none' }}
              >
                {MARQUEE_ITEMS.map((item, itemIndex) => {
                  const itemKey = `${copyIndex}-${itemIndex}`;
                  const isAccent = itemIndex % MARQUEE_ITEMS.length === 0;
                  const isHovered = hoveredMarqueeIndex === itemKey;

                  return (
                    <span
                      key={itemKey}
                      onMouseEnter={() => setHoveredMarqueeIndex(itemKey)}
                      style={getMarqueeItemStyle({ isAccent, isHovered })}
                    >
                      {item}{itemIndex % 3 === 0 ? ' ✦' : ' ·'}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
