import { useState } from 'react';
import './index.css';
import Cursor   from './components/Cursor';
import Nav      from './components/Nav';
import Hero     from './components/Hero';
import About    from './components/About';
import Stack    from './components/Stack';
import Projects from './components/Projects';
import Resume   from './components/Resume';
import Contact  from './components/Contact';

export default function App() {
  const [lang, setLang] = useState('ru');

  return (
    <>
      <Cursor />
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero     lang={lang} />
        <About    lang={lang} />
        <Stack    lang={lang} />
        <Projects lang={lang} />
        <Resume   lang={lang} />
        <Contact  lang={lang} />
      </main>
    </>
  );
}
