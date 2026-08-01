/** Convert theme preset object to scoped CSS custom properties */
export function themeToCssVars(theme) {
  const gradient = theme.gradient
    || `linear-gradient(135deg, ${theme.accentColor}, ${theme.accentColor2})`;

  return {
    '--bg': theme.background,
    '--text': theme.color,
    '--text-muted': theme.textMuted,
    '--accent': theme.accentColor,
    '--accent-2': theme.accentColor2,
    '--accent-soft': theme.accentSoft,
    '--surface': theme.cardBackground,
    '--surface-2': theme.cardFooterBackground,
    '--surface-text': theme.cardColor || theme.color,
    '--surface-text-muted': theme.cardTextMuted || theme.textMuted,
    '--chip-bg': theme.chipBackground || theme.cardBackground,
    '--chip-color': theme.chipColor || theme.color,
    '--chip-border': theme.chipBorder || theme.cardBorderColor,
    '--border': theme.cardBorderColor,
    '--gradient': gradient,
    '--hero-gradient': theme.heroGradient || `linear-gradient(135deg, ${theme.color} 40%, ${theme.accentColor} 100%)`,
    '--watermark-stroke': theme.watermarkStroke || 'rgba(255, 87, 34, 0.12)',
    '--eyebrow-glow': theme.eyebrowGlow || 'rgba(255, 87, 34, 0.5)',
    '--shadow-sm': theme.shadowSm,
    '--shadow-md': theme.shadowMd,
    '--btn-glow-sm': theme.buttonGlowSm,
    '--btn-glow-md': theme.buttonGlowMd,
    '--radius-sm': '10px',
    '--radius-md': '16px',
    '--radius-lg': '22px',
    '--space-2': '0.5rem',
    '--space-3': '0.75rem',
    '--space-4': '1rem',
    '--space-5': '1.5rem',
    '--font-display': "'Space Grotesk', 'Inter', sans-serif",
    '--font-mono': "'JetBrains Mono', monospace",
    '--dur': '0.25s',
    '--ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
}

export function themeBackgroundStyle(theme) {
  if (theme.backgroundGradient) {
    const grid = theme.gridColor || 'rgba(255,255,255,0.03)';
    return {
      backgroundColor: theme.background,
      backgroundImage: `${theme.backgroundGradient}, linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
      backgroundSize: 'auto, 64px 64px, 64px 64px',
      color: theme.color,
    };
  }

  const layers = [
    `radial-gradient(48rem 48rem at 100% -8%, ${theme.glow1}, transparent 60%)`,
    `radial-gradient(42rem 42rem at -10% 8%, ${theme.glow2}, transparent 55%)`,
  ];
  if (theme.glow3) {
    layers.push(`radial-gradient(36rem 36rem at 50% 100%, ${theme.glow3}, transparent 50%)`);
  }
  const grid = theme.gridColor || 'rgba(255,255,255,0.03)';
  layers.push(
    `linear-gradient(${grid} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
  );
  return {
    backgroundColor: theme.background,
    backgroundImage: layers.join(', '),
    backgroundSize: 'auto, auto, auto, 64px 64px, 64px 64px',
    color: theme.color,
  };
}
