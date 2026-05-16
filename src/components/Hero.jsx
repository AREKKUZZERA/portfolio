import { useEffect, useRef, useState } from 'react';
import { HERO_TEXT } from '../data/hero';
import { getGridParallaxStyle } from '../lib/parallax';
import { getHeroAmbientWashStyle, getHeroBackgroundTextureStyle } from '../lib/heroBackground';
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

  const handleWordmarkPointerDown = (index, event) => {
    event.preventDefault();
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

  return (
    <section id="hero" className="hero-section">
      <div className="hero-technical-bg" style={getGridParallaxStyle()} aria-hidden="true">
        <div className="hero-grid-bg" />
        <div className="hero-bg-rulers" />
        <div className="hero-bg-corner hero-bg-corner--left">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-bg-corner hero-bg-corner--right">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-bg-geometry">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-bg-wordmark" ref={wordmarkRef}>
          {HERO_WORDMARK.map((letter, index) => (
            <span
              className={getWordmarkLetterClassName(index)}
              key={`${letter}-${index}`}
              onPointerDown={(event) => handleWordmarkPointerDown(index, event)}
            >
              {letter}
            </span>
          ))}
          <span
            className={getWordmarkLetterClassName(HERO_PERIOD_INDEX, 'hero-bg-wordmark-period')}
            onPointerDown={(event) => handleWordmarkPointerDown(HERO_PERIOD_INDEX, event)}
          >
            <span className="hero-bg-wordmark-period-glyph" aria-hidden="true">■</span>
          </span>
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
