# Adam Blunnie — personal portfolio

A static React portfolio for **https://adamblunnie.github.io/**, built with Vite, Tailwind CSS and modern JavaScript. No backend, accounts, analytics, cookies, remote fonts or paid services. System fonts and an original local SVG/CSS illustration keep it portable and lightweight.

**Initial implementation: review in a pull request. Do not merge or publish until Adam approves.** Deployment is manual even after merging. No deployment or Pages settings changes were performed as part of the implementation.

## Run locally

Use Node.js **24 LTS** (`nvm use` if nvm is installed) and npm:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. Do not expose the development server to untrusted networks. The strict production CSP is removed only from the development response to allow Vite's local styles and hot reload. It remains in `index.html` and every production build.

```sh
npm run build
npm run check
npm run preview
```

`dist/` is the complete portable static site. Build before previewing. The production CSP also applies in preview. `npm run check` renders the actual React tree without a listening server, validates internal links, heading/ID basics, image alt attributes, local build assets, the production CSP and the absence of source maps. It is a focused regression check, not a full accessibility audit.

## Review the production site without publishing

With Git and Node.js 24 LTS installed, open a terminal in the directory where you want the checkout:

```sh
git clone --branch feat/portfolio-v1 https://github.com/adamblunnie/adamblunnie.github.io.git
cd adamblunnie.github.io
npm ci
npm run build
npm run preview
```

Open **http://localhost:4173/** (or the address Vite prints if the port is busy). This serves the same `dist/` files that GitHub Pages will receive, including the production CSP. It runs on your computer and does not merge, deploy or publish anything. Press Ctrl+C to stop. The preview server binds to localhost by default.

If you already have a checkout, use `git fetch origin`, then `git switch feat/portfolio-v1` and `git pull --ff-only`, followed by the npm commands above. Avoid overwriting any local changes.

Review the appearance, scrolling, links and keyboard focus, then use your browser’s responsive/device mode to check mobile and tablet widths. Publication remains a separate, explicitly approved manual workflow.

## Source structure

```text
src/
  App.jsx                   Page composition and section navigation
  main.jsx                  React entry point
  styles.css                Shared visual styles and responsive rules
  components/               Reusable cards, headings, links, icons, illustration
  data/
    profile.js              Name, public GitHub, interests, optional contact
    skills.js               Languages grouped by category with local icons
    projects.js             Project entries and optional links/images
    education.js            Course names and institution
public/                     Local images and additional static HTML pages
scripts/check.mjs           Rendered-link and build checks
.github/workflows/          Pull request checks and manual Pages deployment
```

## Edit content

Change the dedicated data files rather than duplicating components. Text is rendered through React's normal escaping. Do not insert raw HTML or add `dangerouslySetInnerHTML`.

### Skills

Python, Bash, PowerShell, PHP, HTML and CSS are the languages supplied by Adam. They appear as local SVG icons with visible names, without proficiency ratings or invented descriptions. Add or remove items or groups in `src/data/skills.js`. The `icon` field selects a badge in `src/components/LanguageIcon.jsx`; unknown names use a generic code icon. No icon package or remote service is used. Empty groups, including the tools/platforms category, are hidden until entries are added.

### Projects

`src/data/projects.js` contains one **draft final-year project**, without a topic, technologies, outcomes or working links. It is a placeholder for future work, not a claim that a project is underway or complete. Add objects using the same fields:

- Unique `id`, `title`, short `description`, `category`, and `status`.
- `technologies`: an array of accurately confirmed names.
- `screenshot`: `null` or a local path such as `/projects/example.webp`; put the file in `public/projects/` and write meaningful `screenshotAlt` text.
- `repository`: `null` or a public HTTPS repository URL.
- `details`: `null`, a valid section anchor, or a local static HTML page such as `/projects/example.html`. Add that HTML file under `public/projects/`; include its own title, accessible markup and CSP. Do not add a client-side path that lacks a real file.
- `draft`: set to `false` when the published entry is ready.

Cards omit optional fields automatically. Compress screenshots before adding them; strip EXIF, names and sensitive network details. Confirm you have permission to publish any material.

### Education and contact

Education presents both course names together under Course, separated by `/`, as one academic journey rather than two qualifications. Campus, status and descriptions are omitted from the education data. Interest cards show their titles and icons without descriptions. No dates, grades, award levels or certifications are supplied. Update only with confirmed facts.

GitHub and Adam’s supplied public LinkedIn profile (`https://www.linkedin.com/in/adam-blunnie`) are enabled contact links. Email remains `null` and hidden until Adam adds it in future. A published email will be visible to everyone and may attract spam. No contact form is included.

## Content and final review

