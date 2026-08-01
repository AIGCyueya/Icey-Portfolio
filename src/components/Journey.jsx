import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import AnimateIn from './AnimateIn';
import CountUp from './CountUp';
import useInView from '../hooks/useInView';
import '../css/journey.css';

function JourneyItem({ entry, index, getArcLabel }) {
  const [ref, inView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -5% 0px' });
  const stagger = index * 100;

  return (
    <article
      ref={ref}
      className={`journey-item${inView ? ' journey-item--visible' : ''}`}
      style={{ '--stagger-delay': `${stagger}ms` }}
    >
      <div className="journey-item__year">{entry.year}</div>
      <div className="journey-item__rail">
        <div className="journey-item__node" />
      </div>
      <div className="journey-item__card tile">
        {entry.arc && (
          <span className="journey-item__arc">{getArcLabel(entry.arc)}</span>
        )}
        <div className="journey-item__phase">{entry.phase}</div>
        {entry.organization && (
          <h3 className="journey-item__org">{entry.organization}</h3>
        )}
        {entry.detail && (
          <p className="journey-item__detail">{entry.detail}</p>
        )}
        {entry.insight && (
          <p className="journey-item__insight">{entry.insight}</p>
        )}
        {entry.description && (
          <p className="journey-item__desc">{entry.description}</p>
        )}
        {entry.keywords?.length > 0 && (
          <div className="journey-item__keywords">
            {entry.keywords.map((kw) => (
              <span key={kw} className="journey-keyword">{kw}</span>
            ))}
          </div>
        )}
        {entry.metrics?.length > 0 && (
          <div className="journey-metrics">
            {entry.metrics.map((metric, mIndex) => (
              <div
                key={metric.label}
                className="journey-metric"
                style={{ '--metric-delay': `${mIndex * 80}ms` }}
              >
                <CountUp value={metric.value} className="journey-metric__value" />
                <span className="journey-metric__label">{metric.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

JourneyItem.propTypes = {
  entry: PropTypes.shape({
    year: PropTypes.string.isRequired,
    arc: PropTypes.string,
    phase: PropTypes.string.isRequired,
    organization: PropTypes.string,
    detail: PropTypes.string,
    insight: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    metrics: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })),
  }).isRequired,
  index: PropTypes.number.isRequired,
  getArcLabel: PropTypes.func.isRequired,
};

function Journey(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.journey, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const getArcLabel = (arcKey) => {
    const found = data?.arcLine?.find((a) => a.key === arcKey);
    return found ? `${found.label} · ${found.labelZh}` : arcKey;
  };

  return (
    <>
      <Header
        title={header}
        lead="从设计到 AI 产品与生态——这条路是怎么走过来的。"
        hint="向下查看成长路径"
        anchor="#page-content"
      />
      {data ? (
        <div id="page-content" className="section-content-container">
          {data.intro ? (
            <AnimateIn variant="fade-up">
              <p className="journey-intro">{data.intro}</p>
            </AnimateIn>
          ) : null}

          {data.arcLine && (
            <AnimateIn variant="fade-up" delay={80}>
              <div className="journey-arc">
                {data.arcLine.map((step, index) => (
                  <React.Fragment key={step.key}>
                    <div className="journey-arc__step">
                      <span className="journey-arc__label-en">{step.label}</span>
                      <span className="journey-arc__label-zh">{step.labelZh}</span>
                    </div>
                    {index < data.arcLine.length - 1 && (
                      <span className="journey-arc__arrow" aria-hidden="true">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </AnimateIn>
          )}

          <div className="journey-timeline">
            {data.entries.map((entry, index) => (
              <JourneyItem
                key={entry.year + entry.phase}
                entry={entry}
                index={index}
                getArcLabel={getArcLabel}
              />
            ))}
          </div>
        </div>
      ) : <FallbackSpinner />}
    </>
  );
}

Journey.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Journey;
