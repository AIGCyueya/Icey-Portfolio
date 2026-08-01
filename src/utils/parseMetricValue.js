/**
 * Parse metric strings like "40,000+", "CTR +58%", "120%" for count-up animation.
 */
export default function parseMetricValue(value) {
  if (!value || typeof value !== 'string') {
    return { animatable: false, display: value };
  }

  const normalized = value.replace(/,/g, '');
  const match = normalized.match(/^(.*?)([+-]?)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { animatable: false, display: value };
  }

  const [, prefix, sign, numStr, suffix] = match;
  const target = parseFloat(numStr);

  if (Number.isNaN(target)) {
    return { animatable: false, display: value };
  }

  return {
    animatable: true,
    prefix,
    sign,
    target,
    suffix,
    useGrouping: value.includes(','),
  };
}

export function formatCount(num, useGrouping) {
  if (useGrouping && num >= 1000) {
    return Math.round(num).toLocaleString('en-US');
  }
  if (Number.isInteger(num)) return String(Math.round(num));
  return num.toFixed(1);
}
