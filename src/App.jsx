import { lazy, Suspense, useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';

const Projects = lazy(() => import('./components/Projects'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));

const META = {
  ru: {
    title: 'dmbzzr — дизайнер интерфейсов',
    description: 'Портфолио dmbzzr: UI/UX, визуальные системы, брендинг и кейсы цифровых продуктов.',
  },
  en: {
    title: 'dmbzzr — UI/UX and visual designer',
    description: 'dmbzzr portfolio: UI/UX, visual systems, branding, and digital product case studies.',
  },
};

function setMetaContent(selector, content) {
  document.querySelector(selector)?.setAttribute('content', content);
}

function PageFallback() {
  return (
    <div className="page-section page-fallback" role="status" aria-live="polite" aria-label="Loading content">
      <span className="page-fallback__line" />
      <span className="page-fallback__line page-fallback__line--short" />
      <span className="page-fallback__grid">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('ru');
  const meta = META[lang];

  useEffect(() => {
    const currentUrl = window.location.origin + window.location.pathname;

    document.documentElement.lang = lang;
    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', currentUrl);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = currentUrl;
    }
  }, [lang, meta]);

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Stack lang={lang} />
        <Suspense fallback={<PageFallback />}>
          <Projects lang={lang} />
          <Resume lang={lang} />
          <Contact lang={lang} />
        </Suspense>
      </main>
    </>
  );
}
