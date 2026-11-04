export function Icon({ name, className = '' }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: <><path d="M14 4h6v6m0-6L10 14" /><path d="M10 4H4v16h16v-6" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    cloud: <path d="M7 18a5 5 0 0 1-1-10 7 7 0 0 1 13 2 4 4 0 0 1-1 8H7Z" />,
    code: <><path d="m7 7-5 5 5 5m10-10 5 5-5 5m-4-14-2 18" /></>,
    github: <><path d="M9 19c-4 1-4-2-6-2m15 5v-4a4 4 0 0 0-1-3c4-.5 6-2 6-6a5 5 0 0 0-1.5-3.5A5 5 0 0 0 21 2s-1.5-.5-4 1a14 14 0 0 0-8 0C6.5 1.5 5 2 5 2a5 5 0 0 0-.5 3.5A5 5 0 0 0 3 9c0 4 2 5.5 6 6a4 4 0 0 0-1 3v4" /></>,
  }
  return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>
}
