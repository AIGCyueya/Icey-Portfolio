import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';
import parseMetricValue, { formatCount } from '../utils/parseMetricValue';

function CountUp({ value, className, duration = 1200 }) {
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const [ref, inView] = useInView({ threshold: 0.25, rootMargin: '0px' });
  const animated = useCountUp(
    parsed.animatable ? parsed.target : null,
    inView,
    duration,
  );

  if (!parsed.animatable) {
    return <span className={className}>{value}</span>;
  }

  const display = formatCount(animated, parsed.useGrouping);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {parsed.sign}
      {display}
      {parsed.suffix}
    </span>
  );
}

CountUp.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
};

export default CountUp;
