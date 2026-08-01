import React from 'react';
import { Link } from 'react-router-dom';
import {
  aiGradientTheme,
  premiumLightTheme,
  darkOrangeTheme,
  premiumHybridTheme,
} from '../theme/themePresets';
import { themeToCssVars, themeBackgroundStyle } from '../theme/themeToCssVars';
import '../css/theme-preview.css';

const PRESETS = [aiGradientTheme, premiumLightTheme, darkOrangeTheme, premiumHybridTheme];

function PreviewPanel({ theme }) {
  return (
    <div
      className="preview-panel"
      style={{
        ...themeToCssVars(theme),
        ...themeBackgroundStyle(theme),
      }}
    >
      <div className="preview-panel__header">
        <span className="preview-panel__id">{theme.label}</span>
        <p className="preview-panel__tagline">{theme.tagline}</p>
      </div>

      <div className="preview-panel__bg-sample">
        <span className="preview-eyebrow">AI PRODUCT · ECOSYSTEM</span>
        <h2 className="preview-title">LONG YUJIE</h2>
        <p className="preview-sub">AI产品运营 · 生态建设</p>
      </div>

      <div className="preview-buttons">
        <span className="btn-pill btn-accent">查看项目</span>
        <span className="btn-pill btn-ghost">了解经历</span>
      </div>

      <div className="tile preview-card">
        <span className="tile-label">Case Study</span>
        <h3 className="preview-card__title">魔乐社区 AIGC生态建设</h3>
        <p className="preview-card__text">
          从用户洞察到增长机制设计，构建 AI 开发者生态闭环。
        </p>
        <div className="preview-card__metrics">
          <div className="preview-metric">
            <span className="preview-metric__val">CTR +58%</span>
            <span className="preview-metric__lbl">内容点击率</span>
          </div>
          <div className="preview-metric">
            <span className="preview-metric__val">40,000+</span>
            <span className="preview-metric__lbl">开发者触达</span>
          </div>
        </div>
      </div>

      <div className="preview-tokens">
        <span className="preview-swatch" style={{ background: theme.background }} title="background" />
        <span className="preview-swatch" style={{ background: theme.accentColor }} title="accent" />
        <span className="preview-swatch" style={{ background: theme.accentColor2 }} title="accent-2" />
        {theme.accentColor3 && (
          <span className="preview-swatch" style={{ background: theme.accentColor3 }} title="accent-3" />
        )}
        <span
          className="preview-swatch preview-swatch--card"
          style={{ background: theme.cardBackground, border: `1px solid ${theme.cardBorderColor}` }}
          title="card"
        />
      </div>

      <Link className="preview-link" to={`/?previewTheme=${theme.id}`}>
        全站预览 →
      </Link>
    </div>
  );
}

function ThemePreview() {
  return (
    <div className="theme-preview-page">
      <header className="theme-preview-page__header">
        <h1>视觉主题探索</h1>
        <p>四套方案对比 · 仅 token / background / glow / button / card · 页面结构不变</p>
        <Link to="/" className="preview-back">← 返回当前站点</Link>
      </header>
      <div className="theme-preview-grid">
        {PRESETS.map((preset) => (
          <PreviewPanel key={preset.id} theme={preset} />
        ))}
      </div>
    </div>
  );
}

export default ThemePreview;
