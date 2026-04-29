export default function SectionHeading({ title1, title2, desc }) {
  return (
    <div className="section-heading">
      <h3 className="section-heading__title">
        {title1} <em>{title2}</em>
      </h3>
      <p className="section-heading__desc">
        {desc}
      </p>
    </div>
  );
}
