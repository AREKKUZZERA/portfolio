import bwcCaseUrl from '../assets/portfolio/behance_preview_better_web_console_real_ui_EN_v2.html?url';
import bwcCaseRuUrl from '../assets/portfolio/bwc-case-ru.html?url';
import darkPleaseCaseRuUrl from '../assets/portfolio/dark-please-case-ru.html?url';
import dpCaseUrl from '../assets/portfolio/dp!-behance-prev.html?url';
import MebelDorCaseEnUrl from '../assets/portfolio/mebeldor-case-en.html?url';
import MebelDorCaseUrl from '../assets/portfolio/mebeldor_behance_preview_real_mockup (1).html?url';
import previewBwc from '../assets/portfolio/preview/bwc-prev.svg';
import previewDp from '../assets/portfolio/preview/dp-prev.svg';
import previewMebelDor from '../assets/portfolio/preview/mebeldor-prev.svg';

export const GITHUB_USER = 'AREKKUZZERA';

export const PROJECTS_TEXT = {
  ru: {
    label: 'Работы',
    behanceTitle1: 'Отобранные',
    behanceTitle2: 'кейсы',
    behanceDesc: 'Проекты с Behance и основного портфолио.',
    githubTitle1: 'GitHub',
    githubTitle2: 'репозитории',
    githubDesc: 'Кодовые проекты, плагины и интерфейсные эксперименты.',
    all: 'Все',
    allRepos: 'Все репозитории на GitHub ↗',
    loading: 'Загрузка с GitHub...',
    empty: 'Не удалось загрузить репозитории.',
    noDesc: 'Описание не указано.',
    openWork: 'Открыть проект',
    hoverHint: 'Нажмите, чтобы открыть',
    caseOne: 'BWC — удалённая веб-консоль в виде серверного плагина',
    caseTwo: 'DARK PLEASE! — расширение для браузера, снижающее нагрузку на глаза',
    caseThree: 'MebelDor — премиальный лендинг для бренда мебели на заказ',
    shortOne: 'BWC',
    shortTwo: 'DARK PLEASE!',
    shortThree: 'MebelDor',
  },
  en: {
    label: 'Works',
    behanceTitle1: 'Selected',
    behanceTitle2: 'cases',
    behanceDesc: 'Projects from Behance and the main portfolio.',
    githubTitle1: 'GitHub',
    githubTitle2: 'repositories',
    githubDesc: 'Code projects, plugins, and interface experiments.',
    all: 'All',
    allRepos: 'All repos on GitHub ↗',
    loading: 'Loading from GitHub...',
    empty: 'Could not load repositories.',
    noDesc: 'No description provided.',
    openWork: 'Open project',
    hoverHint: 'Click to open',
    caseOne: 'BWC — a remote web console provided as a server plugin',
    caseTwo: 'DARK PLEASE! — a browser extension designed to reduce eye strain',
    caseThree: 'MebelDor — a premium landing page for a custom furniture brand',
    shortOne: 'BWC',
    shortTwo: 'DARK PLEASE!',
    shortThree: 'MebelDor',
  },
};

export const BEHANCE_PROJECTS = [
  {
    id: 'bwc',
    titleKey: 'caseOne',
    shortTitleKey: 'shortOne',
    preview: previewBwc,
    htmlUrls: {
      ru: bwcCaseRuUrl,
      en: bwcCaseUrl,
    },
    accent: 'rgba(242,57,135,0.32)',
  },
  {
    id: 'dark-pink',
    titleKey: 'caseTwo',
    shortTitleKey: 'shortTwo',
    preview: previewDp,
    htmlUrls: {
      ru: darkPleaseCaseRuUrl,
      en: dpCaseUrl,
    },
    accent: 'rgba(255,121,176,0.36)',
  },
  {
    id: 'MebelDor',
    titleKey: 'caseThree',
    shortTitleKey: 'shortThree',
    preview: previewMebelDor,
    htmlUrls: {
      ru: MebelDorCaseUrl,
      en: MebelDorCaseEnUrl,
    },
    accent: 'rgba(201,169,110,0.34)',
  },
];

export const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#ffd43b',
  HTML: '#e34f26',
  CSS: '#563d7c',
  Vue: '#42b883',
  default: '#f23987',
};
