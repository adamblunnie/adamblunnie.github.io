export function ExternalLink({ href, children, className = '' }) {
  // Keep optional content links restricted to HTTPS. Links open in the same tab.
  if (typeof href !== 'string' || !href.startsWith('https://')) return null
  return <a href={href} className={className} rel="noopener noreferrer">{children}</a>
}
