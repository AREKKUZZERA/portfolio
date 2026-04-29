export default function HeroIntro({ t }) {
  return (
    <div className="hero-copy">
      <h1 className="hero-title">
        <span>{t.role1}</span>
        <span>{t.role2}</span>
        <span>{t.role3}</span>
      </h1>
      <p className="hero-desc">{t.desc}</p>
      <div className="hero-cta-row">
        <a href="#projects" className="btn-primary">{t.cta1} →</a>
        <a href="#contact" className="btn-ghost">{t.cta2}</a>
      </div>
    </div>
  );
}
