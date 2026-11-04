export function SectionHeading({ number, label, title, children }) {
  return <div className="section-heading">
    <p className="eyebrow"><span>{number}</span> {label}</p>
    <h2>{title}</h2>
    {children && <p className="section-intro">{children}</p>}
  </div>
}
