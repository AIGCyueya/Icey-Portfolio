import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountUp from '../CountUp';

const SECTION_ORDER = [
  { key: 'background', label: '项目背景' },
  { key: 'role', label: '我的角色' },
  { key: 'impact', label: '项目成果' },
];

const PREVIEW_KEYS = ['background', 'impact'];

function ProjectCard({ project, featured = false }) {
  const { caseStudy } = project;
  const isSupplementary = project.priority === 'supplementary';
  const [expanded, setExpanded] = useState(featured);

  const previewText = PREVIEW_KEYS
    .map((key) => caseStudy?.[key])
    .filter(Boolean)
    .join(' ')
    .slice(0, 160);

  return (
    <article
      className={`tile project-card ${
        featured ? 'project-card--featured' : ''
      } ${isSupplementary ? 'project-card--supplementary' : ''
      } ${expanded ? 'project-card--expanded' : 'project-card--collapsed'}`}
    >
      {isSupplementary && (
        <span className="project-card__badge">补充案例</span>
      )}

      <header className="project-card__header">
        <div>
          <h3 className="project-card__title">{project.title}</h3>
          {project.subtitle && (
            <p className="project-card__subtitle">{project.subtitle}</p>
          )}
        </div>

        {(project.roleLabel || project.focus) && (
          <div className="project-card__meta">
            {project.roleLabel && (
              <div className="project-card__meta-item">
                <span className="project-card__meta-key">Role</span>
                <span className="project-card__meta-val project-card__meta-val--role">
                  {project.roleLabel}
                </span>
              </div>
            )}
            {project.focus && (
              <div className="project-card__meta-item">
                <span className="project-card__meta-key">Focus</span>
                <span className="project-card__meta-val">{project.focus}</span>
              </div>
            )}
          </div>
        )}

        {project?.tags?.length > 0 && (
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        )}
      </header>

      {!expanded && previewText && (
        <p className="project-card__preview">
          {previewText}
          …
        </p>
      )}

      {caseStudy && (
        <>
          <button
            type="button"
            className="case-study__toggle"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            <span>{expanded ? '收起 Case Study' : '展开 Case Study'}</span>
            <span className={`case-study__toggle-icon${expanded ? ' case-study__toggle-icon--open' : ''}`}>
              ▾
            </span>
          </button>

          <div className={`case-study${expanded ? '' : ' case-study--collapsed'}`}>
            <div className="case-study__body">
              {SECTION_ORDER.map(({ key, label }) => (
                caseStudy[key] ? (
                  <div
                    key={key}
                    className={`case-study__section ${
                      key === 'impact' ? 'case-study__section--impact' : ''
                    } ${key === 'role' ? 'case-study__section--role' : ''}`}
                  >
                    <span className="case-study__label">{label}</span>
                    <p className="case-study__text">{caseStudy[key]}</p>
                  </div>
                ) : null
              ))}

              {caseStudy.metrics?.length > 0 && (
                <div className="case-study__metrics">
                  <span className="case-study__label">关键指标解读</span>
                  <div className="case-study__metrics-grid">
                    {caseStudy.metrics.map((metric) => (
                      <div key={metric.label} className="case-study__metric">
                        <CountUp value={metric.value} className="case-study__metric-value" />
                        <span className="case-study__metric-label">{metric.label}</span>
                        <p className="case-study__metric-explain">{metric.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  );
}

ProjectCard.propTypes = {
  featured: PropTypes.bool,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    priority: PropTypes.string,
    roleLabel: PropTypes.string,
    focus: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    caseStudy: PropTypes.shape({
      background: PropTypes.string,
      role: PropTypes.string,
      impact: PropTypes.string,
      metrics: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        explanation: PropTypes.string.isRequired,
      })),
    }),
  }).isRequired,
};

export default ProjectCard;
