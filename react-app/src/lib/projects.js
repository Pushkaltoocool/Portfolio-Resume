import { myProjects } from '../constants/index.js';

// Dev guard: slugs are permanent public URLs. A missing or duplicated one is a
// silent 404 generator, so fail loudly at import time instead.
if (import.meta.env?.DEV) {
  const seen = new Set();
  myProjects.forEach((p) => {
    if (!p.slug) throw new Error(`Project "${p.title}" is missing a slug`);
    if (seen.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
    seen.add(p.slug);
  });
}

// The raw `tags[].name` strings are not filter-ready: 30 distinct strings across
// 36 tags, only 3 of which repeat. "AI / Machine Learning", "Machine Learning / AI",
// "Multi-Agent AI" and "Agentic AI" are four spellings of overlapping ideas.
// This collapses them into facets that actually group.
const TAG_ALIASES = {
  'ai / machine learning': 'ai/ml',
  'machine learning / ai': 'ai/ml',
  'multi-agent ai': 'ai/ml',
  'agentic ai': 'ai/ml',
  'scikit-learn / ml': 'ai/ml',
  gemini: 'ai/ml',
  'vertex ai rag': 'ai/ml',

  'huawei cloud': 'cloud',
  'google cloud run': 'cloud',
  'cloud infrastructure': 'cloud',
  'microsoft azure': 'cloud',
  'azure translator': 'cloud',
  docker: 'cloud',
  'ci/cd & deployment': 'cloud',

  flask: 'web',
  'web development': 'web',
  'web development (html/css/js)': 'web',
  html: 'web',
  css: 'web',
  javascript: 'web',
  'socket.io / webrtc': 'web',
  'telegram api integration': 'web',
  'mobile digital twin': 'web',
};

export const facetsFor = (project) => {
  const facets = new Set();
  project.tags.forEach((t) => {
    const facet = TAG_ALIASES[t.name.toLowerCase()];
    if (facet) facets.add(facet);
  });
  return [...facets];
};

/** Newest first. Projects with no recorded date sort last. */
export const projectsByRecency = [...myProjects].sort((a, b) => {
  if (!a.sortKey && !b.sortKey) return 0;
  if (!a.sortKey) return 1;
  if (!b.sortKey) return -1;
  return b.sortKey.localeCompare(a.sortKey);
});

/** True when the only screenshot we have is a generated placeholder. */
export const isPendingShot = (project) => project.texture.includes('/placeholders/');

export const getProjectBySlug = (slug) => myProjects.find((p) => p.slug === slug);

/** Neighbours for the prev/next links on a detail page. Wraps around. */
export const projectNeighbours = (slug) => {
  const list = projectsByRecency;
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
};
