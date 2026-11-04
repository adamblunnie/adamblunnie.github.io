# Implementation validation

Performed on 4 November 2026. This is a pre-publication check; the site has not been deployed.

| Check | Result |
| --- | --- |
| Stable package versions | npm registry stable tags resolved to React/React DOM 19.3.1, Vite 8.3.5, Tailwind and its Vite integration 4.3.4; exact versions locked |
| Supported Node | Built on Node 24.22.1; `.nvmrc` and workflows select Node 24 LTS |
| Reproducible installation | `npm ci` passed using the committed lockfile |
| Production build | `npm run build` passed; output is four local files, approximately 79 KB gzipped plus a small SVG favicon |
| Internal links | `npm run check` passed against the rendered React tree; every section anchor resolves to a unique ID; local build assets exist |
| Accessibility basics | One h1, semantic landmarks, ordered headings, labelled navigation, skip link, visible keyboard focus, decorative SVGs hidden from assistive technology, no disabled placeholder links; rendered checks passed |
| Colour palette | 11 representative text/background pairs calculated above 4.5:1 (minimum 5.97:1); browser-rendered contrast remains unverified |
| Responsive code review | Fluid container and type sizing, single-column cards below 760px, wrapped mobile navigation, no fixed page width; no browser layout verification |
| Reduced motion | CSS disables smooth scrolling and transitions for `prefers-reduced-motion: reduce`; no continuous animations |
| Dependency vulnerability audit | `npm audit --json` against the full dependency tree returned zero known vulnerabilities at all severity levels |
| Secret/content scan | Source, documentation, lockfile, generated files and available Git history scanned for private keys, GitHub/Slack tokens, AWS access keys, generic credential assignments and credential URLs; no matches. Pattern-based scan, not a proof that no sensitive content exists |
| External dependency review | Only React/React DOM at runtime; Vite and Tailwind for builds. No icon library, UI framework, remote font, analytics, widget, API, backend or external runtime request code. Tailwind's import is resolved at build time; SVG namespace URLs are identifiers, not requests |
| Production exposure | No source maps, environment files, manifests or repository files in `dist/`; strict meta CSP and no-referrer present; no inline scripts |
| GitHub Pages configuration | `/` base for the root user site; section navigation; official SHA-pinned Pages actions; separate build/deploy job permissions; OIDC; manual main-only deployment with explicit approval input |
| Pull request CI | [Check portfolio run #1](https://github.com/adamblunnie/adamblunnie.github.io/actions/runs/41927344100) passed on GitHub (npm ci, audit, build and rendered checks) |
| Whitespace | `git diff --check` passed |

## Checks that remain open

The managed environment did not expose the supported browser tool (`cua_repl.js`). Browser QA was skipped in accordance with the [Sites skill](skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md): “If `cua_repl.js` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” No alternative browser route or preview server was started.

Before publishing, verify the actual page at mobile, tablet and desktop widths, 200% zoom, keyboard-only navigation, reduced motion and a screen reader. Inspect browser console, network requests and enforcement of the production CSP. Code and palette checks cannot establish rendered behaviour or full WCAG conformance.

The manual Pages deployment workflow, Pages configuration, HTTPS response headers and live URL have not been tested on the host. They require repository settings and an approved deployment. No settings were changed and no deployment was triggered. The first approved run should be reviewed for GitHub environment protection and Pages permission compatibility.

No external profile availability check was required for content validation; GitHub is the sole public contact destination. Optional project repository, detail, screenshot, LinkedIn and email fields are unset.

## Remaining risks

Dependencies and pinned actions can acquire new vulnerabilities; audit results are time-specific. Keep them maintained through reviewed PRs. GitHub controls hosting headers and platform logs. The meta CSP cannot prevent framing. Public repository history and any future uploaded assets require continuing privacy review. This JavaScript-rendered first version offers a short no-JavaScript notice rather than the complete page; full no-JavaScript content can be added with build-time prerendering later if needed, without adding a backend.
