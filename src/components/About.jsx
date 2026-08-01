import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import AnimateIn from './AnimateIn';
import '../css/about.css';

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header
        title={header}
        lead="基本信息、教育背景、职业方向与联系方式。"
        hint="向下查看个人档案"
        anchor="#page-content"
      />
      <div id="page-content" className="section-content-container">
        {data ? (
          <div className="profile-page">
            {(data.intro || data.avatar) && (
              <AnimateIn variant="fade-up">
                <section className="tile profile-section profile-intro-card">
                  {data.avatar?.src && (
                    <figure className="profile-avatar">
                      <img
                        src={data.avatar.src}
                        alt={data.avatar.alt || '龙雨洁'}
                        loading="eager"
                      />
                    </figure>
                  )}
                  <div className="profile-intro-card__body">
                    {data.intro?.title && (
                      <h2 className="profile-section__title">
                        {data.intro.title}
                      </h2>
                    )}
                    <div className="profile-intro">
                      {data.intro?.paragraphs?.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </section>
              </AnimateIn>
            )}

            {data.basics && (
              <AnimateIn variant="fade-up" delay={40}>
                <section className="tile profile-section">
                  <h2 className="profile-section__title">{data.basics.title}</h2>
                  <dl className="profile-basics stagger-children">
                    {data.basics.items?.map((item) => (
                      <div key={item.label} className="profile-basics__row">
                        <dt>{item.label}</dt>
                        <dd>
                          {item.href ? (
                            <a href={item.href}>{item.value}</a>
                          ) : (
                            item.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </AnimateIn>
            )}

            {data.education && (
              <AnimateIn variant="fade-up" delay={60}>
                <section className="tile profile-section">
                  <h2 className="profile-section__title">{data.education.title}</h2>
                  {data.education.note && (
                    <p className="profile-section__note">{data.education.note}</p>
                  )}
                  <div className="profile-education">
                    {data.education.items?.map((item) => (
                      <article
                        key={`${item.school}-${item.period}`}
                        className="profile-education__item"
                      >
                        <h3 className="profile-education__school">{item.school}</h3>
                        <p className="profile-education__degree">
                          {item.degree}
                          {item.degreeZh ? ` · ${item.degreeZh}` : ''}
                        </p>
                        <span className="profile-education__period">{item.period}</span>
                      </article>
                    ))}
                  </div>
                </section>
              </AnimateIn>
            )}

            {data.directions && (
              <AnimateIn variant="fade-up" delay={80}>
                <section className="tile profile-section">
                  <h2 className="profile-section__title">{data.directions.title}</h2>
                  <div className="profile-directions stagger-children">
                    {data.directions.items?.map((item) => (
                      <article key={item.title} className="profile-direction">
                        <h3 className="profile-direction__title">{item.title}</h3>
                        <p className="profile-direction__desc">{item.desc}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </AnimateIn>
            )}

            {data.contact && (
              <AnimateIn variant="fade-up" delay={100}>
                <section className="tile profile-section profile-contact">
                  <h2 className="profile-section__title">{data.contact.title}</h2>
                  {data.contact.headline && (
                    <p className="profile-contact__headline">{data.contact.headline}</p>
                  )}
                  {data.contact.topics?.length > 0 && (
                    <ul className="profile-contact__topics">
                      {data.contact.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  )}
                  <div className="profile-contact__channels">
                    {data.contact.phone && (
                      <a
                        className="profile-contact__link"
                        href={`tel:${data.contact.phone}`}
                      >
                        <span className="profile-contact__key">电话</span>
                        <span>{data.contact.phone}</span>
                      </a>
                    )}
                    {data.contact.email && (
                      <a
                        className="profile-contact__link"
                        href={`mailto:${data.contact.email}`}
                      >
                        <span className="profile-contact__key">邮箱</span>
                        <span>{data.contact.email}</span>
                      </a>
                    )}
                  </div>
                </section>
              </AnimateIn>
            )}
          </div>
        ) : <FallbackSpinner />}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
