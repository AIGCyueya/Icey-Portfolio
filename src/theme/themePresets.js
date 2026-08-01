/**
 * Visual theme exploration presets — NOT applied by default.
 * Preview via: /?previewTheme=ins-mint|ai-gradient|premium-light|dark-orange|...
 * Or comparison page: /theme-preview
 */

import { lightTheme, darkTheme } from './themes';

const sharedDarkNav = {
  chronoTheme: {
    cardBgColor: '#141414',
    cardForeColor: '#f4f4f5',
    titleColor: 'black',
  },
  bsPrimaryVariant: 'dark',
  bsSecondaryVariant: 'light',
  socialIconBgColor: '#f4f4f5',
};

const sharedLightNav = {
  chronoTheme: {
    cardBgColor: '#ffffff',
    cardForeColor: '#0A0A0A',
    titleColor: 'white',
  },
  bsPrimaryVariant: 'light',
  bsSecondaryVariant: 'dark',
  socialIconBgColor: '#0A0A0A',
};

/** 方案1 — AI Gradient：深色 + 紫蓝橙渐变 · AI产品/创业公司 */
export const aiGradientTheme = {
  id: 'ai-gradient',
  label: 'AI Gradient',
  tagline: 'AI产品 / 创业公司风格',
  forceLight: false,
  background: '#0B0D17',
  color: '#F1F3F9',
  textMuted: '#9CA3BF',
  accentColor: '#7C3AED',
  accentColor2: '#3B82F6',
  accentColor3: '#F97316',
  accentSoft: 'rgba(124, 58, 237, 0.16)',
  glow1: 'rgba(124, 58, 237, 0.22)',
  glow2: 'rgba(59, 130, 246, 0.14)',
  glow3: 'rgba(249, 115, 22, 0.10)',
  gridColor: 'rgba(124, 58, 237, 0.04)',
  gradient: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 52%, #F97316 100%)',
  buttonGlowSm: '0 0 22px rgba(124, 58, 237, 0.35)',
  buttonGlowMd: '0 0 36px rgba(59, 130, 246, 0.40)',
  timelineLineColor: '#1E2235',
  cardBackground: '#12152A',
  cardFooterBackground: '#161A32',
  cardBorderColor: 'rgba(124, 58, 237, 0.14)',
  navbarBackground: 'rgba(11, 13, 23, 0.78)',
  shadowSm: '0 1px 2px rgba(0, 0, 0, 0.45), 0 4px 20px rgba(124, 58, 237, 0.08)',
  shadowMd: '0 8px 28px rgba(0, 0, 0, 0.55), 0 0 40px rgba(59, 130, 246, 0.10)',
  navbarTheme: {
    linkColor: '#9CA3BF',
    linkHoverColor: '#F1F3F9',
    linkActiveColor: '#A78BFA',
  },
  ...sharedDarkNav,
};

/** 方案2 — Premium Light：白色 + 高饱和渐变 · 高级 PM Portfolio（加强版） */
export const premiumLightTheme = {
  id: 'premium-light',
  label: 'Premium Light',
  tagline: '高级产品经理 Portfolio · 加强冲击',
  forceLight: true,
  background: '#FAFAFA',
  color: '#0F0F12',
  textMuted: '#52525B',
  accentColor: '#5B21B6',
  accentColor2: '#DB2777',
  accentColor3: '#EA580C',
  accentSoft: 'rgba(91, 33, 182, 0.20)',
  glow1: 'rgba(91, 33, 182, 0.22)',
  glow2: 'rgba(219, 39, 119, 0.18)',
  glow3: 'rgba(234, 88, 12, 0.14)',
  gridColor: 'rgba(91, 33, 182, 0.07)',
  gradient: 'linear-gradient(135deg, #5B21B6 0%, #DB2777 48%, #EA580C 100%)',
  heroGradient: 'linear-gradient(120deg, #0F0F12 0%, #5B21B6 42%, #DB2777 72%, #EA580C 100%)',
  watermarkStroke: 'rgba(91, 33, 182, 0.16)',
  eyebrowGlow: 'rgba(219, 39, 119, 0.55)',
  buttonGlowSm: '0 0 26px rgba(219, 39, 119, 0.38)',
  buttonGlowMd: '0 0 44px rgba(91, 33, 182, 0.42)',
  timelineLineColor: '#E4E4E7',
  cardBackground: '#FFFFFF',
  cardFooterBackground: '#F8F7FC',
  cardBorderColor: 'rgba(91, 33, 182, 0.14)',
  navbarBackground: 'rgba(250, 250, 250, 0.88)',
  shadowSm: '0 2px 8px rgba(91, 33, 182, 0.10), 0 8px 28px rgba(219, 39, 119, 0.12)',
  shadowMd: '0 16px 48px rgba(91, 33, 182, 0.14), 0 8px 32px rgba(219, 39, 119, 0.18)',
  navbarTheme: {
    linkColor: '#52525B',
    linkHoverColor: '#0F0F12',
    linkActiveColor: '#5B21B6',
  },
  ...sharedLightNav,
};

/** Ins Mint — 薄荷绿 · Instagram 风格（生产默认） */
export const insMintTheme = {
  id: 'ins-mint',
  label: 'Ins Mint',
  tagline: '薄荷绿 · Instagram风格',
  forceLight: true,
  ...lightTheme,
};

/** 方案3 — Dark Orange+：与生产 darkTheme 同步 */
export const darkOrangeTheme = {
  id: 'dark-orange',
  label: 'Dark Orange+',
  tagline: 'AI生态建设者 · 深色炫彩',
  forceLight: false,
  ...darkTheme,
};

