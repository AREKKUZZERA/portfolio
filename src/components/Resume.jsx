const T = {
  ru: {
    label: 'Резюме',
    title1: 'Опыт &', title2: 'образование',
    trustLabel: 'Факты',
    tlLabel: 'Путь',
    abLabel: 'Компетенции',
    trust: [
      { label: 'Что делаю', value: 'UI/UX, брендинг, дизайн-системы, лендинги' },
      { label: 'Для кого', value: 'Продуктовые команды, агентства, малый бизнес' },
      { label: 'Результат', value: '20+ проектов: интерфейсы, айдентика, презентации' },
      { label: 'Инструменты', value: 'Figma, Adobe CC, Blender, React-прототипы' },
    ],
    timeline: [
      {
        year: '2025 — наст.',
        title: 'Дизайнер-фрилансер',
        place: 'Самозанятый',
        desc: 'Проектирую интерфейсы, айдентику и визуальные системы для цифровых продуктов и коммерческих сайтов.',
      },
      {
        year: '2024 — наст.',
        title: 'Магистратура по дизайну',
        place: 'Университет: РТУ МИРЭА',
        desc: 'Углубляю исследовательский подход, дизайн-менеджмент и системное проектирование цифровых продуктов.',
      },
      {
        year: '2023',
        title: 'Бакалавриат по дизайну',
        place: 'Университет: РТУ МИРЭА',
        desc: 'Дипломный проект: модульная рабочая среда с фокусом на эргономику, адаптивность и сценарии использования.',
      },
      {
        year: '2021 — 2023',
        title: 'Первые шаги',
        place: 'Подработка',
        desc: 'Работал с ИП над логотипами, упаковкой, рекламными материалами и первыми UX-редизайнами.',
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
    trustLabel: 'Proof points',
    tlLabel: 'Journey',
    abLabel: 'Competencies',
    trust: [
      { label: 'What I do', value: 'UI/UX, branding, design systems, landing pages' },
      { label: 'For whom', value: 'Product teams, agencies, small businesses' },
      { label: 'Result', value: '20+ projects: interfaces, identity, presentations' },
      { label: 'Tools', value: 'Figma, Adobe CC, Blender, React prototypes' },
    ],
    timeline: [
      {
        year: '2025 — now',
        title: 'Freelance Designer',
        place: 'Self-employed',
        desc: 'Designing interfaces, identity, and visual systems for digital products and commercial websites.',
      },
      {
        year: '2024 — now',
        title: "Master's in Design",
        place: 'University: RTU MIREA',
        desc: "Deepening research practice, design management, and systematic digital product design.",
      },
      {
        year: '2023',
        title: "Bachelor's in Design",
        place: 'University: RTU MIREA',
        desc: 'Thesis project: a modular workspace focused on ergonomics, adaptability, and daily-use scenarios.',
      },
      {
        year: '2021 — 2023',
        title: 'First steps',
        place: 'Part-time work',
        desc: 'Worked with entrepreneurs on logos, packaging, advertising materials, and early UX redesigns.',
      },
      {
        year: '2018',
        title: 'The beginning',
        place: 'Self-taught',
        desc: 'First steps in design: Photoshop, Illustrator, fundamentals of typography and colour. At that time it was a hobby for me.',
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
    <section id="resume" className="page-section resume-section">
      <p className="section-label">{t.label}</p>
      <h2 className="section-title">{t.title1} <em>{t.title2}</em></h2>

      <div className="resume-trust-block" aria-labelledby="resume-trust-label">
        <h3 id="resume-trust-label" className="resume-column-label">{t.trustLabel}</h3>
        <div className="resume-trust-grid">
          {t.trust.map((item) => (
            <div key={item.label} className="resume-trust-card">
              <div className="resume-trust-card__label">{item.label}</div>
              <div className="resume-trust-card__value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="resume-main-grid">
        <div>
          <h3 className="resume-column-label">{t.tlLabel}</h3>

          <div className="resume-timeline">
            <div className="resume-timeline__line" />
            {t.timeline.map((item, i) => (
              <div key={i} className="resume-timeline__item">
                <div className={`resume-timeline__marker${i === 0 ? ' resume-timeline__marker--active' : ''}`} />
                <div className="resume-timeline__year">{item.year}</div>
                <div className="resume-timeline__title">{item.title}</div>
                <div className="resume-timeline__place">{item.place}</div>
                <p className="resume-timeline__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="resume-column-label">{t.abLabel}</h3>

          <div className="resume-abilities-list">
            {t.abilities.map(a => (
              <div key={a.title} className="card resume-ability-card">
                <div className="resume-ability-card__icon">{a.icon}</div>
                <div>
                  <div className="resume-ability-card__title">{a.title}</div>
                  <div className="resume-ability-card__desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
