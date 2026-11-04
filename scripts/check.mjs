import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import { skillGroups } from "../src/data/skills.js";

// Render the actual component tree without starting a listening web server.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
});
let markup;
try {
  const developmentHtml = await server.transformIndexHtml("/", await readFile("index.html", "utf8"));
  assert(!developmentHtml.includes('http-equiv="Content-Security-Policy"'), "Development response must permit Vite styles and HMR");
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  markup = renderToStaticMarkup(App());
} finally {
  await server.close();
}
const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "Element IDs must be unique");
assert.equal(
  (markup.match(/<h1\b/g) || []).length,
  1,
  "Exactly one main heading",
);
for (const [, href] of markup.matchAll(/href="([^"]+)"/g)) {
  if (href.startsWith("#"))
    assert(ids.includes(href.slice(1)), `Broken section link: ${href}`);
  else if (href.startsWith("/"))
    await stat(path.join("dist", href.split("#")[0]));
  else
    assert(/^(https:|mailto:)/.test(href), `Unexpected link scheme: ${href}`);
}
assert(!markup.includes('href="#"'), "No empty placeholder links");
assert(markup.includes("Skip to content"), "Skip link is present");
if (skillGroups.some((group) => group.skills.some((skill) => !skill.approved))) {
  assert(markup.includes("Sample · unconfirmed"), "Unconfirmed skills must be labelled");
}
for (const image of markup.matchAll(/<img\b[^>]*>/g)) {
  assert(/\balt="[^"]*"/.test(image[0]), "Images need alt attributes");
}
const html = await readFile("dist/index.html", "utf8");
assert(html.includes('lang="en"'));
assert(
  html.includes("connect-src 'none'"),
  "Production CSP blocks runtime connections",
);
assert(!/<script[^>]*>\s*[^<\s]/.test(html), "No inline scripts");
for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  await stat(path.join("dist", asset));
}
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
const output = await files("dist");
assert(
  !output.some((file) => file.endsWith(".map")),
  "No production source maps",
);
assert(
  !output.some((file) => /(?:\.env|package(?:-lock)?\.json)$/.test(file)),
  "No source metadata in output",
);
console.log(
  `Passed: rendered section links, unique IDs, heading, skip link, placeholders, image alt attributes, CSP, local build assets and no source maps (${output.length} output files).`,
);
console.log(
  "Browser layout, interaction, colour contrast and assistive technology checks require a browser/manual review.",
);
