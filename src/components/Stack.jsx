import { STACK_GROUPS, STACK_TEXT } from '../data/stack';
import ToolCard from './stack/ToolCard';

export default function Stack({ lang }) {
  const t = STACK_TEXT[lang];

  return (
    <section id="stack" className="page-section stack-section">
      <p className="section-label">{t.label}</p>
      <h2 className="section-title">{t.title1} <em>{t.title2}</em></h2>

      {STACK_GROUPS.map((group) => (
        <div className="stack-group" key={group.key}>
          <div className={`stack-group__label stack-group__label--${group.marker}`}>
            <span />
            {t[group.labelKey]}
          </div>
          <div className={`stack-grid ${group.gridClassName}`}>
            {group.tools.map((tool) => <ToolCard key={tool.name} {...tool} />)}
          </div>
        </div>
      ))}

      <p className="stack-note">{t.note}</p>
    </section>
  );
}
