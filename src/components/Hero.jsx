import { HERO_TEXT } from '../data/hero';
import { getGridParallaxStyle } from '../lib/parallax';
import { getHeroAmbientWashStyle, getHeroBackgroundTextureStyle } from '../lib/heroBackground';
import HeroIntro from './hero/HeroIntro';
import HeroMarquee from './hero/HeroMarquee';
import HeroProfileCard from './hero/HeroProfileCard';

const HERO_WORDMARK = ['d', 'm', 'b', 'z', 'z', 'r'];

export default function Hero({ lang }) {
  const t = HERO_TEXT[lang];

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
        <div className="hero-bg-wordmark">
          {HERO_WORDMARK.map((letter, index) => (
            <span className="hero-bg-wordmark-letter" key={`${letter}-${index}`}>
              {letter}
            </span>
          ))}
          <span className="hero-bg-wordmark-letter hero-bg-wordmark-period">■</span>
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
