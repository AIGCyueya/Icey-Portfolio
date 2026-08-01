import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function Header(props) {
  const {
    title,
    lead = '',
    hint = '向下继续了解',
    anchor = '#page-content',
  } = props;

  return (
    <header className="page-header">
      <div className="page-header__glow" aria-hidden="true" />
      <div className="page-header__watermark" aria-hidden="true">
        {title}
      </div>
      <h1 className="header">{title}</h1>
      {lead ? (
        <p className="page-header__lead">{lead}</p>
      ) : null}
      {hint ? (
        <a className="page-header__scroll" href={anchor}>
          <span className="page-header__scroll-text">{hint}</span>
          <span className="page-header__scroll-chevron" aria-hidden="true" />
        </a>
      ) : null}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  hint: PropTypes.string,
  anchor: PropTypes.string,
};

export default Header;
