const T = {
  ru: {
    label: 'Обо мне',
    title1: 'Дизайн —', title2: 'это мой язык',
    bio1: 'Я дизайнер с академическим бэкграундом: бакалавр по дизайну и студент магистратуры по тому же направлению. Моя работа — превращать сложные идеи в ясные, красивые и функциональные визуальные решения.',
    bio2: 'Специализируюсь на UI/UX, фирменном стиле и продуктовом дизайне. Люблю системный подход: от исследования и архитектуры информации до финального пиксель-перфект экрана.',
    bio3: 'Владею полным Adobe CC, Figma, и использую код как инструмент для прототипирования и воплощения дизайна в жизнь.',
    card1t: 'Продуктовый дизайн', card1d: 'Выстраиваю UX с нуля: исследование, вайрфреймы, прототипы, дизайн-система.',
    card2t: 'Визуальная идентика', card2d: 'Логотипы, брендбуки, гайдлайны — создаю целостные бренд-системы.',
    card3t: 'UI-системы', card3d: 'Масштабируемые компонентные библиотеки в Figma с Auto Layout и Variables.',
    card4t: 'Медиапроизводство', card4d: 'Ретушь, фотомонтаж, иллюстрации в Adobe Photoshop и Illustrator.',
  },
  en: {
    label: 'About me',
    title1: 'Design is', title2: 'my language',
    bio1: 'I\'m a designer with an academic background: a Bachelor\'s in Design and currently completing a Master\'s degree in the same field. My work is turning complex ideas into clear, beautiful, and functional visual solutions.',
    bio2: 'I specialise in UI/UX, brand identity, and product design. I love a systematic approach: from research and information architecture to the final pixel-perfect screen.',
    bio3: 'I work across the full Adobe CC suite, Figma, and use code as a tool for prototyping and bringing designs to life — not as my primary discipline.',
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
    <section id="about" className="page-section" style={{ padding: '8rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
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
