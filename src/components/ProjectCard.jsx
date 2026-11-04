import { ExternalLink } from './ExternalLink'
import { Icon } from './Icon'

export function ProjectCard({ project, index }) {
  const localScreenshot = project.screenshot?.startsWith('/') && !project.screenshot.startsWith('//')
  const localDetails = project.details && (/^\/(?!\/)/.test(project.details) || project.details.startsWith('#'))
  return <article className="project-card" id={project.id}>
    <div className="project-art">
      {localScreenshot ? <img src={project.screenshot} alt={project.screenshotAlt} loading="lazy" width="800" height="480" /> : <div className="project-placeholder" aria-hidden="true"><div className="project-cube"><Icon name="code" /></div><span>WORK IN DEVELOPMENT</span></div>}
      <span className="project-index">{String(index + 1).padStart(2, '0')} / {project.category.toUpperCase()}</span>
    </div>
    <div className="project-content">
      <div className="flex flex-wrap items-center gap-3"><span className="eyebrow">{project.category}</span><span className="status">{project.status}</span></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.technologies.length > 0 && <ul className="tags" aria-label="Technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>}
      <div className="project-links">
        <ExternalLink href={project.repository}>View repository <Icon name="external" /></ExternalLink>
        {localDetails && <a href={project.details}>Read project <Icon name="arrow" /></a>}
        {project.draft && <span className="muted">Project details coming later</span>}
      </div>
    </div>
  </article>
}
