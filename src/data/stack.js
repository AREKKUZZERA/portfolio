export const STACK_TEXT = {
  ru: {
    label: 'Инструменты',
    title1: 'Мой',
    title2: 'арсенал',
    expertLabel: 'Экспертный уровень',
    midLabel: 'Средний уровень',
    codeLabel: 'Код & инструменты',
    note: '* Код использую как вспомогательный инструмент для прототипирования и реализации дизайн-решений',
  },
  en: {
    label: 'Tools',
    title1: 'My',
    title2: 'arsenal',
    expertLabel: 'Expert level',
    midLabel: 'Intermediate level',
    codeLabel: 'Code & tools',
    note: '* Code is used as an auxiliary tool for prototyping and implementing design solutions',
  },
};

export const STACK_GROUPS = [
  {
    key: 'expert',
    labelKey: 'expertLabel',
    marker: 'accent',
    gridClassName: 'stack-expert-grid',
    tools: [
      { name: 'Figma', badge: 'Expert', icon: '/skill-icons/figma.svg', glyph: 'Fg', glyphBg: '#1abc9c', glyphColor: '#071a15', large: true },
      { name: 'Adobe Photoshop', badge: 'Expert', icon: '/skill-icons/ps.svg', glyph: 'Ps', glyphBg: '#31a8ff', glyphColor: '#06131f', large: true },
      { name: 'Adobe Illustrator', badge: 'Expert', icon: '/skill-icons/ai.svg', glyph: 'Ai', glyphBg: '#ff9a00', glyphColor: '#201100', large: true },
    ],
  },
  {
    key: 'mid',
    labelKey: 'midLabel',
    marker: 'muted',
    gridClassName: 'stack-mid-grid',
    tools: [
      { name: 'Adobe AE', badge: 'Mid', icon: '/skill-icons/ae.svg', glyph: 'Ae', glyphBg: '#9999ff', glyphColor: '#101024' },
      { name: 'Adobe XD', badge: 'Mid', icon: '/skill-icons/xd.svg', glyph: 'Xd', glyphBg: '#ff61f6', glyphColor: '#22041f' },
      { name: 'Adobe Express', badge: 'Mid', glyph: 'Ex', glyphBg: '#f23987', glyphColor: '#fff' },
      { name: 'Blender', badge: 'Mid', icon: '/skill-icons/blender.svg', glyph: 'Bl', glyphBg: '#f5792a', glyphColor: '#1d0e03' },
    ],
  },
  {
    key: 'code',
    labelKey: 'codeLabel',
    marker: 'dim',
    gridClassName: 'stack-code-grid',
    tools: [
      { name: 'HTML / CSS', badge: 'Mid', icon: '/skill-icons/html_css.svg', glyph: 'HC', glyphBg: '#e34f26', glyphColor: '#fff', wideIcon: true },
      { name: 'JavaScript', badge: 'Basic', icon: '/skill-icons/js.svg', glyph: 'JS', glyphBg: '#f7df1e', glyphColor: '#1f1a00' },
      { name: 'React', badge: 'Basic', icon: '/skill-icons/react.svg', glyph: 'Re', glyphBg: '#61dafb', glyphColor: '#07171d' },
      { name: 'Git', badge: 'Mid', icon: '/skill-icons/git.svg', glyph: 'Git', glyphBg: '#f05032', glyphColor: '#fff' },
    ],
  },
];

export const BADGE_COLORS = {
  Expert: { bg: 'rgba(242,57,135,0.15)', color: '#f23987', border: 'rgba(242,57,135,0.3)' },
  Mid: { bg: 'rgba(255,255,255,0.06)', color: '#aaaaaa', border: 'rgba(255,255,255,0.12)' },
  Basic: { bg: 'rgba(255,255,255,0.03)', color: '#666666', border: 'rgba(255,255,255,0.07)' },
};
