export function NetworkGraphic() {
  return <div className="network-graphic" aria-hidden="true">
    <div className="graphic-grid" />
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <svg className="network-lines" viewBox="0 0 440 420" fill="none">
      <path d="M220 97v80m0 68v80M85 210h100m70 0h100M130 115l66 66m49 59 68 68M130 310l64-64m54-66 65-65" stroke="#555047" strokeWidth="1" />
      <path d="M220 97v80m35 33h100M130 310l64-64" stroke="#c97d58" strokeWidth="1.5" />
      <g fill="#e6a17c"><circle cx="220" cy="97" r="3" /><circle cx="355" cy="210" r="3" /><circle cx="130" cy="310" r="3" /></g>
    </svg>
    <div className="network-center"><svg width="68" height="68" viewBox="0 0 68 68" fill="none"><path d="m34 6 23 9v18c0 15-23 29-23 29S11 48 11 33V15l23-9Z" stroke="currentColor" strokeWidth="1.3"/><path d="M25 39a7 7 0 0 1-1-14 10 10 0 0 1 18 2 6 6 0 0 1-1 12H25Z" stroke="currentColor" strokeWidth="1.3"/></svg></div>
    <span className="node node-top">NETWORKS</span><span className="node node-right">CLOUD</span><span className="node node-bottom">SECURITY</span>
    <span className="graphic-caption">CONNECTED SYSTEMS. CONSIDERED DESIGN.</span>
  </div>
}
