import { useEffect, useRef, useState } from 'react';
import { HERO_TEXT } from '../data/hero';
import { getHeroAmbientWashStyle, getHeroBackgroundTextureStyle } from '../lib/heroBackground';
import HeroCanvasGrid from './hero/HeroCanvasGrid';
import HeroIntro from './hero/HeroIntro';
import HeroMarquee from './hero/HeroMarquee';
import HeroProfileCard from './hero/HeroProfileCard';

const HERO_WORDMARK = ['d', 'm', 'b', 'z', 'z', 'r'];
const HERO_PERIOD_INDEX = HERO_WORDMARK.length;

export default function Hero({ lang }) {
  const t = HERO_TEXT[lang];
  const wordmarkRef = useRef(null);
  const [activeWordmarkIndex, setActiveWordmarkIndex] = useState(null);
  const [wordmarkInteractionKey, setWordmarkInteractionKey] = useState(0);

  useEffect(() => {
    if (activeWordmarkIndex === null) {
      return undefined;
    }

    const handleOutsidePointerDown = (event) => {
      if (wordmarkRef.current?.contains(event.target)) {
        return;
      }

      setActiveWordmarkIndex(null);
    };

    const resetTimerId = window.setTimeout(() => {
      setActiveWordmarkIndex(null);
    }, 1000);

    window.addEventListener('pointerdown', handleOutsidePointerDown, { passive: true });
    return () => {
      window.clearTimeout(resetTimerId);
      window.removeEventListener('pointerdown', handleOutsidePointerDown);
    };
  }, [activeWordmarkIndex, wordmarkInteractionKey]);

  const handleWordmarkActivate = (index) => {
    setWordmarkInteractionKey((currentKey) => currentKey + 1);
    setActiveWordmarkIndex(index);
  };

  const getWordmarkLetterClassName = (index, extraClassName = '') => {
    const classNames = ['hero-bg-wordmark-letter'];

    if (activeWordmarkIndex === index) {
      classNames.push('hero-bg-wordmark-letter--active');
      classNames.push(`hero-bg-wordmark-letter--hit-${wordmarkInteractionKey % 2 === 0 ? 'even' : 'odd'}`);
    }

    if (extraClassName) {
      classNames.push(extraClassName);
    }

    return classNames.join(' ');
  };

  const getWordmarkAriaLabel = (letter, index) => {
    if (lang === 'ru') {
      return index === HERO_PERIOD_INDEX ? 'Подсветить знак dmbzzr' : `Подсветить букву ${letter}`;
    }

    return index === HERO_PERIOD_INDEX ? 'Highlight dmbzzr mark' : `Highlight letter ${letter}`;
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-technical-bg">
        <HeroCanvasGrid />
        <div className="hero-bg-corner hero-bg-corner--left" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-bg-corner hero-bg-corner--right" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-bg-geometry" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div
          className="hero-bg-wordmark"
          ref={wordmarkRef}
          role="group"
          aria-label={lang === 'ru' ? 'Интерактивный логотип dmbzzr' : 'Interactive dmbzzr wordmark'}
        >
          {HERO_WORDMARK.map((letter, index) => (
            <button
              type="button"
              className={getWordmarkLetterClassName(index)}
              key={`${letter}-${index}`}
              onClick={() => handleWordmarkActivate(index)}
              aria-label={getWordmarkAriaLabel(letter, index)}
              aria-pressed={activeWordmarkIndex === index}
            >
              {letter}
            </button>
          ))}
          <button
            type="button"
            className={getWordmarkLetterClassName(HERO_PERIOD_INDEX, 'hero-bg-wordmark-period')}
            onClick={() => handleWordmarkActivate(HERO_PERIOD_INDEX)}
            aria-label={getWordmarkAriaLabel('', HERO_PERIOD_INDEX)}
            aria-pressed={activeWordmarkIndex === HERO_PERIOD_INDEX}
          >
            <span className="hero-bg-wordmark-period-glyph" aria-hidden="true">■</span>
          </button>
        </div>
      </div>
      <div style={getHeroBackgroundTextureStyle()} />
      <div style={getHeroAmbientWashStyle()} />

      <div className="hero-shell">
        <div className="hero-main-grid">
          <HeroIntro t={t} />
          <HeroProfileCard t={t} />
        </div>
        <HeroMarquee />
      </div>
    </section>
  );
}
