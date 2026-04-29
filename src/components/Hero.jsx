import { HERO_TEXT } from '../data/hero';
import { getGridParallaxStyle } from '../lib/parallax';
import { getHeroAmbientBlobStyle, getHeroBackgroundTextureStyle } from '../lib/heroBackground';
import HeroBadge from './hero/HeroBadge';
import HeroIntro from './hero/HeroIntro';
import HeroMarquee from './hero/HeroMarquee';
import HeroProfileCard from './hero/HeroProfileCard';

export default function Hero({ lang }) {
  const t = HERO_TEXT[lang];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-bg" style={getGridParallaxStyle({ x: 10, y: 8 })} />
      <div style={getHeroBackgroundTextureStyle()} />
      <div style={getHeroAmbientBlobStyle('right')} />
      <div style={getHeroAmbientBlobStyle('left')} />

      <div className="hero-shell">
        <HeroBadge>{t.badge}</HeroBadge>
        <div className="hero-main-grid">
          <HeroIntro t={t} />
          <HeroProfileCard t={t} />
        </div>
        <HeroMarquee />
      </div>
    </section>
  );
}
