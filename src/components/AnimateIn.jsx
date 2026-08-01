import React from 'react';
import PropTypes from 'prop-types';
import useInView from '../hooks/useInView';

function AnimateIn({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  as: Tag = 'div',
}) {
  const [ref, inView] = useInView({ threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  return (
    <Tag
      ref={ref}
      className={`animate-in animate-in--${variant}${inView ? ' animate-in--visible' : ''} ${className}`.trim()}
      style={{ '--stagger-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

AnimateIn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  variant: PropTypes.oneOf([
    'fade-up',
    'fade-in',
    'slide-right',
    'slide-left',
    'scale-in',
    'clip-up',
  ]),
  as: PropTypes.string,
};

export default AnimateIn;
