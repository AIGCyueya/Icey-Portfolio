import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import AnimateIn from './AnimateIn';
import CountUp from './CountUp';
import '../css/creator.css';

function MetricGrid({ metrics, compact = false }) {
  if (!metrics?.length) return null;

  return (
    <div className={`lab-metrics${compact ? ' lab-metrics--compact' : ''}`}>
      {metrics.map((metric, index) => (
        <div
          key={`${metric.label}-${metric.value}`}
          className="lab-metric"
          style={{ '--metric-delay': `${index * 50}ms` }}
        >
          <CountUp value={metric.value} className="lab-metric__value" />
          <span className="lab-metric__label">{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

MetricGrid.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  compact: PropTypes.bool,
};

function TagList({ tags }) {
  if (!tags?.length) return null;

  return (
    <div className="lab-tags">
      {tags.map((tag) => (
        <span key={tag} className="lab-tag">{tag}</span>
      ))}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

function Insight({ text }) {
  if (!text) return null;

  return (
    <div className="lab-insight">
      <span className="lab-insight__label">观察</span>
      <p>{text}</p>
    </div>
  );
}

Insight.propTypes = {
  text: PropTypes.string,
};

function LeadBlock({ lead }) {
  const paragraphs = Array.isArray(lead) ? lead : lead ? [lead] : [];
  if (!paragraphs.length) return null;

  return (
    <div className="lab-lead">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

LeadBlock.propTypes = {
  lead: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

function Gallery({ images, imageFit, singleClassExtra = '', href = '' }) {
  if (!images?.length) return null;

  return (
    <div
      className={[
        'lab-gallery',
        images.length === 1 ? 'lab-gallery--single' : '',
        imageFit === 'contain' ? 'lab-gallery--contain' : '',
        href ? 'lab-gallery--linked' : '',
        singleClassExtra,
      ].filter(Boolean).join(' ')}
    >
      {images.map((img) => {
        const figure = (
          <figure className="lab-gallery__item">
            <img src={img.src} alt={img.alt || ''} loading="lazy" />
            {href ? (
              <span className="lab-gallery__hint">点击查看全部</span>
            ) : null}
          </figure>
        );

        if (!href) {
          return (
            <React.Fragment key={img.src}>
              {figure}
            </React.Fragment>
          );
        }

        return (
          <a
            key={img.src}
            className="lab-gallery__link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {figure}
          </a>
        );
      })}
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
  imageFit: PropTypes.string,
  singleClassExtra: PropTypes.string,
  href: PropTypes.string,
};

function PlatformCard({ platform }) {
  const gallery = platform.images?.length
    ? platform.images
    : platform.image
      ? [{ src: platform.image, alt: platform.imageAlt || platform.name }]
      : [];

  return (
    <article className="tile lab-platform">
      <header className="lab-platform__header">
        <div>
          {platform.badge && (
            <span className="lab-platform__badge">{platform.badge}</span>
          )}
          <h3 className="lab-platform__name">{platform.name}</h3>
        </div>
      </header>

      {platform.note && (
        <p className="lab-platform__note">{platform.note}</p>
      )}

      <MetricGrid metrics={platform.metrics} />
      <Insight text={platform.insight} />
      <Gallery images={gallery} imageFit={platform.imageFit} />
    </article>
  );
}

PlatformCard.propTypes = {
  platform: PropTypes.shape({
    name: PropTypes.string.isRequired,
    badge: PropTypes.string,
    note: PropTypes.string,
    insight: PropTypes.string,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    imageFit: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })),
    metrics: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

function Creator(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.creator, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header
        title={header}
        lead="AI 创作、社区与产品实践留下的实验记录。"
        hint="向下进入实验记录"
        anchor="#page-content"
      />
      {data ? (
        <div id="page-content" className="section-content-container">
          {data.hero && (
            <AnimateIn variant="fade-up">
              <div className="lab-hero">
                <div className="lab-hero__copy">
                  <p className="lab-hero__subtitle">{data.hero.subtitle}</p>
                  {data.hero.lead && (
                    <p className="lab-hero__lead">{data.hero.lead}</p>
                  )}
                  {data.hero.tagline && (
                    <p className="lab-hero__tagline">{data.hero.tagline}</p>
                  )}
                  <a className="page-header__scroll lab-hero__scroll" href="#lab-sections">
                    <span className="page-header__scroll-text">
                      向下查看实验分区
                    </span>
                    <span className="page-header__scroll-chevron" aria-hidden="true" />
                  </a>
                </div>
                {data.hero.visual && (
                  <figure className="lab-hero__visual">
                    <img
                      src={data.hero.visual}
                      alt={data.hero.visualAlt || 'AI Lab'}
                      loading="lazy"
                    />
                  </figure>
                )}
              </div>
            </AnimateIn>
          )}

          {data.arcLine?.length > 0 && (
            <AnimateIn variant="fade-up" delay={60}>
              <div className="lab-arc">
                {data.arcLine.map((step, index) => (
                  <React.Fragment key={step.key}>
                    <div className="lab-arc__step">
                      <span className="lab-arc__label-en">{step.label}</span>
                      <span className="lab-arc__label-zh">{step.labelZh}</span>
                    </div>
                    {index < data.arcLine.length - 1 && (
                      <span className="lab-arc__arrow" aria-hidden="true">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </AnimateIn>
          )}

          <div id="lab-sections" className="lab-sections">
            {data.sections?.map((section, sectionIndex) => (
              <AnimateIn
                key={section.id}
                variant="fade-up"
                delay={sectionIndex * 60}
              >
                <section className="lab-section" id={`lab-${section.id}`}>
                  <header className="lab-section__header">
                    <h2 className="lab-section__title">{section.title}</h2>
                    {section.subtitle && (
                      <p className="lab-section__subtitle">{section.subtitle}</p>
                    )}
                    <LeadBlock lead={section.lead} />
                    {section.note && (
                      <p className="lab-section__note">{section.note}</p>
                    )}
                  </header>

                  <TagList tags={section.tags} />
                  <Insight text={section.insight} />

                  {section.platforms?.length > 0 && (
                    <div className="lab-platforms">
                      {section.platforms.map((platform) => (
                        <PlatformCard key={platform.name} platform={platform} />
                      ))}
                    </div>
                  )}

                  {section.items?.map((item) => (
                    <article key={item.name} className="tile lab-community">
                      <div className="lab-community__meta">
                        {item.period && (
                          <span className="lab-community__period">{item.period}</span>
                        )}
                        {item.type && (
                          <span className="lab-community__type">{item.type}</span>
                        )}
                      </div>
                      <h3 className="lab-community__name">{item.name}</h3>
                      {item.desc && (
                        <p className="lab-community__desc">{item.desc}</p>
                      )}
                      <TagList tags={item.roles} />
                      <Insight text={item.insight} />
                      <Gallery
                        images={item.images}
                        imageFit="contain"
                      />
                      <MetricGrid metrics={item.metrics} compact />
                    </article>
                  ))}

                  {section.scenes?.length > 0 && !section.items && (
                    <div className="lab-scene-row">
                      {section.scenes.map((scene) => (
                        <div key={scene} className="lab-scene lab-scene--compact">
                          <span className="lab-scene__caption">{scene}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.metrics?.length > 0 && !section.practices && (
                    <MetricGrid metrics={section.metrics} compact />
                  )}

                  {section.images?.length > 0 && !section.items && (
                    <div className="lab-portfolio-entry">
                      <Gallery
                        images={section.images}
                        imageFit={section.imageFit}
                        singleClassExtra="lab-gallery--section"
                        href={section.link?.href || ''}
                      />
                      {section.link?.href && (
                        <a
                          className="lab-portfolio-entry__cta"
                          href={section.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {section.link.label || '查看完整作品集'}
                          <span aria-hidden="true"> →</span>
                        </a>
                      )}
                    </div>
                  )}

                  {section.metrics?.length > 0 && section.practices && (
                    <MetricGrid metrics={section.metrics} compact />
                  )}

                  {section.practices?.length > 0 && (
                    <div className="creator-practices">
                      {section.practices.map((item) => (
                        <div key={item.tool} className="tile creator-practice">
                          <div className="creator-practice__header">
                            <div>
                              <span className="creator-practice__focus">{item.focus}</span>
                              <h3 className="creator-practice__tool">{item.tool}</h3>
                              <span className="creator-practice__period">{item.period}</span>
                            </div>
                          </div>
                          <p className="creator-practice__desc">{item.desc}</p>
                          <Insight text={item.insight || item.productValue} />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </AnimateIn>
            ))}
          </div>
        </div>
      ) : <FallbackSpinner />}
    </>
  );
}

Creator.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Creator;
