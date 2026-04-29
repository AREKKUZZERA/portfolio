import iconAfterEffects from '../assets/icons/after-effects.svg';
import iconExpress from '../assets/icons/adobe-express.svg';
import iconXd from '../assets/icons/adobe-xd.svg';
import iconBlender from '../assets/icons/blender.svg';
import iconFigma from '../assets/icons/figma.svg';
import iconGit from '../assets/icons/git.svg';
import iconHtmlCss from '../assets/icons/html-css.svg';
import iconIllustrator from '../assets/icons/illustrator.svg';
import iconJavascript from '../assets/icons/javascript.svg';
import iconPhotoshop from '../assets/icons/photoshop.svg';
import iconReact from '../assets/icons/react.svg';

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
      { name: 'Figma', badge: 'Expert', icon: iconFigma, glyph: 'Fg', glyphBg: '#1e1e1e', glyphColor: '#fff', large: true },
      { name: 'Adobe Photoshop', badge: 'Expert', icon: iconPhotoshop, glyph: 'Ps', glyphBg: '#001e36', glyphColor: '#31a8ff', large: true },
      { name: 'Adobe Illustrator', badge: 'Expert', icon: iconIllustrator, glyph: 'Ai', glyphBg: '#330000', glyphColor: '#ff9a00', large: true },
    ],
  },
  {
    key: 'mid',
    labelKey: 'midLabel',
    marker: 'muted',
    gridClassName: 'stack-mid-grid',
    tools: [
      { name: 'Adobe AE', badge: 'Mid', icon: iconAfterEffects, glyph: 'Ae', glyphBg: '#00005b', glyphColor: '#9999ff' },
      { name: 'Adobe XD', badge: 'Mid', icon: iconXd, glyph: 'Xd', glyphBg: '#470137', glyphColor: '#ff61f6' },
      { name: 'Adobe Express', badge: 'Mid', icon: iconExpress, glyph: 'Ex', glyphBg: '#2b0320', glyphColor: '#ff61f6' },
      { name: 'Blender', badge: 'Mid', icon: iconBlender, glyph: 'Bl', glyphBg: '#1e1e1e', glyphColor: '#f5792a' },
    ],
  },
  {
    key: 'code',
    labelKey: 'codeLabel',
    marker: 'dim',
    gridClassName: 'stack-code-grid',
    tools: [
      { name: 'HTML / CSS', badge: 'Mid', icon: iconHtmlCss, glyph: 'HC', glyphBg: '#e34f26', glyphColor: '#fff', wideIcon: true },
      { name: 'JavaScript', badge: 'Basic', icon: iconJavascript, glyph: 'JS', glyphBg: '#f7df1e', glyphColor: '#1f1a00' },
      { name: 'React', badge: 'Basic', icon: iconReact, glyph: 'Re', glyphBg: '#20232a', glyphColor: '#61dafb' },
      { name: 'Git', badge: 'Mid', icon: iconGit, glyph: 'Git', glyphBg: '#f05032', glyphColor: '#fff' },
    ],
  },
];

export const BADGE_COLORS = {
  Expert: { bg: 'rgba(242,57,135,0.15)', color: '#f23987', border: 'rgba(242,57,135,0.3)' },
  Mid: { bg: 'rgba(255,255,255,0.06)', color: '#aaaaaa', border: 'rgba(255,255,255,0.12)' },
  Basic: { bg: 'rgba(255,255,255,0.03)', color: '#666666', border: 'rgba(255,255,255,0.07)' },
};
