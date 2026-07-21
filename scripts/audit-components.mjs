import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const registryPath = join(root, "src/lib/component-registry.ts");
const explorerPath = join(root, "src/components/docs/component-explorer-page.tsx");
const indexPath = join(root, "src/components/ui/index.ts");
const uiDirectory = join(root, "src/components/ui");
const routeDirectory = join(root, "src/app/docs/components");

const registrySource = readFileSync(registryPath, "utf8");
const explorerSource = readFileSync(explorerPath, "utf8");
const indexSource = readFileSync(indexPath, "utf8");
const failures = [];

const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const components = [...registrySource.matchAll(/\{ name: "([^"]+)", slug: "([^"]+)", description: "([^"]+)", category: "([^"]+)" \}/g)]
  .map(([, name, slug, description, category]) => ({ name, slug, description, category }));

assert(components.length === 55, `Expected 55 registered components, found ${components.length}.`);
assert(new Set(components.map(({ slug }) => slug)).size === components.length, "Component slugs must be unique.");

const routeSlugs = readdirSync(routeDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const component of components) {
  const sourcePath = join(uiDirectory, `${component.slug}.tsx`);
  const routePath = join(routeDirectory, component.slug, "page.tsx");

  assert(existsSync(sourcePath), `${component.slug}: missing UI source file.`);
  assert(existsSync(routePath), `${component.slug}: missing documentation route.`);
  assert(indexSource.includes(`from "./${component.slug}"`), `${component.slug}: missing public index export.`);

  const demoPattern = new RegExp(`(?:^|\\n)\\s{4}(?:"${component.slug}"|${component.slug}): \\{`);
  assert(demoPattern.test(explorerSource), `${component.slug}: missing live explorer demo.`);

  if (existsSync(routePath)) {
    const routeSource = readFileSync(routePath, "utf8");
    assert(routeSource.includes(`component="${component.slug}"`), `${component.slug}: route points to the wrong explorer key.`);
  }

  if (existsSync(sourcePath)) {
    const source = readFileSync(sourcePath, "utf8");
    assert(/export\s+(?:\{|type|interface|const|function|class)/.test(source), `${component.slug}: source exposes no public API.`);
    assert(!/rounded-(?:sm|md|lg|xl|2xl)|(?:bg|text)-gray-\d+|bg-white/.test(source), `${component.slug}: contains a legacy non-tokenized utility.`);
    assert(!/border-(?:t|r|b|l|x|y)-4|border-6/.test(source), `${component.slug}: contains an oversized structural border.`);
  }
}

for (const slug of routeSlugs) {
  assert(components.some((component) => component.slug === slug), `${slug}: documentation route is not registered.`);
}

if (failures.length > 0) {
  console.error(`Component contract audit failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const categoryCount = new Set(components.map(({ category }) => category)).size;
console.log(`Component contract audit passed: ${components.length} components, ${routeSlugs.length} routes, ${categoryCount} categories.`);
