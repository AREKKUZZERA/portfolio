import { HERO_TEXT } from '../data/hero';
import { getGridParallaxStyle } from '../lib/parallax';
import { getHeroAmbientWashStyle, getHeroBackgroundTextureStyle } from '../lib/heroBackground';
import HeroIntro from './hero/HeroIntro';
import HeroMarquee from './hero/HeroMarquee';
import HeroProfileCard from './hero/HeroProfileCard';

export default function Hero({ lang }) {
  const t = HERO_TEXT[lang];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-bg" style={getGridParallaxStyle()} />
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
