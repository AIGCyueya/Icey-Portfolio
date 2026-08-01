import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import AnimateIn from './AnimateIn';
import '../css/projects.css';

const Projects = (props) => {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.projects, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header
        title={header}
        lead="真实项目与结果：AI 社区、企业落地与内容生态。"
        hint="向下查看项目案例"
        anchor="#page-content"
      />
      {data ? (
        <div id="page-content" className="section-content-container">
          <div className="projects-list">
            {data.projects?.map((project, index) => (
              <AnimateIn key={project.title} variant="fade-up" delay={index * 80}>
                <ProjectCard
                  project={project}
                  featured={index === 0}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
