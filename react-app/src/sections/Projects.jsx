import { useEffect, useMemo, useState } from 'react';

import LabsCarousel from '../components/projects/LabsCarousel.jsx';
import LabsCard from '../components/projects/LabsCard.jsx';
import { facetsFor, isPendingShot, projectsByRecency } from '../lib/projects.js';

// Facets are derived from the real tags, after normalising them. The raw tags
// are unusable as filters on their own: 30 distinct strings across 36 tags, and
// only 3 of them repeat.
const FILTERS = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'ai/ml', label: 'AI & agents', match: (p) => facetsFor(p).includes('ai/ml') },
  { id: 'cloud', label: 'Cloud', match: (p) => facetsFor(p).includes('cloud') },
  { id: 'web', label: 'Web apps', match: (p) => facetsFor(p).includes('web') },
];

/**
 * The whole project set, on the home page. Replaces the old one-at-a-time
 * carousel: five cards are visible at once and the row wraps, so nothing is
 * more than a couple of steps away. Each card links to its own /projects/:slug
 * page for the full write-up.
 */
const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(0);

  const visible = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter) ?? FILTERS[0];
    return projectsByRecency.filter(f.match);
  }, [filter]);

  // Centre a card that has a real screenshot rather than a pending tile.
  useEffect(() => {
    const i = visible.findIndex((p) => !isPendingShot(p));
    setActive(i === -1 ? 0 : i);
  }, [visible]);

  return (
    <section className="labs my-24" id="projects" data-aos="fade-up">
      <div className="c-space text-center max-w-2xl mx-auto">
        <p className="head-text">Selected Work</p>
        <p className="mt-4 text-white-600 text-lg">
          Practice makes perfect, as long as every rep is harder than the last.
        </p>
      </div>

      <div className="mt-14">
        <LabsCarousel
          label="Projects"
          items={visible}
          active={active}
          onActiveChange={setActive}
          renderItem={(project, { tabbable }) => <LabsCard project={project} tabbable={tabbable} />}
        />
      </div>

      <div className="flex items-center justify-center gap-3 mt-10">
        <button
          type="button"
          className="labs-nav"
          onClick={() => setActive((i) => (i - 1 + visible.length) % visible.length)}
          aria-label="Previous project"
        >
          ‹
        </button>
        <button
          type="button"
          className="labs-nav"
          onClick={() => setActive((i) => (i + 1) % visible.length)}
          aria-label="Next project"
        >
          ›
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible[active]?.title}, {active + 1} of {visible.length}.
      </p>

      <nav aria-label="Filter projects" className="c-space mt-10 flex flex-wrap justify-center gap-3">
        {FILTERS.map((f) => {
          if (projectsByRecency.filter(f.match).length === 0) return null;
          return (
            <button
              key={f.id}
              type="button"
              className="labs-pill"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          );
        })}
      </nav>
    </section>
  );
};

export default Projects;
