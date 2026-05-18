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
        place: 'University: RTU MIREA',
        desc: "Advanced study of design theory, research methodologies, and design management. Focus on systematic digital product design.",
      },
      {
        year: '2023',
        title: "Bachelor's in Design",
        place: 'University: RTU MIREA',
        desc: "Obtained a Bachelor's degree in Design. My thesis focused on the comprehensive development of a workspace: a modern computer desk and its modular system for everyday use, with an emphasis on ergonomics, adaptability, and efficient workspace organisation.",
      },
      {
        year: '2021 — 2023',
        title: 'First steps',
        place: 'Part-time work',
        desc: 'Worked with individual entrepreneurs: logos, packaging, and advertising materials. First UX projects — redesigning flyers, menus, and banners.',
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
