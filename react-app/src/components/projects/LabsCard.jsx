import { Link } from 'react-router-dom';
import { isPendingShot } from '../../lib/projects.js';

const ctaFor = (project) => {
  if (project.live) return 'Try it now';
  if (project.href) return 'View the code';
  return 'Learn more';
};

const LabsCard = ({ project, tabbable = true }) => (
  <article className="labs-card">
    <div className="labs-shot">
      {isPendingShot(project) ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <img src={project.logo} alt="" aria-hidden="true" className="w-8 h-8 object-contain opacity-50" />
          <span className="text-[11px] tracking-wide" style={{ color: 'var(--labs-ink-soft)' }}>
            screenshot pending
          </span>
        </div>
      ) : (
        <img
          src={project.texture}
          alt={`${project.title} interface`}
          loading="lazy"
          draggable="false"
          className="w-full h-full object-cover"
        />
      )}
    </div>

    <h3 className="labs-title">
      {/* The stretched pseudo-element makes the whole card the hit area while
          keeping a real anchor, so middle-click, right-click and Tab all work. */}
      <Link
        to={`/projects/${project.slug}`}
        tabIndex={tabbable ? 0 : -1}
        className="labs-hit"
        draggable="false"
      >
        {project.title}
      </Link>
    </h3>

    <p className="labs-body line-clamp-3">{project.desc}</p>

    <p className="labs-cta">
      {ctaFor(project)} <span aria-hidden="true">→</span>
    </p>
  </article>
);

export default LabsCard;
