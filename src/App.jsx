import { lazy, Suspense, useState } from 'react';
import { usePointerCssVars } from './hooks/usePointerCssVars';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';

const Projects = lazy(() => import('./components/Projects'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  const [lang, setLang] = useState('ru');
  usePointerCssVars();

  return (
    <>
      <Cursor />
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Stack lang={lang} />
        <Suspense fallback={null}>
          <Projects lang={lang} />
          <Resume lang={lang} />
          <Contact lang={lang} />
        </Suspense>
      </main>
    </>
  );
}