/** 方案3b — Dark Orange Light：浅底渐变 + 橙紫青炫彩 */
export const darkOrangeLightTheme = {
  id: 'dark-orange-light',
  label: 'Dark Orange Light',
  tagline: '浅底渐变 · 橙紫青炫彩',
  forceLight: true,
  background: '#FFFBF8',
  color: '#0F0F12',
  textMuted: '#52525B',
  accentColor: '#FF6D00',
  accentColor2: '#D946EF',
  accentColor3: '#00F0FF',
  accentSoft: 'rgba(255, 109, 0, 0.22)',
  glow1: 'rgba(255, 109, 0, 0.24)',
  glow2: 'rgba(217, 70, 239, 0.20)',
  glow3: 'rgba(0, 240, 255, 0.15)',
  gridColor: 'rgba(255, 109, 0, 0.06)',
  backgroundGradient: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5EE 30%, #FDECFA 58%, #E8FAFF 100%)',
  gradient: 'linear-gradient(135deg, #FF6D00 0%, #FF5722 28%, #D946EF 58%, #00F0FF 100%)',
  heroGradient: 'linear-gradient(120deg, #0F0F12 0%, #FF6D00 30%, #D946EF 62%, #00F0FF 100%)',
  watermarkStroke: 'rgba(255, 109, 0, 0.16)',
  eyebrowGlow: 'rgba(255, 109, 0, 0.70)',
  buttonGlowSm: '0 0 32px rgba(255, 109, 0, 0.50)',
  buttonGlowMd: '0 0 52px rgba(217, 70, 239, 0.48)',
  timelineLineColor: '#E8DDD4',
  cardBackground: '#FFF3EB',
  cardFooterBackground: '#FCE8DC',
  cardColor: '#0F0F12',
  cardTextMuted: '#5C534D',
  cardBorderColor: 'rgba(255, 109, 0, 0.22)',
  chipBackground: 'rgba(255, 255, 255, 0.92)',
  chipColor: '#0F0F12',
  chipBorder: 'rgba(255, 109, 0, 0.28)',
  navbarBackground: 'rgba(255, 251, 248, 0.92)',
  shadowSm: '0 2px 12px rgba(255, 109, 0, 0.14), 0 8px 32px rgba(217, 70, 239, 0.12)',
  shadowMd: '0 12px 40px rgba(255, 109, 0, 0.16), 0 0 52px rgba(0, 240, 255, 0.14)',
  navbarTheme: {
    linkColor: '#52525B',
    linkHoverColor: '#0F0F12',
    linkActiveColor: '#FF6D00',
  },
  ...sharedLightNav,
};

/** 方案4 — Premium Hybrid：保留旧版紫粉浅底备选 */
export const premiumHybridTheme = {
  id: 'premium-hybrid',
  label: 'Premium Hybrid',
  tagline: '浅底紫粉 · 微深卡混合',
  forceLight: true,
  background: '#FAFAFC',
  color: '#0F0F12',
  textMuted: '#52525B',
  accentColor: '#7C3AED',
  accentColor2: '#EC4899',
  accentColor3: '#FF5722',
  accentSoft: 'rgba(124, 58, 237, 0.20)',
  glow1: 'rgba(124, 58, 237, 0.24)',
  glow2: 'rgba(236, 72, 153, 0.20)',
  glow3: 'rgba(0, 229, 255, 0.12)',
  gridColor: 'rgba(124, 58, 237, 0.07)',
  backgroundGradient: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8FF 40%, #F3EFFE 72%, #EBE6FA 100%)',
  gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 38%, #FF5722 72%, #00E5FF 100%)',
  heroGradient: 'linear-gradient(120deg, #0F0F12 0%, #7C3AED 35%, #EC4899 60%, #FF5722 85%, #00E5FF 100%)',
  watermarkStroke: 'rgba(124, 58, 237, 0.18)',
  eyebrowGlow: 'rgba(236, 72, 153, 0.60)',
  buttonGlowSm: '0 0 30px rgba(236, 72, 153, 0.45)',
  buttonGlowMd: '0 0 50px rgba(124, 58, 237, 0.50)',
  timelineLineColor: '#D4CEE8',
  cardBackground: '#EDE9F8',
  cardFooterBackground: '#E5E0F2',
  cardColor: '#0F0F12',
  cardTextMuted: '#5B5670',
  cardBorderColor: 'rgba(124, 58, 237, 0.20)',
  chipBackground: 'rgba(255, 255, 255, 0.88)',
  chipColor: '#0F0F12',
  chipBorder: 'rgba(124, 58, 237, 0.24)',
  navbarBackground: 'rgba(250, 250, 252, 0.90)',
  shadowSm: '0 2px 12px rgba(124, 58, 237, 0.10), 0 8px 32px rgba(236, 72, 153, 0.12)',
  shadowMd: '0 12px 40px rgba(124, 58, 237, 0.16), 0 0 48px rgba(255, 87, 34, 0.12)',
  navbarTheme: {
    linkColor: '#52525B',
    linkHoverColor: '#0F0F12',
    linkActiveColor: '#7C3AED',
  },
  ...sharedLightNav,
};

export const themePresets = {
  'ins-mint': insMintTheme,
  'ai-gradient': aiGradientTheme,
  'premium-light': premiumLightTheme,
  'dark-orange': darkOrangeTheme,
  'dark-orange-light': darkOrangeLightTheme,
  'premium-hybrid': premiumHybridTheme,
};

export function getPreviewTheme(id) {
  return themePresets[id] || null;
}