The supplied language names, LinkedIn URL and FYP setup (`id: "FYP"`, title “Final-year project”) are confirmed instructions. They do not require another content approval. Future project details can be added when work is ready to share.

- Add tools/platforms only when Adam supplies them.
- Add email only when Adam chooses to provide it; it is not required for publication.
- Review the course-renaming wording and student introduction for accuracy.

Do not insert dates, qualification levels, work history, certifications or achievements without Adam's confirmation.

## GitHub Pages deployment (only after explicit approval)

The site uses `/` as Vite's base because this repository is the user site `adamblunnie.github.io`, not a project hosted under a repository subpath. Section anchors work on refresh without a router or custom 404 fallback. There is no custom domain or cost requirement. GitHub's free public repository hosting and Pages are sufficient; no payment details or subscriptions are needed. GitHub's service limits still apply.

1. Review and approve the implementation and public content. Merge the PR only with Adam's approval.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**. Enable **Enforce HTTPS** when available. Do not configure branch-based publishing as an alternative to this workflow.
3. In **Settings → Environments → github-pages**, restrict deployments to `main`. Where available on the repository's plan, add required reviewers for an additional approval gate. The workflow itself also rejects other refs.
4. After explicit publishing approval, open **Actions → Deploy approved portfolio to Pages → Run workflow**, choose `main`, and tick the approval input. No push, merge or schedule automatically deploys.
5. The build job runs `npm ci`, the vulnerability audit, production build and link checks, then uploads only `dist/`. The deploy job uses GitHub's official Pages action with `pages: write` and `id-token: write` for OIDC. No personal access token or custom secret is needed.
6. Check the workflow result, visit the HTTPS URL, and inspect layout, navigation, browser console and CSP on the real host.

The PR workflow has read-only repository permission and never deploys. The manual deployment workflow grants read access to its build job and Pages/OIDC permissions only to the deployment job. Official actions are pinned to reviewed commit SHAs; keep these and the dependency lockfile maintained through future PRs. Checkout does not persist credentials.

## Security and privacy decisions

- Static files only: no backend, database, login, API calls, tracking, cookies, embedded widgets, service workers or account connections. GitHub and LinkedIn are linked, never embedded or queried. Visitors' browsers request only same-origin site assets until they follow a link.
- Restrictive HTML **Content Security Policy**: default deny; scripts, styles, images and fonts restricted to the same origin; connections, objects and forms blocked; base URI blocked; insecure requests upgraded. No inline scripts/styles, unsafe HTML, eval-based rendering or external CDN dependencies.
- GitHub Pages does **not** support repository-defined arbitrary response headers. HTML meta CSP cannot enforce `frame-ancestors`, CSP reporting, or a header-only sandbox. This site cannot configure response `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy` or HSTS. Unsupported directives are not presented as effective protection. Some headers may be supplied by GitHub itself; verify the live response after approved publication. Framing protection would require a host offering custom headers. No extra proxy or service is added.
- `no-referrer` prevents referrer disclosure through supported browsers. External links use HTTPS and `rel="noopener noreferrer"` and open in the same tab. Optional screenshot paths are local; project details use local file/section navigation. No secrets belong in public data files or `VITE_*` variables.
- Production source maps disabled. No `.env` files, dependency folders, build output, development logs or personal files are committed. Only compiled output is uploaded to Pages. Public source code remains public by design.
- Minimal exact dependencies and a committed npm lockfile. `npm ci` ensures lockfile consistency. `npm audit` runs on the full dependency tree locally and in workflows. Re-run before each release; findings change over time. Never use `npm audit fix --force` without reviewing the resulting changes.
- GitHub may retain ordinary hosting request logs under its own policies. Application-level tracking is absent; this does not make claims about the hosting platform's logging.

## Validation and remaining limits

See [VALIDATION.md](VALIDATION.md) for the implementation checks, results and outstanding browser/hosting verification. No claim of absolute security is made. Dependencies, build tooling and hosting remain supply-chain/platform risks. Keep Node, npm dependencies and pinned actions updated; review every new content/asset change for secrets and personal data. Public Git history can retain deleted material, so review before committing.

Before publication, manually check at 320px, 375px, 768px and 1440px widths, zoom to 200%, tab through every link, activate the skip link, try a screen reader, enable reduced motion, inspect console/CSP and confirm no third-party network requests. Content security and responsive CSS inspection do not replace those browser checks.

## Move to another static host

Build and upload `dist/` to any static HTTPS host. No GitHub API or Pages-specific runtime is used. Keep the base `/` for root hosting; change `base` and root-relative asset/content links if moving beneath a subpath. A host that supports response headers can enforce the CSP as a header and add `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff` and an appropriate `Permissions-Policy`.
