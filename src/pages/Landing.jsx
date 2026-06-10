import { useState, useEffect, useRef } from "react";
import { useApp } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

// ─── CSS-in-JS via a style tag injected once ───────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0B1120;
    --ink-60: rgba(11,17,32,0.6);
    --surface: #F4F7FC;
    --paper: #FFFFFF;
    --accent: #1A56DB;
    --accent-light: #EEF3FF;
    --gold: #E8A020;
    --gold-light: #FFF8EC;
    --green: #0E9F6E;
    --muted: #64748B;
    --border: #E2E8F0;
    --radius: 14px;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--surface); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* NAV */
  .ft-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 5%; height: 68px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ft-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .ft-nav-logo-text { font-family: 'DM Serif Display', serif; font-size: 1.35rem; color: var(--ink); letter-spacing: -0.02em; }
  .ft-nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
  .ft-nav-links a { text-decoration: none; color: var(--muted); font-size: .875rem; font-weight: 500; transition: color .2s; }
  .ft-nav-links a:hover, .ft-nav-links a.active { color: var(--ink); }
  .ft-nav-cta { display: flex; gap: 10px; align-items: center; }

  /* BUTTONS */
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 8px; font-size: .875rem; font-weight: 600; text-decoration: none; cursor: pointer; border: none; transition: all .2s; }
  .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--surface); }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #1547c0; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26,86,219,.3); }
  .btn-large { padding: 14px 28px; font-size: .95rem; border-radius: 10px; }
  .btn-white { background: #fff; color: var(--accent); font-weight: 700; }
  .btn-white:hover { background: #f0f4ff; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,.2); }
  .btn-outline-white { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.5); }
  .btn-outline-white:hover { border-color: #fff; background: rgba(255,255,255,.1); }

  /* HERO */
  .ft-hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 120px 5% 80px; position: relative; overflow: hidden; }
  .ft-hero-bg { position: absolute; inset: 0; z-index: 0; background: linear-gradient(135deg,#EEF3FF 0%,#F4F7FC 50%,#FFF8EC 100%); }
  .ft-hero-grid { position: absolute; inset: 0; z-index: 0; opacity: .4; background-image: linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse 70% 70% at 50% 40%,black 0%,transparent 100%); }
  .ft-hero-content { position: relative; z-index: 1; max-width: 680px; }
  .ft-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: var(--paper); border: 1px solid var(--border); border-radius: 100px; padding: 6px 16px; font-size: .78rem; font-weight: 600; color: var(--accent); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
  .ft-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)} }
  .ft-hero-headline { font-family: 'DM Serif Display', serif; font-size: clamp(2.6rem,5vw,4rem); line-height: 1.1; letter-spacing: -.03em; color: var(--ink); margin-bottom: 24px; }
  .ft-hero-headline em { font-style: italic; color: var(--accent); }
  .ft-hero-sub { font-size: 1.05rem; color: var(--muted); line-height: 1.7; max-width: 520px; margin-bottom: 40px; }
  .ft-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 56px; }
  .ft-hero-stats { display: flex; gap: 40px; flex-wrap: wrap; }
  .ft-stat { display: flex; flex-direction: column; gap: 2px; }
  .ft-stat-num { font-family: 'JetBrains Mono', monospace; font-size: 1.6rem; font-weight: 500; color: var(--ink); letter-spacing: -.02em; }
  .ft-stat-num span { color: var(--accent); }
  .ft-stat-label { font-size: .78rem; color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: .05em; }

  /* HERO VISUAL */
  .ft-hero-visual { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 52%; z-index: 1; display: flex; align-items: center; justify-content: center; }
  .ft-bridge-svg-wrap { width: 100%; max-width: 600px; animation: floatIn 1s cubic-bezier(.22,1,.36,1) both; animation-delay: .3s; }
  @keyframes floatIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  .ft-service-node { animation: nodeFade .6s ease both; }
  .ft-service-node:nth-child(1){animation-delay:.8s}
  .ft-service-node:nth-child(2){animation-delay:1.0s}
  .ft-service-node:nth-child(3){animation-delay:1.2s}
  .ft-service-node:nth-child(4){animation-delay:1.4s}
  .ft-service-node:nth-child(5){animation-delay:1.6s}
  @keyframes nodeFade { from{opacity:0;transform:scale(.6)} to{opacity:1;transform:scale(1)} }
  .ft-bridge-line { stroke-dasharray:200; stroke-dashoffset:200; animation: drawLine .8s ease forwards; }
  .ft-bridge-line:nth-child(1){animation-delay:.9s}
  .ft-bridge-line:nth-child(2){animation-delay:1.1s}
  @keyframes drawLine { to{stroke-dashoffset:0} }

  /* SECTION SHARED */
  .ft-section { padding: 96px 5%; }
  .ft-section-label { font-size: .75rem; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; color: var(--accent); margin-bottom: 16px; }
  .ft-section-title { font-family: 'DM Serif Display', serif; font-size: clamp(1.8rem,3.5vw,2.6rem); line-height: 1.15; letter-spacing: -.02em; color: var(--ink); max-width: 600px; margin-bottom: 16px; }
  .ft-section-sub { color: var(--muted); font-size: 1rem; line-height: 1.7; max-width: 540px; margin-bottom: 56px; }

  /* SERVICES */
  .ft-services { background: var(--paper); }
  .ft-services-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 20px; }
  .ft-service-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px 24px; transition: all .25s; cursor: pointer; position: relative; overflow: hidden; }
  .ft-service-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--accent); transform:scaleX(0); transform-origin:left; transition:transform .25s; }
  .ft-service-card:hover::before { transform:scaleX(1); }
  .ft-service-card:hover { border-color:#c7d7f8; background:var(--paper); transform:translateY(-3px); box-shadow:0 8px 28px rgba(26,86,219,.1); }
  .ft-service-icon { font-size: 2rem; margin-bottom: 16px; display: block; }
  .ft-service-name { font-weight: 600; font-size: .95rem; color: var(--ink); margin-bottom: 8px; }
  .ft-service-desc { font-size: .82rem; color: var(--muted); line-height: 1.6; }
  .ft-service-tag { display: inline-block; margin-top: 14px; background: var(--accent-light); color: var(--accent); font-size: .72rem; font-weight: 600; padding: 3px 10px; border-radius: 100px; letter-spacing: .04em; }

  /* HOW IT WORKS */
  .ft-how { background: var(--surface); }
  .ft-steps-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .ft-steps-list { display: flex; flex-direction: column; gap: 32px; }
  .ft-step { display: flex; gap: 20px; align-items: flex-start; opacity: 0; transform: translateY(16px); transition: all .5s ease; }
  .ft-step.visible { opacity: 1; transform: none; }
  .ft-step-num { font-family: 'JetBrains Mono', monospace; font-size: .7rem; font-weight: 500; color: var(--accent); background: var(--accent-light); border-radius: 8px; padding: 6px 10px; min-width: 44px; text-align: center; margin-top: 2px; border: 1px solid #c7d7f8; }
  .ft-step-body h3 { font-weight: 600; font-size: 1rem; margin-bottom: 6px; color: var(--ink); }
  .ft-step-body p { font-size: .875rem; color: var(--muted); line-height: 1.65; }
  .ft-how-visual { background: var(--paper); border: 1px solid var(--border); border-radius: 20px; padding: 36px; box-shadow: 0 12px 48px rgba(0,0,0,.07); }
  .ft-doc-vault-title { font-size: .78rem; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--muted); margin-bottom: 20px; }
  .ft-doc-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .ft-doc-item:last-child { border-bottom: none; }
  .ft-doc-icon { width: 36px; height: 36px; border-radius: 8px; background: var(--accent-light); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
  .ft-doc-name { font-size: .875rem; font-weight: 500; color: var(--ink); }
  .ft-doc-status { margin-left: auto; font-size: .72rem; font-weight: 600; background: #D1FAE5; color: #065F46; padding: 3px 10px; border-radius: 100px; }
  .ft-doc-status.pending { background: var(--gold-light); color: #92400E; }
  .ft-vault-reuse { margin-top: 20px; padding: 16px; background: var(--accent-light); border-radius: 10px; border: 1px solid #c7d7f8; }
  .ft-vault-reuse-title { font-size: .75rem; color: var(--accent); font-weight: 600; margin-bottom: 4px; }
  .ft-vault-reuse-desc { font-size: .82rem; color: var(--muted); }

  /* AI ENGINE */
  .ft-ai { background: var(--ink); color: #fff; }
  .ft-ai .ft-section-label { color: var(--gold); }
  .ft-ai .ft-section-title { color: #fff; }
  .ft-ai .ft-section-sub { color: rgba(255,255,255,.6); }
  .ft-ai-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap: 20px; }
  .ft-ai-feature { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: var(--radius); padding: 28px 24px; transition: background .2s; }
  .ft-ai-feature:hover { background: rgba(255,255,255,.09); }
  .ft-ai-feature-icon { font-size: 1.6rem; margin-bottom: 16px; }
  .ft-ai-feature-title { font-weight: 600; font-size: .95rem; color: #fff; margin-bottom: 8px; }
  .ft-ai-feature-desc { font-size: .82rem; color: rgba(255,255,255,.55); line-height: 1.65; }
  .ft-score-demo { margin-top: 48px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 16px; padding: 32px; display: flex; gap: 40px; flex-wrap: wrap; align-items: center; }
  .ft-score-ring-wrap { flex-shrink: 0; position: relative; }
  .ft-score-ring-wrap svg { display: block; }
  .ft-score-ring-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; }
  .ft-score-ring-num { font-family: 'JetBrains Mono', monospace; font-size: 1.8rem; font-weight: 500; color: #fff; }
  .ft-score-ring-sub { font-size: .68rem; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: .06em; }
  .ft-score-details { flex: 1; min-width: 220px; }
  .ft-score-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08); font-size: .875rem; }
  .ft-score-row:last-child { border-bottom: none; }
  .ft-score-row-label { color: rgba(255,255,255,.6); }
  .ft-score-row-val { font-weight: 600; color: #fff; }
  .ft-score-row-val.good { color: #34D399; }
  .ft-score-row-val.warn { color: var(--gold); }

  /* AGENTS */
  .ft-agents { background: var(--paper); }
  .ft-agents-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .ft-agent-features { display: flex; flex-direction: column; gap: 24px; }
  .ft-agent-feat { display: flex; gap: 16px; align-items: flex-start; }
  .ft-agent-feat-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--accent-light); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
  .ft-agent-feat-body h4 { font-weight: 600; font-size: .95rem; color: var(--ink); margin-bottom: 4px; }
  .ft-agent-feat-body p { font-size: .82rem; color: var(--muted); line-height: 1.6; }
  .ft-agent-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; box-shadow: 0 12px 48px rgba(0,0,0,.07); }
  .ft-panel-header { background: var(--ink); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
  .ft-panel-header-title { color: #fff; font-size: .875rem; font-weight: 600; }
  .ft-panel-dots { display: flex; gap: 6px; }
  .ft-panel-dot { width: 8px; height: 8px; border-radius: 50%; }
  .ft-app-row { display: flex; align-items: center; gap: 12px; padding: 14px 24px; border-bottom: 1px solid var(--border); background: var(--paper); }
  .ft-app-row:last-child { border-bottom: none; }
  .ft-app-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: .78rem; font-weight: 700; flex-shrink: 0; }
  .ft-app-name { font-size: .875rem; font-weight: 600; color: var(--ink); }
  .ft-app-type { font-size: .75rem; color: var(--muted); }
  .ft-app-amount { margin-left: auto; margin-right: 12px; font-family: 'JetBrains Mono', monospace; font-size: .875rem; font-weight: 500; color: var(--ink); }
  .ft-status-badge { font-size: .7rem; font-weight: 600; padding: 3px 10px; border-radius: 100px; }
  .ft-status-badge.approved { background: #D1FAE5; color: #065F46; }
  .ft-status-badge.review { background: #FEF3C7; color: #92400E; }
  .ft-status-badge.pending { background: #EEF3FF; color: var(--accent); }

  /* TRUST */
  .ft-trust { background: var(--surface); }
  .ft-trust-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .ft-trust-card { background: var(--paper); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px 28px; }
  .ft-stars { color: var(--gold); font-size: .875rem; margin-bottom: 16px; }
  .ft-trust-quote { font-size: .9rem; color: var(--muted); line-height: 1.7; margin-bottom: 24px; font-style: italic; }
  .ft-trust-author { display: flex; gap: 12px; align-items: center; }
  .ft-trust-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .85rem; font-weight: 700; color: #fff; flex-shrink: 0; }
  .ft-trust-name { font-weight: 600; font-size: .875rem; color: var(--ink); }
  .ft-trust-role { font-size: .75rem; color: var(--muted); }

  /* CTA */
  .ft-cta { background: linear-gradient(135deg,var(--accent) 0%,#1547c0 50%,#0f3a99 100%); padding: 96px 5%; text-align: center; position: relative; overflow: hidden; }
  .ft-cta::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(255,255,255,.1) 1px,transparent 1px); background-size:32px 32px; }
  .ft-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
  .ft-cta-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem,4vw,3rem); color: #fff; line-height: 1.1; letter-spacing: -.02em; margin-bottom: 20px; }
  .ft-cta-sub { color: rgba(255,255,255,.75); font-size: 1rem; line-height: 1.7; margin-bottom: 36px; }
  .ft-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  /* FOOTER */
  .ft-footer { background: var(--ink); color: rgba(255,255,255,.5); padding: 56px 5% 36px; }
  .ft-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .ft-footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .ft-footer-logo-text { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #fff; }
  .ft-footer-desc { font-size: .82rem; line-height: 1.7; max-width: 280px; margin-bottom: 20px; }
  .ft-footer-badges { display: flex; gap: 10px; flex-wrap: wrap; }
  .ft-footer-badge { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); padding: 4px 12px; border-radius: 100px; font-size: .72rem; color: rgba(255,255,255,.6); font-weight: 500; }
  .ft-footer-col-title { color: #fff; font-weight: 600; font-size: .82rem; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 16px; }
  .ft-footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .ft-footer-links a { text-decoration: none; color: rgba(255,255,255,.5); font-size: .82rem; transition: color .2s; }
  .ft-footer-links a:hover { color: #fff; }
  .ft-footer-bottom { border-top: 1px solid rgba(255,255,255,.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: .78rem; }

  /* RESPONSIVE */
  @media(max-width:900px) {
    .ft-hero-visual{display:none}
    .ft-steps-wrap,.ft-agents-split{grid-template-columns:1fr}
    .ft-trust-grid{grid-template-columns:1fr}
    .ft-footer-top{grid-template-columns:1fr 1fr}
    .ft-nav-links{display:none}
  }
  @media(max-width:600px) {
    .ft-hero-stats{gap:24px}
    .ft-footer-top{grid-template-columns:1fr}
    .ft-footer-bottom{flex-direction:column;align-items:flex-start}
  }
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

// ─── Sub-components ────────────────────────────────────────────────────────

function Nav({ activeSection }) {
    const { switchView } = useApp();
  return (
    <nav className="ft-nav">
      <a className="ft-nav-logo" href="#">
        <span className="ft-nav-logo-text">FinTech</span>
      </a>
      <ul className="ft-nav-links">
        {[["#services","Services"],["#how","How it works"],["#agents","For Agents"],["#trust","Testimonials"]].map(([href,label]) => (
          <li key={href}><a href={href} className={activeSection === href.slice(1) ? "active" : ""}>{label}</a></li>
        ))}
      </ul>
      <div className="ft-nav-cta">
        <a href="#" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); switchView('loginView'); }}>
          Log in
        </a>
        <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); switchView('registerView'); }}>
          Get started
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="ft-hero">
      <div className="ft-hero-bg" />
      <div className="ft-hero-grid" />
      <div className="ft-hero-content">
        <div className="ft-hero-eyebrow">
          <span className="ft-eyebrow-dot" />
          Unified Financial Platform
        </div>
        <h1 className="ft-hero-headline">
          Every financial service,<br /><em>one bridge.</em>
        </h1>
        <p className="ft-hero-sub">
          Loans, investments, insurance, pensions, and government benefits — accessed through a single platform. Stop chasing documents. Start achieving goals.
        </p>
        <div className="ft-hero-actions">
          <a href="#" className="btn btn-primary btn-large">Start your application</a>
          <a href="#how" className="btn btn-ghost btn-large">See how it works</a>
        </div>
        <div className="ft-hero-stats">
          {[
            ["5","+" ,"Service Categories"],
            ["50","+","Products Available"],
            ["1","×","Document Upload"],
            ["AI","","Eligibility Engine"],
          ].map(([num, sup, label]) => (
            <div className="ft-stat" key={label}>
              <span className="ft-stat-num">{num}{sup && <span>{sup}</span>}</span>
              <span className="ft-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bridge SVG */}
      <div className="ft-hero-visual">
        <div className="ft-bridge-svg-wrap">
          <svg viewBox="0 0 560 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="520" height="380" rx="24" fill="white" stroke="#E2E8F0" strokeWidth="1.5"/>
            <path d="M60 300 Q160 80 280 200 Q400 320 500 100" stroke="#EEF3FF" strokeWidth="40" strokeLinecap="round" fill="none"/>
            <path className="ft-bridge-line" d="M60 300 Q160 80 280 200 Q400 320 500 100" stroke="#1A56DB" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
            <path className="ft-bridge-line" d="M60 300 Q160 80 280 200 Q400 320 500 100" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" strokeDasharray="6 8"/>
            {[
              { tx:30, ty:270, fill:"#EEF3FF", stroke:"#C7D7F8", emoji:"💳", label:"Loans", textFill:"#1A56DB" },
              { tx:128, ty:58, fill:"#FFF8EC", stroke:"#F5D89A", emoji:"💰", label:"Savings", textFill:"#92400E" },
              { tx:250, ty:170, fill:"#F0FDF4", stroke:"#A7F3D0", emoji:"🛡️", label:"Insurance", textFill:"#065F46" },
              { tx:368, ty:290, fill:"#FEF3C7", stroke:"#FCD34D", emoji:"👴", label:"Pension", textFill:"#92400E" },
              { tx:468, ty:70, fill:"#F5F3FF", stroke:"#C4B5FD", emoji:"🤝", label:"Benefits", textFill:"#5B21B6" },
            ].map(({ tx, ty, fill, stroke, emoji, label, textFill }) => (
              <g className="ft-service-node" transform={`translate(${tx},${ty})`} key={label}>
                <circle cx="30" cy="30" r="28" fill={fill} stroke={stroke} strokeWidth="1.5"/>
                <text x="30" y="36" textAnchor="middle" fontSize="20">{emoji}</text>
                <text x="30" y="72" textAnchor="middle" fontSize="11" fill={textFill} fontFamily="Inter,sans-serif" fontWeight="600">{label}</text>
              </g>
            ))}
            <g transform="translate(210,290)">
              <rect width="140" height="56" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5" filter="url(#ftShadow)"/>
              <text x="12" y="22" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif" fontWeight="600">AI Eligibility Score</text>
              <text x="12" y="44" fontSize="20" fill="#1A56DB" fontFamily="JetBrains Mono,monospace" fontWeight="500">82 / 100</text>
            </g>
            <defs>
              <filter id="ftShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0B1120" floodOpacity="0.08"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon:"💳", name:"Credit Services", desc:"Personal, home, vehicle, education, gold, agricultural & business loans. MSME and working capital covered.", tag:"12 loan types", highlight:false },
  { icon:"💰", name:"Savings & Investments", desc:"FD, RD, SIP, mutual funds, ELSS, sovereign gold bonds, and goal-based investment planning.", tag:"9 products", highlight:false },
  { icon:"🛡️", name:"Insurance", desc:"Life, health, family, vehicle, term, travel, accident, property, and crop insurance under one roof.", tag:"9 categories", highlight:false },
  { icon:"👴", name:"Pension Services", desc:"NPS, Atal Pension Yojana, PM-SYM, senior citizen, widow, and disability pension schemes.", tag:"8 schemes", highlight:false },
  { icon:"🤝", name:"Social Security", desc:"E-Shram, PM Kisan, labour welfare, scholarships, disability benefits, and government subsidy programs.", tag:"9 benefits", highlight:false },
  { icon:"🧮", name:"Smart Calculators", desc:"EMI, FD maturity, SIP returns, retirement corpus, insurance premium — calculate before you commit.", tag:"6 calculators", highlight:true },
];

function Services() {
  return (
    <section className="ft-section ft-services" id="services">
      <div className="ft-section-label">What we offer</div>
      <h2 className="ft-section-title">Every service, one application</h2>
      <p className="ft-section-sub">From your first home loan to retirement planning — stop repeating yourself across a dozen different portals.</p>
      <div className="ft-services-grid">
        {SERVICES.map(s => (
          <div className="ft-service-card" key={s.name} style={s.highlight ? {background:"var(--accent-light)",borderColor:"#c7d7f8"} : {}}>
            <span className="ft-service-icon">{s.icon}</span>
            <div className="ft-service-name">{s.name}</div>
            <div className="ft-service-desc">{s.desc}</div>
            <span className="ft-service-tag" style={s.highlight ? {background:"white"} : {}}>{s.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { num:"01", title:"Upload your documents once", body:"Your Aadhaar, PAN, bank passbook, and salary slips go into your secure Document Vault. Never upload the same file twice, no matter how many services you apply for." },
  { num:"02", title:"Get your AI eligibility score", body:"Our engine analyses your profile and returns an eligibility score, approval probability, financial health score, and recommended providers — instantly." },
  { num:"03", title:"Choose and apply", body:"Pick the best-matched loan, policy, or scheme. Your documents auto-attach and your application is submitted to the provider in seconds." },
  { num:"04", title:"Track every application", body:"Watch real-time status from Submitted → Under Review → Verified → Approved. Notifications keep you informed at every stage." },
];

const DOCS = [
  { icon:"🪪", name:"Aadhaar Card (Front)", age:"Uploaded 3 days ago", status:"Verified", pending:false },
  { icon:"📋", name:"PAN Card", age:"Uploaded 3 days ago", status:"Verified", pending:false },
  { icon:"🏦", name:"Bank Statement (6 months)", age:"Uploaded 1 day ago", status:"Verified", pending:false },
  { icon:"💼", name:"Salary Slip (Last 3 months)", age:"Uploaded 1 day ago", status:"Processing", pending:true },
];

function HowItWorks() {
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 120);
        }
      });
    }, { threshold: 0.2 });
    stepRefs.current.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ft-section ft-how" id="how">
      <div className="ft-section-label">The process</div>
      <h2 className="ft-section-title">Apply once. Access everything.</h2>
      <p className="ft-section-sub">We eliminate the friction between you and financial services with a document vault and AI-powered eligibility matching.</p>
      <div className="ft-steps-wrap">
        <div className="ft-steps-list">
          {STEPS.map((s, i) => (
            <div className="ft-step" key={s.num} ref={el => stepRefs.current[i] = el}>
              <div className="ft-step-num">{s.num}</div>
              <div className="ft-step-body"><h3>{s.title}</h3><p>{s.body}</p></div>
            </div>
          ))}
        </div>
        <div className="ft-how-visual">
          <div className="ft-doc-vault-title">📁 Document Vault</div>
          {DOCS.map(d => (
            <div className="ft-doc-item" key={d.name}>
              <div className="ft-doc-icon">{d.icon}</div>
              <div>
                <div className="ft-doc-name">{d.name}</div>
                <div style={{fontSize:".75rem",color:"var(--muted)"}}>{d.age}</div>
              </div>
              <span className={`ft-doc-status${d.pending ? " pending" : ""}`}>{d.status}</span>
            </div>
          ))}
          <div className="ft-vault-reuse">
            <div className="ft-vault-reuse-title">REUSE ACROSS ALL SERVICES</div>
            <div className="ft-vault-reuse-desc">These documents apply automatically to any loan, insurance, or pension application you start.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const AI_FEATURES = [
  { icon:"🎯", title:"Eligibility Score (0–100)", desc:"A comprehensive score based on income, credit history, employment type, and loan-to-income ratio." },
  { icon:"📊", title:"Approval Probability", desc:"A percentage likelihood of approval based on similar profiles and historical lender data." },
  { icon:"🏦", title:"Bank Recommendation", desc:"Ranked list of lenders most likely to approve your profile with their interest rate ranges." },
  { icon:"⚖️", title:"Risk Assessment", desc:"Understand your risk profile and get actionable steps to improve your eligibility score over time." },
];

const SCORE_ROWS = [
  { label:"Approval Probability", val:"78%", cls:"good" },
  { label:"Financial Health", val:"Strong", cls:"good" },
  { label:"Risk Level", val:"Moderate", cls:"warn" },
  { label:"Max Eligible Loan", val:"₹12,40,000", cls:"" },
  { label:"Recommended EMI", val:"₹18,500 / mo", cls:"" },
  { label:"Top Bank Match", val:"SBI — 8.9% p.a.", cls:"good" },
];

function AIEngine() {
  return (
    <section className="ft-section ft-ai">
      <div className="ft-section-label">AI Eligibility Engine</div>
      <h2 className="ft-section-title">Know your chances before you apply</h2>
      <p className="ft-section-sub">Our engine processes your complete financial profile and returns a set of scores and recommendations — not a rejection letter from a bank.</p>
      <div className="ft-ai-grid">
        {AI_FEATURES.map(f => (
          <div className="ft-ai-feature" key={f.title}>
            <div className="ft-ai-feature-icon">{f.icon}</div>
            <div className="ft-ai-feature-title">{f.title}</div>
            <div className="ft-ai-feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="ft-score-demo">
        <div className="ft-score-ring-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="56" stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none"/>
            <circle cx="70" cy="70" r="56" stroke="#1A56DB" strokeWidth="12" fill="none" strokeDasharray="352" strokeDashoffset="74" strokeLinecap="round" transform="rotate(-90 70 70)"/>
            <circle cx="70" cy="70" r="56" stroke="#E8A020" strokeWidth="12" fill="none" strokeDasharray="352" strokeDashoffset="282" strokeLinecap="round" transform="rotate(189 70 70)" opacity="0.6"/>
          </svg>
          <div className="ft-score-ring-label">
            <div className="ft-score-ring-num">82</div>
            <div className="ft-score-ring-sub">score</div>
          </div>
        </div>
        <div className="ft-score-details">
          {SCORE_ROWS.map(r => (
            <div className="ft-score-row" key={r.label}>
              <span className="ft-score-row-label">{r.label}</span>
              <span className={`ft-score-row-val${r.cls ? " "+r.cls : ""}`}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const AGENT_FEATURES = [
  { icon:"📋", title:"Unified application dashboard", desc:"View all client applications across every service category in one place. Sort by status, type, or amount." },
  { icon:"✅", title:"Document verification tools", desc:"Review uploaded documents, request missing files, and approve submissions — without leaving the portal." },
  { icon:"🤖", title:"AI eligibility on behalf of clients", desc:"Run eligibility checks and present bank recommendations directly to clients during field visits." },
  { icon:"🔔", title:"Real-time status notifications", desc:"Get alerted the moment a client's application moves, a document is requested, or approval is granted." },
];

const APPS = [
  { initials:"RK", gradient:"linear-gradient(135deg,#1A56DB,#0E9F6E)", name:"Rajesh Kumar", type:"Home Loan · SBI", amount:"₹28L", badge:"approved", badgeLabel:"Approved" },
  { initials:"PS", gradient:"linear-gradient(135deg,#7C3AED,#1A56DB)", name:"Priya Sharma", type:"Health Insurance · Star", amount:"₹5L", badge:"review", badgeLabel:"In Review" },
  { initials:"AM", gradient:"linear-gradient(135deg,#E8A020,#EF4444)", name:"Amit Mehta", type:"Personal Loan · HDFC", amount:"₹3.5L", badge:"pending", badgeLabel:"Pending Docs" },
  { initials:"LR", gradient:"linear-gradient(135deg,#0E9F6E,#1A56DB)", name:"Lata Reddy", type:"NPS Pension · Government", amount:"₹2K/mo", badge:"approved", badgeLabel:"Approved" },
  { initials:"VN", gradient:"linear-gradient(135deg,#1A56DB,#7C3AED)", name:"Vijay Nadar", type:"SIP · Axis Mutual Fund", amount:"₹5K/mo", badge:"review", badgeLabel:"Verifying" },
];

function AgentPortal() {
  return (
    <section className="ft-section ft-agents" id="agents">
      <div className="ft-section-label">Agent Portal</div>
      <h2 className="ft-section-title">Built for the people who make it happen</h2>
      <p className="ft-section-sub">Field agents and financial advisors get a dedicated portal to manage client applications, verify documents, and track outcomes — all without manual paperwork.</p>
      <div className="ft-agents-split">
        <div className="ft-agent-features">
          {AGENT_FEATURES.map(f => (
            <div className="ft-agent-feat" key={f.title}>
              <div className="ft-agent-feat-icon">{f.icon}</div>
              <div className="ft-agent-feat-body"><h4>{f.title}</h4><p>{f.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="ft-agent-panel">
          <div className="ft-panel-header">
            <span className="ft-panel-header-title">Agent Dashboard — Applications</span>
            <div className="ft-panel-dots">
              <div className="ft-panel-dot" style={{background:"#FF5F57"}} />
              <div className="ft-panel-dot" style={{background:"#FFBD2E"}} />
              <div className="ft-panel-dot" style={{background:"#27C840"}} />
            </div>
          </div>
          {APPS.map(a => (
            <div className="ft-app-row" key={a.name}>
              <div className="ft-app-avatar" style={{background:a.gradient}}>{a.initials}</div>
              <div><div className="ft-app-name">{a.name}</div><div className="ft-app-type">{a.type}</div></div>
              <div className="ft-app-amount">{a.amount}</div>
              <span className={`ft-status-badge ${a.badge}`}>{a.badgeLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { quote:"I applied for a home loan and health insurance at the same time. My documents went in once, both applications went out together. The whole process took under an hour.", initials:"MR", gradient:"linear-gradient(135deg,#1A56DB,#0E9F6E)", name:"Meera Rajgopal", role:"Teacher, Bengaluru" },
  { quote:"As an agent, I used to maintain spreadsheets for every client. Now I see all their applications in one screen, get notified when something changes, and spend more time helping clients.", initials:"SK", gradient:"linear-gradient(135deg,#E8A020,#1A56DB)", name:"Santosh Kumar", role:"Financial Agent, Pune" },
  { quote:"The AI score told me exactly why my loan eligibility was moderate and what to do about it. Three months later I reapplied and got approved the same week.", initials:"AP", gradient:"linear-gradient(135deg,#7C3AED,#E8A020)", name:"Anand Pillai", role:"Small Business Owner, Chennai" },
];

function Testimonials() {
  return (
    <section className="ft-section ft-trust" id="trust">
      <div className="ft-section-label">Real experiences</div>
      <h2 className="ft-section-title">From people who've crossed the bridge</h2>
      <p className="ft-section-sub" style={{marginBottom:48}}>Customers and agents across India building their financial futures through FinTech.</p>
      <div className="ft-trust-grid">
        {TESTIMONIALS.map(t => (
          <div className="ft-trust-card" key={t.name}>
            <div className="ft-stars">★★★★★</div>
            <p className="ft-trust-quote">"{t.quote}"</p>
            <div className="ft-trust-author">
              <div className="ft-trust-avatar" style={{background:t.gradient}}>{t.initials}</div>
              <div><div className="ft-trust-name">{t.name}</div><div className="ft-trust-role">{t.role}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="ft-cta">
      <div className="ft-cta-inner">
        <h2 className="ft-cta-title">Your financial life, finally in one place</h2>
        <p className="ft-cta-sub">Whether you need a loan, an insurance policy, or your first investment — FinTech connects you to every service without the paperwork maze.</p>
        <div className="ft-cta-actions">
          <a href="#" className="btn btn-white btn-large">Create a free account</a>
          <a href="#" className="btn btn-outline-white btn-large">Agent sign-up →</a>
        </div>
      </div>
    </section>
  );
}

const FOOTER_LINKS = {
  Services: ["Credit Services","Savings & Investments","Insurance","Pension","Social Security"],
  Platform: ["How it works","Document Vault","AI Engine","Agent Portal","Calculators"],
  Company: ["About us","Careers","Privacy Policy","Terms of Service","Contact"],
};

function Footer() {
  return (
    <footer className="ft-footer">
      <div className="ft-footer-top">
        <div>
          <div className="ft-footer-logo">
            <span className="ft-footer-logo-text">FinTech</span>
          </div>
          <p className="ft-footer-desc">A unified digital platform connecting customers and agents to loans, investments, insurance, pensions, and government benefits across India.</p>
          <div className="ft-footer-badges">
            <span className="ft-footer-badge">🔒 Bank-grade security</span>
            <span className="ft-footer-badge">✅ RBI compliant</span>
            <span className="ft-footer-badge">🇮🇳 Made in India</span>
          </div>
        </div>
        {Object.entries(FOOTER_LINKS).map(([col, links]) => (
          <div key={col}>
            <div className="ft-footer-col-title">{col}</div>
            <ul className="ft-footer-links">
              {links.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="ft-footer-bottom">
        <span>© 2026 FinTech Technologies Pvt. Ltd. All rights reserved.</span>
        <span>CIN: U72900MH2024PTC000000 · SEBI Registered</span>
      </div>
    </footer>
  );
}

// ─── Root App ──────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Inject global styles once
    const id = "ft-global-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
      let current = "";
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <Hero />
      <Services />
      <HowItWorks />
      <AIEngine />
      <AgentPortal />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
