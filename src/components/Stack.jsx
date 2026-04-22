const T = {
  ru: {
    label: 'Инструменты',
    title1: 'Мой', title2: 'арсенал',
    expertLabel: 'Экспертный уровень',
    midLabel: 'Средний уровень',
    codeLabel: 'Код & инструменты',
    note: '* Код использую как вспомогательный инструмент для прототипирования и реализации дизайн-решений',
  },
  en: {
    label: 'Tools',
    title1: 'My', title2: 'arsenal',
    expertLabel: 'Expert level',
    midLabel: 'Intermediate level',
    codeLabel: 'Code & tools',
    note: '* Code is used as an auxiliary tool for prototyping and implementing design solutions',
  },
};

const EXPERT = [
  { name: 'Figma',              icon: 'https://skillicons.dev/icons?i=figma',      badge: 'Expert', color: '#1abc9c' },
  { name: 'Adobe Photoshop',    icon: 'https://skillicons.dev/icons?i=ps',         badge: 'Expert', color: '#31a8ff' },
  { name: 'Adobe Illustrator',  icon: 'https://skillicons.dev/icons?i=ai',         badge: 'Expert', color: '#ff9a00' },
];

const MID = [
  { name: 'Adobe After Effects',icon: 'https://skillicons.dev/icons?i=ae',         badge: 'Mid' },
  { name: 'Adobe XD',           icon: 'https://skillicons.dev/icons?i=xd',         badge: 'Mid' },
  { name: 'Adobe InDesign',     icon: 'https://skillicons.dev/icons?i=id' ,        badge: 'Mid' },
  { name: 'Blender',            icon: 'https://skillicons.dev/icons?i=blender',    badge: 'Basic' },
];

const CODE = [
  { name: 'HTML / CSS',         icon: 'https://skillicons.dev/icons?i=html',       badge: 'Mid' },
  { name: 'JavaScript',         icon: 'https://skillicons.dev/icons?i=js',         badge: 'Basic' },
  { name: 'React',              icon: 'https://skillicons.dev/icons?i=react',      badge: 'Basic' },
  { name: 'Git',                icon: 'https://skillicons.dev/icons?i=git',        badge: 'Mid' },
];

const BADGE_COLORS = {
  Expert: { bg: 'rgba(242,57,135,0.15)', color: '#f23987', border: 'rgba(242,57,135,0.3)' },
  Mid:    { bg: 'rgba(255,255,255,0.06)', color: '#aaaaaa', border: 'rgba(255,255,255,0.12)' },
  Basic:  { bg: 'rgba(255,255,255,0.03)', color: '#666666', border: 'rgba(255,255,255,0.07)' },
};

function ToolCard({ name, icon, badge, large }) {
  const bc = BADGE_COLORS[badge] || BADGE_COLORS.Mid;
  return (
    <div className="card" style={{
      padding: large ? '1.8rem' : '1.2rem 1.4rem',
      display: 'flex',
      flexDirection: large ? 'column' : 'row',
      alignItems: large ? 'flex-start' : 'center',
      gap: large ? '1rem' : '0.9rem',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {large && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, var(--acc), transparent)',
        }} />
      )}
      <img src={icon} alt={name} width={large ? 44 : 32} height={large ? 44 : 32}
        style={{ borderRadius: 8, flexShrink: 0 }}
        onError={e => { e.target.style.display='none'; }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-ui)',
          fontSize: large ? '0.95rem' : '0.82rem',
          fontWeight: 600,
          color: 'var(--txt)',
          marginBottom: '0.35rem',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{name}</div>
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem', letterSpacing: '0.1em',
          padding: '0.15rem 0.5rem',
          background: bc.bg, color: bc.color,
          border: `1px solid ${bc.border}`,
          borderRadius: '4px',
        }}>{badge}</span>
      </div>
    </div>
  );
}

export default function Stack({ lang }) {
  const t = T[lang];
  return (
    <section id="stack" style={{ padding: '8rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <p className="section-label">{t.label}</p>
      <h2 className="section-title">{t.title1} <em>{t.title2}</em></h2>

      {/* Expert */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.15em', color: 'var(--acc)',
          textTransform: 'uppercase', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: 'var(--acc)', boxShadow: '0 0 8px var(--acc)',
          }}/>
          {t.expertLabel}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {EXPERT.map(tool => <ToolCard key={tool.name} {...tool} large />)}
        </div>
      </div>

      {/* Mid */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.15em', color: 'var(--mut)',
          textTransform: 'uppercase', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: 'var(--mut)',
          }}/>
          {t.midLabel}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.8rem' }}>
          {MID.map(tool => <ToolCard key={tool.name} {...tool} />)}
        </div>
      </div>

      {/* Code */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.15em', color: 'var(--mut)',
          textTransform: 'uppercase', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: 'var(--s5)',
          }}/>
          {t.codeLabel}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))', gap: '0.8rem' }}>
          {CODE.map(tool => <ToolCard key={tool.name} {...tool} />)}
        </div>
        <p style={{
          marginTop: '1.2rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: 'var(--mut)', fontStyle: 'italic',
        }}>{t.note}</p>
      </div>
    </section>
  );
}
