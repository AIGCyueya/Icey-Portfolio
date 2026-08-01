import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import AnimateIn from './AnimateIn';
import CountUp from './CountUp';
import useInView from '../hooks/useInView';
import '../css/home.css';

function HomeJourneyTimeline({ journeyBrief }) {
  const [ref, inView] = useInView({ threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  const nodes = journeyBrief?.nodes || [];

  return (
    <section className="home-block home-block--timeline">
      <div className="home-block__header">
        <div>
          <span className="home-block__step">02</span>
          <span className="tile-label">{journeyBrief.title}</span>
        </div>
        <Link className="btn-pill btn-ghost" to={journeyBrief.href || '/journey'}>
          {journeyBrief.cta || '查看完整成长路径'}
        </Link>
      </div>

      <div
        ref={ref}
        className={`home-timeline${inView ? ' home-timeline--visible' : ''}`}
      >
        <div className="home-timeline__track" aria-hidden="true">
          <span className="home-timeline__rail" />
          <span className="home-timeline__progress" />
        </div>

        <ol className="home-timeline__list">
          {nodes.map((node, index) => (
            <li
              key={node.year + node.title}
              className="home-timeline__node"
              style={{ '--node-delay': `${index * 110}ms` }}
            >
              <span className="home-timeline__dot" aria-hidden="true" />
              <span className="home-timeline__year">{node.year}</span>
              <h3 className="home-timeline__title">{node.title}</h3>
              <p className="home-timeline__line">{node.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const subtitleLines = Array.isArray(data?.subtitle)
    ? data.subtitle
    : data?.subtitle
      ? [data.subtitle]
      : [];

  const bridgeMetrics = data?.impact?.metrics?.slice(0, 3) || [];

  return data ? (
    <div className="home-fade-container home-shell">
      <div className="home-atmosphere" aria-hidden="true">
        <span className="home-atmosphere__grid" />
        <span className="home-atmosphere__orb home-atmosphere__orb--a" />
        <span className="home-atmosphere__orb home-atmosphere__orb--b" />
        <span className="home-atmosphere__scan" />
        <div className="home-waves">
          <svg className="home-waves__svg" viewBox="0 0 1440 220" preserveAspectRatio="none">
            <path
              className="home-waves__path home-waves__path--a"
              d="M0,120 C240,180 480,40 720,110 C960,180 1200,60 1440,120 L1440,220 L0,220 Z"
            />
            <path
              className="home-waves__path home-waves__path--b"
              d="M0,140 C260,80 520,190 780,130 C1040,70 1240,170 1440,120 L1440,220 L0,220 Z"
            />
            <path
              className="home-waves__path home-waves__path--c"
              d="M0,160 C220,200 500,100 760,150 C1020,200 1260,110 1440,150 L1440,220 L0,220 Z"
            />
          </svg>
        </div>
      </div>

      <section className="hero">
        <div className="hero-bg-text" aria-hidden="true">
          LONG YUJIE
        </div>

        <div className="hero-layout hero-layout--split">
          <div className="hero-content">
            <span className="hero-eyebrow hero-animate" style={{ '--hero-delay': '0ms' }}>
              {data.signal || 'AI BUILDER · PRODUCT · ECOSYSTEM'}
            </span>

            <div className="hero-identity hero-animate" style={{ '--hero-delay': '60ms' }}>
              <h1 className="hero-name">{data?.name}</h1>
              {data?.nameZh && (
                <p className="hero-name-zh">{data.nameZh}</p>
              )}
            </div>

            {data?.roleLine && (
              <p className="hero-role-line hero-animate" style={{ '--hero-delay': '120ms' }}>
                {data.roleLine}
              </p>
            )}

            {subtitleLines.length > 0 && (
              <div className="hero-subtitle hero-animate" style={{ '--hero-delay': '180ms' }}>
                {subtitleLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}

            {data?.strengths?.items?.length > 0 && (
              <div className="hero-signal-row hero-animate" style={{ '--hero-delay': '240ms' }}>
                {data.strengths.items.map((item) => (
                  <a key={item.index} className="hero-signal" href="#home-strengths">
                    <span className="hero-signal__index">{item.index}</span>
                    <span className="hero-signal__text">{item.title}</span>
                  </a>
                ))}
              </div>
            )}

            <div className="hero-cta hero-animate" style={{ '--hero-delay': '300ms' }}>
              <Link className="btn-pill btn-accent btn-cta" to="/projects">
                <span>查看项目</span>
              </Link>
              <Link className="btn-pill btn-ghost btn-cta" to="/lab">
                <span>AI Lab</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual hero-animate" style={{ '--hero-delay': '180ms' }}>
            {data?.portrait?.src && (
              <div className="hero-portrait-wrap">
                <span className="hero-portrait__ring hero-portrait__ring--a" aria-hidden="true" />
                <span className="hero-portrait__ring hero-portrait__ring--b" aria-hidden="true" />
                <span className="hero-portrait__ring hero-portrait__ring--c" aria-hidden="true" />
                <figure className="hero-portrait">
                  <img
                    src={data.portrait.src}
                    alt={data.portrait.alt || data.name}
                    loading="eager"
                  />
                </figure>
              </div>
            )}

            {data?.workspace && (
              <aside
                className="hero-workspace"
                aria-label={data.workspace.title}
              >
                <div className="hero-workspace__scan" aria-hidden="true" />
                <div className="hero-workspace__header">
                  <span className="hero-workspace__eyebrow">AI Lab Preview</span>
                  <h2 className="hero-workspace__title">{data.workspace.title}</h2>
                  {data.workspace.subtitle && (
                    <p className="hero-workspace__subtitle">{data.workspace.subtitle}</p>
                  )}
                </div>
                <div className="hero-workspace__groups">
                  {data.workspace.groups?.map((group, groupIndex) => (
                    <div
                      key={group.label}
                      className="hero-workspace__group"
                      style={{ '--group-delay': `${groupIndex * 90}ms` }}
                    >
                      <span className="hero-workspace__label">{group.label}</span>
                      <div className="hero-workspace__items">
                        {group.items?.map((item) => (
                          <span key={item} className="hero-workspace__item">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>

        {(bridgeMetrics.length > 0 || data.bridge) && (
          <div className="hero-bridge hero-animate" style={{ '--hero-delay': '380ms' }}>
            <div className="hero-bridge__metrics">
              {bridgeMetrics.map((metric) => (
                <div key={metric.label} className="hero-bridge__metric">
                  <CountUp value={metric.value} className="hero-bridge__value" />
                  <span className="hero-bridge__label">{metric.label}</span>
                </div>
              ))}
            </div>
            <a className="hero-scroll" href="#page-content">
              <span className="hero-scroll__text">
                {data.bridge?.label || '向下继续'}
              </span>
              <span className="hero-scroll__hint">
                {data.bridge?.hint || '优势 · 路径 · 影响力'}
              </span>
              <span className="hero-scroll__chevron" aria-hidden="true" />
            </a>
          </div>
        )}
      </section>

      <div id="page-content" className="section-content-container home-sections">
        <div className="home-flow" aria-hidden="true">
          <span className="home-flow__spine" />
        </div>

        {data?.strengths && (
          <AnimateIn variant="fade-up">
            <section className="home-block" id="home-strengths">
              <div className="home-block__header">
                <div>
                  <span className="home-block__step">01</span>
                  <span className="tile-label">{data.strengths.title}</span>
                </div>
                <p className="home-block__link-note">从 Hero 的三个方向展开</p>
              </div>
              <div className="home-strengths">
                {data.strengths.items?.map((item, index) => (
                  <article
                    key={item.index}
                    className="tile home-strength"
                    style={{ '--card-delay': `${index * 90}ms` }}
                  >
                    <span className="home-strength__index">{item.index}</span>
                    <h3 className="home-strength__title">
                      {item.title}
                      <span className="home-strength__title-en">{item.titleEn}</span>
                    </h3>
                    <p className="home-strength__desc">{item.desc}</p>
                  </article>
                ))}
              </div>
            </section>
          </AnimateIn>
        )}

        <div className="home-connector" aria-hidden="true">
          <span />
          优势如何长成路径
          <span />
        </div>

        {data?.journeyBrief && (
          <HomeJourneyTimeline journeyBrief={data.journeyBrief} />
        )}

        <div className="home-connector" aria-hidden="true">
          <span />
          路径沉淀出的结果
          <span />
        </div>

        {data?.impact && (
          <AnimateIn variant="fade-up" delay={40}>
            <section className="home-block" id="home-impact">
              <div className="home-block__header">
                <div>
                  <span className="home-block__step">03</span>
                  <span className="tile-label">{data.impact.title}</span>
                </div>
              </div>
              <div className="home-impact">
                {data.impact.metrics?.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="tile home-impact__metric"
                    style={{ '--card-delay': `${index * 70}ms` }}
                  >
                    <CountUp value={metric.value} className="home-impact__value" />
                    <span className="home-impact__label">{metric.label}</span>
                  </div>
                ))}
              </div>
              {data.impact.links?.length > 0 && (
                <div className="home-impact__links">
                  {data.impact.links.map((link) => (
                    <Link
                      key={link.href + link.label}
                      className="btn-pill btn-ghost"
                      to={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </AnimateIn>
        )}

        <div className="home-connector" aria-hidden="true">
          <span />
          想深入了解，从这里进入
          <span />
        </div>

        {data?.entries && (
          <AnimateIn variant="fade-up" delay={60}>
            <section className="home-block">
              <div className="home-block__header">
                <div>
                  <span className="home-block__step">04</span>
                  <span className="tile-label">{data.entries.title}</span>
                </div>
              </div>
              <div className="home-entries">
                {data.entries.items?.map((entry, index) => (
                  <Link
                    key={entry.title}
                    className="tile tile--interactive home-entry"
                    to={entry.href || '/projects'}
                    style={{ '--card-delay': `${index * 80}ms` }}
                  >
                    <h3 className="home-entry__title">{entry.title}</h3>
                    {entry.meta && (
                      <p className="home-entry__meta">{entry.meta}</p>
                    )}
                    {entry.tags?.length > 0 && (
                      <div className="home-entry__tags">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="home-entry__tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </AnimateIn>
        )}

        {data?.philosophy && (
          <AnimateIn variant="fade-up" delay={80}>
            <section className="home-block home-philosophy">
              <span className="home-block__step">05</span>
              <p className="home-philosophy__text">{data.philosophy}</p>
            </section>
          </AnimateIn>
        )}
      </div>
    </div>
  ) : <FallbackSpinner />;
}

export default Home;
