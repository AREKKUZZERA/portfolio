import sakuraUrl from '../assets/webp/sakura.webp';
import ScrollParallaxImage from './ScrollParallaxImage';

const T = {
  ru: {
    label: 'Обо мне',
    title1: 'Дизайн —', title2: 'это мой язык',
    bio1: 'Я дизайнер, работающий на пересечении инженерного мышления, визуальной коммуникации и пользовательского опыта. Мой академический путь — от инженерии и технологии к магистратуре в области дизайна — помогает мне системно подходить к задачам и создавать дизайн, в котором сложные идеи становятся понятными, выразительными и удобными для пользователей.',
    bio2: 'Моя специализация — UI/UX, фирменная айдентика и продуктовый дизайн. В работе опираюсь на исследование, архитектуру информации, прототипирование и аккуратную визуальную проработку, чтобы результат был не только красивым, но и функциональным.',
    bio3: 'Владею полным Adobe CC, Figma, и использую код как инструмент для прототипирования и воплощения дизайна в жизнь.',
    card1t: 'Продуктовый дизайн', card1d: 'Выстраиваю UX с нуля: исследование, вайрфреймы, прототипы, дизайн-система.',
    card2t: 'Визуальная идентика', card2d: 'Логотипы, брендбуки, гайдлайны — создаю целостные бренд-системы.',
    card3t: 'UI-системы', card3d: 'Масштабируемые компонентные библиотеки в Figma с Auto Layout и Variables.',
    card4t: 'Медиапроизводство', card4d: 'Ретушь, фотомонтаж, иллюстрации в Adobe Photoshop и Illustrator.',
  },
  en: {
    label: 'About me',
    title1: 'Design is', title2: 'my language',
    bio1: 'I am a designer working at the intersection of engineering thinking, visual communication, and user experience. My academic path — from engineering and technology to a Master\'s degree in Design — helps me approach tasks systematically and create design where complex ideas become clear, expressive, and convenient for users.',
    bio2: 'My specialisation is UI/UX, brand identity, and product design. I rely on research, information architecture, prototyping, and careful visual refinement so the result is not only beautiful, but also functional.',
    bio3: 'I use the full Adobe CC suite, Figma, and code as a tool for prototyping and bringing design to life.',
    card1t: 'Product Design',   card1d: 'Building UX from scratch: research, wireframes, prototypes, design systems.',
    card2t: 'Brand Identity',   card2d: 'Logos, brand books, guidelines — creating cohesive brand systems.',
    card3t: 'UI Systems',       card3d: 'Scalable component libraries in Figma with Auto Layout and Variables.',
    card4t: 'Media Production', card4d: 'Retouching, photo compositing, illustrations in Adobe Photoshop & Illustrator.',
  },
};

const CARDS = (t) => [
  { icon: '◈', title: t.card1t, desc: t.card1d },
  { icon: '◉', title: t.card2t, desc: t.card2d },
  { icon: '▦', title: t.card3t, desc: t.card3d },
  { icon: '✦', title: t.card4t, desc: t.card4d },
];

export default function About({ lang }) {
  const t = T[lang];
  return (
    <section id="about" className="page-section" style={{ position: 'relative', isolation: 'isolate', padding: '8rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <ScrollParallaxImage
        src={sakuraUrl}
        className="sakura-parallax--about"
        speed={1}
        distance={220}
        xDistance={48}
        rotateDistance={8}
        rotate={7}
        flipX
      />
      <p className="section-label">{t.label}</p>
      <h2 className="section-title">
        {t.title1} <em>{t.title2}</em>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3.5rem', alignItems: 'start',
      }}>
        {/* Bio */}
        <div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--txt2)', marginBottom: '1.2rem' }}>{t.bio1}</p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--txt2)', marginBottom: '1.2rem' }}>{t.bio2}</p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--mut)' }}>{t.bio3}</p>
        </div>

        {/* Ability cards */}
        <div className="about-ability-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {CARDS(t).map(c => (
              <div key={c.title} className="card about-ability-card" style={{ padding: '1.4rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem', color: 'var(--acc)',
                marginBottom: '0.7rem', lineHeight: 1,
              }}>{c.icon}</div>
              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--txt)', marginBottom: '0.4rem',
              }}>{c.title}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem', lineHeight: 1.55,
                color: 'var(--mut)',
              }}>{c.desc}</div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
