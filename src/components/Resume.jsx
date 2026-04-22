const T = {
  ru: {
    label: 'Резюме',
    title1: 'Опыт &', title2: 'образование',
    tlLabel: 'Путь',
    abLabel: 'Компетенции',
    timeline: [
      {
        year: '2025 — наст.',
        title: 'Дизайнер-фрилансер',
        place: 'Самозанятый',
        desc: 'Разработка UI/UX для продуктовых компаний и агентств. Фирменный стиль, дизайн-системы, веб-интерфейсы. Портфолио включает более 20 завершённых проектов.',
      },
      {
        year: '2024 — наст.',
        title: 'Магистратура по дизайну',
        place: 'Университет: РТУ МИРЭА',
        desc: 'Углублённое изучение теории дизайна, исследовательских методологий и дизайн-менеджмента. Фокус на системном проектировании цифровых продуктов.',
      },
      {
        year: '2023',
        title: 'Бакалавриат по дизайну',
        place: 'Университет: РТУ МИРЭА',
        desc: 'Получил степень бакалавра в области дизайна. Моя дипломная работа была посвящена комплексной разработке рабочего пространства — современного компьютерного стола и его модульной системы для повседневного использования, с акцентом на исследование эргономики, адаптивности и эффективности организации рабочей среды.',
      },
      {
        year: '2021 — 2023',
        title: 'Первые шаги',
        place: 'Подработка',
        desc: 'Работа с ИП: создание логотипов, упаковки, рекламных материалов. Первые UX-проекты — редизайн листовок, меню, а также баннеров.',
      },
      {
        year: '2018',
        title: 'Начало пути',
        place: 'Самообучение',
        desc: 'Первые шаги в дизайне: Photoshop, Illustrator, основы типографики и колористики. Тогда это было для меня как хобби.',
      },
    ],
    abilities: [
      { icon: '◈', title: 'UX-исследования',      desc: 'User interviews, usability testing, CJM, personas' },
      { icon: '◉', title: 'Системный подход',       desc: 'Design systems, tokens, компонентные библиотеки' },
      { icon: '▦', title: 'Типографика',            desc: 'Шрифтовые пары, иерархия, выравнивание, ритм' },
      { icon: '✦', title: 'Колористика',            desc: 'Теория цвета, брендовые палитры, доступность' },
      { icon: '◐', title: 'Прототипирование',       desc: 'Hi-fi прототипы в Figma, интерактивные компоненты' },
      { icon: '⊞', title: 'Адаптивный дизайн',      desc: 'Mobile-first, responsive-сетки, multi-platform' },
    ],
  },
  en: {
    label: 'Resume',
    title1: 'Experience &', title2: 'education',
    tlLabel: 'Journey',
    abLabel: 'Competencies',
    timeline: [
      {
        year: '2025 — now',
        title: 'Freelance Designer',
        place: 'Self-employed',
        desc: 'Developing UI/UX for product companies and agencies. Brand identity, design systems, web interfaces. Portfolio includes 20+ completed projects.',
      },
      {
        year: '2024 — now',
        title: "Master's in Design",
        place: 'University',
        desc: "Advanced study of design theory, research methodologies, and design management. Focus on systematic digital product design.",
      },
      {
        year: '2023',
        title: "Bachelor's in Design",
        place: 'University — Honours Degree',
        desc: "Obtained a Bachelor's degree in Design. Thesis project: comprehensive brand identity and digital platform development for a cultural institution.",
      },
      {
        year: '2021 — 2023',
        title: 'Graphic Designer',
        place: 'Agency / Studio',
        desc: 'Working with brands: logos, packaging, advertising materials. First UX projects — website and mobile app redesigns.',
      },
      {
        year: '2018',
        title: 'The beginning',
        place: 'Self-taught',
        desc: 'First steps in design: Photoshop, Illustrator, fundamentals of typography and colour. Realised design is a profession, not just a hobby.',
      },
    ],
    abilities: [
      { icon: '◈', title: 'UX Research',         desc: 'User interviews, usability testing, CJM, personas' },
      { icon: '◉', title: 'Systems Thinking',     desc: 'Design systems, tokens, component libraries' },
      { icon: '▦', title: 'Typography',           desc: 'Font pairing, hierarchy, alignment, rhythm' },
      { icon: '✦', title: 'Colour Theory',        desc: 'Brand palettes, colour theory, accessibility' },
      { icon: '◐', title: 'Prototyping',          desc: 'Hi-fi prototypes in Figma, interactive components' },
      { icon: '⊞', title: 'Responsive Design',    desc: 'Mobile-first, responsive grids, multi-platform' },
    ],
  },
};

export default function Resume({ lang }) {
  const t = T[lang];
  return (
    <section id="resume" style={{ padding: '8rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <p className="section-label">{t.label}</p>
      <h2 className="section-title">{t.title1} <em>{t.title2}</em></h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem', alignItems: 'start',
      }}>
        {/* Timeline */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.18em', color: 'var(--mut)',
            textTransform: 'uppercase', marginBottom: '2rem',
          }}>{t.tlLabel}</h3>

          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 1, background: 'var(--b2)',
            }} />
            {t.timeline.map((item, i) => (
              <div key={i} style={{ paddingLeft: '1.8rem', marginBottom: '2.2rem', position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: -4, top: 5,
                  width: 9, height: 9, borderRadius: '50%',
                  background: i === 0 ? 'var(--acc)' : 'var(--s4)',
                  border: `2px solid ${i === 0 ? 'var(--acc)' : 'var(--b3)'}`,
                  boxShadow: i === 0 ? '0 0 8px var(--acc-g)' : 'none',
                }} />
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  letterSpacing: '0.1em', color: 'var(--acc)',
                  marginBottom: '0.25rem',
                }}>{item.year}</div>
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.92rem',
                  fontWeight: 600, color: 'var(--txt)', marginBottom: '0.15rem',
                }}>{item.title}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  color: 'var(--acc-l)', marginBottom: '0.5rem',
                }}>{item.place}</div>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.8rem',
                  lineHeight: 1.65, color: 'var(--mut)',
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.18em', color: 'var(--mut)',
            textTransform: 'uppercase', marginBottom: '2rem',
          }}>{t.abLabel}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {t.abilities.map(a => (
                <div key={a.title} className="card" style={{
                padding: '1.1rem 1.4rem',
                display: 'flex', alignItems: 'center', gap: '1.2rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem', color: 'var(--acc)',
                  flexShrink: 0, width: 28, textAlign: 'center',
                }}>{a.icon}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.85rem', fontWeight: 600,
                    color: 'var(--txt)', marginBottom: '0.15rem',
                  }}>{a.title}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.67rem', color: 'var(--mut)',
                  }}>{a.desc}</div>
                </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
