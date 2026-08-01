import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colour (theme-driven) */
    --bg: ${({ theme }) => theme.background};
    --text: ${({ theme }) => theme.color};
    --text-muted: ${({ theme }) => theme.textMuted};
    --accent: ${({ theme }) => theme.accentColor};
    --accent-2: ${({ theme }) => theme.accentColor2};
    --accent-soft: ${({ theme }) => theme.accentSoft};
    --surface: ${({ theme }) => theme.cardBackground};
    --surface-2: ${({ theme }) => theme.cardFooterBackground};
    --surface-text: ${({ theme }) => theme.cardColor || theme.color};
    --surface-text-muted: ${({ theme }) => theme.cardTextMuted || theme.textMuted};
    --chip-bg: ${({ theme }) => theme.chipBackground || theme.cardBackground};
    --chip-color: ${({ theme }) => theme.chipColor || theme.color};
    --chip-border: ${({ theme }) => theme.chipBorder || theme.cardBorderColor};
    --border: ${({ theme }) => theme.cardBorderColor};
    --navbar-bg: ${({ theme }) => theme.navbarBackground};
    --timeline-line: ${({ theme }) => theme.timelineLineColor};
    --gradient: ${({ theme }) => theme.gradient || `linear-gradient(135deg, ${theme.accentColor}, ${theme.accentColor2})`};
    --gradient-reverse: linear-gradient(135deg, var(--accent-2), var(--accent));
    --hero-gradient: ${({ theme }) => theme.heroGradient || `linear-gradient(135deg, ${theme.color} 40%, ${theme.accentColor} 100%)`};
    --watermark-stroke: ${({ theme }) => theme.watermarkStroke || 'rgba(255, 87, 34, 0.12)'};
    --eyebrow-glow: ${({ theme }) => theme.eyebrowGlow || 'rgba(255, 87, 34, 0.5)'};
    --btn-glow-sm: ${({ theme }) => theme.buttonGlowSm || '0 0 20px rgba(255, 87, 34, 0.25)'};
    --btn-glow-md: ${({ theme }) => theme.buttonGlowMd || '0 0 28px rgba(255, 87, 34, 0.35)'};
    --grid-color: ${({ theme }) => theme.gridColor || 'rgba(0, 229, 255, 0.025)'};

    /* Elevation */
    --shadow-sm: ${({ theme }) => theme.shadowSm};
    --shadow-md: ${({ theme }) => theme.shadowMd};

    /* Spacing scale (4px base) */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.5rem;
    --space-6: 2rem;
    --space-7: 3rem;
    --space-8: 4rem;

    /* Radius */
    --radius-sm: 10px;
    --radius-md: 16px;
    --radius-lg: 22px;

    /* Motion */
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
    --dur: 0.25s;

    /* Type */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Helvetica Neue', sans-serif;
    --font-display: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', source-code-pro, Menlo, Monaco, Consolas, monospace;
  }

  html {
    scrollbar-color: var(--border) transparent;
    scroll-behavior: smooth;
  }

  body {
    --bs-body-bg: ${({ theme }) => theme.background};
    --bs-body-color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.background};
    background-image: ${({ theme }) => (theme.backgroundGradient
      ? theme.backgroundGradient
      : `radial-gradient(48rem 48rem at 100% -8%, ${theme.glow1}, transparent 60%),
      radial-gradient(42rem 42rem at -10% 8%, ${theme.glow2}, transparent 55%)
      ${theme.glow3 ? `, radial-gradient(36rem 36rem at 50% 100%, ${theme.glow3}, transparent 50%)` : ''}`)};
    background-attachment: fixed;
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.color};
    transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
    position: relative;
    letter-spacing: 0.01em;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 85% 70% at 50% 0%, black 20%, transparent 85%);
    pointer-events: none;
    z-index: 0;
    opacity: 0.9;
    animation: global-grid-drift 22s linear infinite;
  }

  body::after {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    height: 22%;
    top: -25%;
    background: linear-gradient(
      180deg,
      transparent,
      color-mix(in srgb, var(--accent) 7%, transparent),
      transparent
    );
    pointer-events: none;
    z-index: 0;
    animation: global-scan 9s ease-in-out infinite;
  }

  @keyframes global-grid-drift {
    from { transform: translateY(0); }
    to { transform: translateY(56px); }
  }

  @keyframes global-scan {
    0% { top: -25%; opacity: 0; }
    12% { opacity: 1; }
    88% { opacity: 0.35; }
    100% { top: 115%; opacity: 0; }
  }

  .App {
    position: relative;
    z-index: 1;
  }

  a {
    color: var(--accent);
    text-decoration: none;
  }

  ::selection {
    background: var(--accent);
    color: #fff;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }

  :focus-visible {
    outline: 2px solid var(--accent-2);
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }

    body::before,
    body::after {
      animation: none !important;
    }
  }
`;

export default GlobalStyles;
