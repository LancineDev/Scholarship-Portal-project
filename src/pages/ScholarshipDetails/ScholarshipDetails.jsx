// ─── ScholarshipDetails ────────────────────────────────────────────────────
// Refactored: helpers hoisted, sub-components extracted, CSS unified.
// ────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { Helmet }              from "react-helmet-async";
import { Link, useParams }     from "react-router-dom";

import Loading         from "../../components/Loading";
import SubscribeButton from "../../components/SubscribeButton";
import useAxiosPublic  from "../../hooks/useAxiosPublic";

// ─── Constants ──────────────────────────────────────────────────────────────

const COVERAGE_KEYWORDS = [
    { k: "tuition",         label: "Frais de scolarité"            },
    { k: "monthly stipend", label: "Allocation mensuelle"          },
    { k: "stipend",         label: "Allocation mensuelle"          },
    { k: "accommodation",   label: "Logement"                      },
    { k: "health insurance",label: "Assurance santé"               },
    { k: "travel allowance",label: "Indemnité de voyage"           },
    { k: "all expenses",    label: "Couverture complète des frais" },
];

// ─── Pure helpers ────────────────────────────────────────────────────────────

/** Returns the first href found in an HTML string, or null. */
function extractFirstLinkFromHtml(html) {
    const m = html?.match(/href=["']([^"']+)["']/i);
    return m?.[1]?.startsWith("http") ? m[1] : null;
}

/** Returns the first bare http(s) URL found in plain text, or null. */
function extractUrlFromText(text) {
    const m = text?.match(/(https?:\/\/[^\s)\]]+)/i);
    return m?.[1] ?? null;
}

/** Returns the best apply-link for a scholarship object. */
function resolveApplyLink(scholarship) {
    if (scholarship.official_link?.startsWith("http")) return scholarship.official_link;
    const desc = scholarship.scholarship_description ?? "";
    return extractUrlFromText(desc) ?? extractFirstLinkFromHtml(desc);
}

/** Returns "OUVERT" or "À VENIR" based on the deadline string. */
function resolveStatus(deadline) {
    try {
        if (!deadline || deadline === "N/A") return "OUVERT";
        const cutoff = new Date("2026-05-23");
        return new Date(deadline) <= cutoff ? "OUVERT" : "À VENIR";
    } catch {
        return "OUVERT";
    }
}

/** Reads/writes the saved-scholarships list in localStorage. */
const savedStorage = {
    getAll() {
        try { return JSON.parse(localStorage.getItem("savedScholarships") ?? "[]"); }
        catch { return []; }
    },
    toggle(id) {
        const set = new Set(savedStorage.getAll());
        set.has(id) ? set.delete(id) : set.add(id);
        localStorage.setItem("savedScholarships", JSON.stringify([...set]));
        return set.has(id);
    },
    includes(id) { return savedStorage.getAll().includes(id); },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Renders structured or raw scholarship description. */
function DescriptionRenderer({ text = "" }) {
    // HTML content → render directly
    if (/</.test(text)) {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    }

    const lower = text.toLowerCase();

    // Coverage
    const coverage = COVERAGE_KEYWORDS
        .filter(({ k }) => lower.includes(k))
        .map(({ label }) => label);

    // Host institutions
    const hostMatch =
        text.match(/Host institutions include\s*([^.]+)/i) ??
        text.match(/Host institutions:\s*([^.]+)/i);
    const hosts = hostMatch?.[1]
        ?.split(/,| and | & /)
        .map(s => s.trim())
        .filter(Boolean);

    // Eligibility
    const eligibility = text.match(/Available for\s*([^.]+)/i)?.[1]?.trim();

    // Selection
    const isCompetitive = /highly competitive|merit-based/.test(lower);

    // Official URL
    const officialUrlMatch = text.match(
        /(?:Official Website|Official site|Official link|Lien officiel)\s*[:\-]?\s*(https?:\/\/[^\s)\]]+)/i
    );
    const officialUrl = officialUrlMatch?.[1];

    // First sentence as lead
    const firstSentence = text.split(/\.(\s|$)/)[0]?.trim();

    return (
        <div>
            {firstSentence && <p style={{ marginBottom: "1em" }}>{firstSentence}.</p>}

            {coverage.length > 0 && (
                <div style={{ marginBottom: "1em" }}>
                    <h3 style={{ marginBottom: 8 }}>Couverture financière</h3>
                    <ul style={{ paddingLeft: "1.2em" }}>
                        {coverage.map(c => <li key={c}>{c}</li>)}
                    </ul>
                </div>
            )}

            {eligibility && (
                <div style={{ marginBottom: "1em" }}>
                    <h3 style={{ marginBottom: 8 }}>Critères d'éligibilité</h3>
                    <p>{eligibility}.</p>
                </div>
            )}

            {hosts?.length > 0 && (
                <div style={{ marginBottom: "1em" }}>
                    <h3 style={{ marginBottom: 8 }}>Universités d'accueil</h3>
                    <p>{hosts.join(", ")}.</p>
                </div>
            )}

            {isCompetitive && (
                <div style={{ marginBottom: "1em" }}>
                    <h3 style={{ marginBottom: 8 }}>Sélection</h3>
                    <p>Processus de sélection compétitif et basé sur le mérite.</p>
                </div>
            )}

            {officialUrl && (
                <div style={{ marginBottom: "1em" }}>
                    <h3 style={{ marginBottom: 8 }}>Site officiel</h3>
                    <p>
                        <a href={officialUrl} target="_blank" rel="noopener noreferrer">
                            {officialUrl}
                        </a>
                    </p>
                </div>
            )}

            {/* Full plain-text fallback */}
            <div style={{ marginTop: 8 }}>
                {text.split(/\n/).map((line, i) => (
                    <p key={i} style={{ marginBottom: "0.8em" }}>{line.trim()}</p>
                ))}
            </div>
        </div>
    );
}

/** Hero section with breadcrumb, logo, stats, tabs, and action buttons. */
function HeroSection({ scholarship, saved, copied, onToggleSave, onShare, activeTab, onTabChange }) {
    const status = resolveStatus(scholarship.application_deadline);
    const { city, country } = scholarship.university_location ?? {};

    return (
        <div className="hero">
            <div className="hero-inner">

                {/* Breadcrumb */}
                <nav className="breadcrumb" aria-label="Fil d'Ariane">
                    <Link to="/">Accueil</Link>
                    <ChevronIcon />
                    <Link to="/all-scholarship">Bourses</Link>
                    <ChevronIcon />
                    <span className="current">{scholarship.university_name}</span>
                </nav>

                {/* Main card */}
                <div className="hero-card">
                    <div className="hero-logo">
                        <img
                            src={scholarship.university_logo}
                            alt={scholarship.university_name}
                            onError={e => { e.target.src = "/logo.png"; }}
                        />
                    </div>

                    <div className="hero-content">
                        <div className="hero-pills">
                            <span className="pill pill-cat">
                                <TriangleIcon /> {scholarship.scholarship_category || "Bourse"}
                            </span>
                            <span className={`pill ${status === "OUVERT" ? "pill-open" : "pill-soon"}`}>
                                <DotIcon /> {status}
                            </span>
                        </div>

                        <h1 className="hero-name">{scholarship.university_name}</h1>
                        <p className="hero-subject">
                            {scholarship.subject_name} · {scholarship.degree || "N/A"}
                        </p>

                        <div className="hero-stats">
                            <StatItem label="Localisation" value={`${city}, ${country}`} />
                            <StatItem label="Date limite"  value={scholarship.application_deadline} variant="coral" />
                            <StatItem
                                label="Frais de dossier"
                                value={scholarship.application_fees ? `${scholarship.application_fees} USD` : "Gratuit"}
                                variant="green"
                            />
                            <StatItem label="Domaine" value={scholarship.subject_name} />
                        </div>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="tabbar">
                    <div className="tabs">
                        {["description", "conditions", "universite"].map((tab, i) => (
                            <button
                                key={tab}
                                className={`tab${activeTab === tab ? " active" : ""}`}
                                onClick={() => onTabChange(tab)}
                            >
                                {["Description", "Conditions", "Université"][i]}
                            </button>
                        ))}
                    </div>
                    <div className="tab-actions">
                        <button className="action-btn" onClick={onToggleSave} aria-pressed={saved}>
                            <HeartIcon /> {saved ? "Sauvegardée" : "Sauvegarder"}
                        </button>
                        <button className="action-btn" onClick={onShare}>
                            <ShareIcon /> {copied ? "Copié !" : "Partager"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** Tab: Conditions d'éligibilité */
function ConditionsTab({ scholarship }) {
    const fields = [
        { label: "Niveau d'étude requis",    value: scholarship.degree },
        { label: "Domaine d'étude",          value: scholarship.subject_name },
        { label: "Frais de dossier",         value: scholarship.application_fees ? `${scholarship.application_fees} USD` : "Gratuit" },
        { label: "Date limite de candidature", value: scholarship.application_deadline },
        { label: "Type de financement",      value: scholarship.scholarship_category },
    ];

    return (
        <div className="tab-panel">
            <div className="tab-panel-section">
                <h3 className="tab-section-title">
                    <span className="tab-section-icon">📋</span>
                    Critères d'admissibilité
                </h3>
                <div className="conditions-grid">
                    {fields.map(({ label, value }) => value && value !== "N/A" && (
                        <div key={label} className="condition-item">
                            <span className="condition-label">{label}</span>
                            <span className="condition-value">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tab-panel-section">
                <h3 className="tab-section-title">
                    <span className="tab-section-icon">📝</span>
                    Processus de candidature
                </h3>
                <div className="steps-list">
                    {[
                        "Vérifiez que vous remplissez les conditions d'éligibilité ci-dessus.",
                        "Préparez tous les documents requis (relevés de notes, lettres de recommandation, CV, lettre de motivation).",
                        "Soumettez votre candidature avant la date limite indiquée.",
                        "Suivez l'état de votre dossier via le portail officiel de l'université.",
                    ].map((step, i) => (
                        <div key={i} className="step-item">
                            <span className="step-number">{i + 1}</span>
                            <p className="step-text">{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tab-panel-note">
                <span className="note-icon">ℹ️</span>
                Les conditions exactes peuvent varier. Consultez le site officiel de l'université pour les exigences complètes et à jour.
            </div>
        </div>
    );
}

/** Tab: Informations sur l'Université */
function UniversiteTab({ scholarship }) {
    const { city, country } = scholarship.university_location ?? {};

    return (
        <div className="tab-panel">
            {/* University identity */}
            <div className="univ-identity">
                <div className="univ-logo-lg">
                    <img
                        src={scholarship.university_logo}
                        alt={scholarship.university_name}
                        onError={e => { e.target.src = "/logo.png"; }}
                    />
                </div>
                <div>
                    <h2 className="univ-name">{scholarship.university_name}</h2>
                    <p className="univ-location">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {city}{city && country ? ", " : ""}{country}
                    </p>
                </div>
            </div>

            {/* Info grid */}
            <div className="tab-panel-section">
                <h3 className="tab-section-title">
                    <span className="tab-section-icon">🏛️</span>
                    Informations générales
                </h3>
                <div className="conditions-grid">
                    {[
                        { label: "Université",  value: scholarship.university_name },
                        { label: "Ville",       value: city },
                        { label: "Pays",        value: country },
                        { label: "Domaine proposé", value: scholarship.subject_name },
                        { label: "Niveau",      value: scholarship.degree },
                    ].map(({ label, value }) => value && value !== "N/A" && (
                        <div key={label} className="condition-item">
                            <span className="condition-label">{label}</span>
                            <span className="condition-value">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tab-panel-note">
                <span className="note-icon">🌐</span>
                Pour en savoir plus sur l'université, ses programmes et son campus, visitez le site officiel via le bouton «&nbsp;Postuler&nbsp;» dans la sidebar.
            </div>
        </div>
    );
}

/** Sidebar with detail list, apply CTA, subscribe and assistance links. */
function Sidebar({ scholarship, applyLink }) {
    const { city, country } = scholarship.university_location ?? {};

    return (
        <aside className="sidebar">
            {/* Details card */}
            <div className="side-card">
                <CardHeader title="Détails" />
                <div className="detail-list">
                    <DetailRow label="Financement"    value={scholarship.scholarship_category} />
                    <DetailRow label="Date limite"    value={scholarship.application_deadline} />
                    <DetailRow label="Ville"          value={city} />
                    <DetailRow label="Pays"           value={country} />
                    <DetailRow label="Domaine d'étude" value={scholarship.subject_name} />
                </div>
            </div>

            {/* Apply button */}
            {applyLink ? (
                <a href={applyLink} target="_blank" rel="noopener noreferrer" className="btn-apply">
                    Postuler sur le site officiel ↗
                </a>
            ) : (
                <button className="btn-apply" disabled>
                    Lien officiel indisponible
                </button>
            )}

            {/* Subscribe */}
            <SubscribeButton
                scholarshipId={scholarship._id}
                scholarshipName={scholarship.university_name}
            />

            {/* Assistance */}
            <Link to={`/assistance/${scholarship._id}`} className="btn-assist">
                <span className="btn-assist-title">Besoin d'aide ?</span>
                <small className="btn-assist-sub">Aide professionnelle · 50 $ USD</small>
            </Link>

            {/* Disclaimer */}
            <p className="disclaimer">
                <strong>10bourse</strong> n'est pas affilié au fournisseur de bourses.
                Nous offrons des informations indépendantes et une assistance optionnelle
                pour les demandes.
            </p>
        </aside>
    );
}

// ─── Tiny presentational helpers ─────────────────────────────────────────────

function CardHeader({ title }) {
    return (
        <div className="card-hd">
            <div className="card-hd-bar" />
            <span className="card-hd-title">{title}</span>
        </div>
    );
}

function StatItem({ label, value, variant }) {
    return (
        <div className="stat">
            <div className="stat-label">{label}</div>
            <div className={`stat-val${variant ? ` ${variant}` : ""}`}>{value ?? "—"}</div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="detail-row">
            <span className="dl">{label}</span>
            <span className="dv">{value ?? "—"}</span>
        </div>
    );
}

// ─── Icon micro-components ───────────────────────────────────────────────────

const ChevronIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
);

const TriangleIcon = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
    </svg>
);

const DotIcon = () => (
    <svg width="7" height="7" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
);

const HeartIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const ShareIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5"  r="3" />
        <circle cx="6"  cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49" />
    </svg>
);

// ─── Styles (single source of truth) ─────────────────────────────────────────

const STYLES = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
    --bg:          #f4f3ef;
    --surface:     #ffffff;
    --surface2:    #f9f9f7;
    --border:      rgba(0,0,0,0.07);
    --border2:     rgba(0,0,0,0.04);
    --accent:      #1a1a2e;
    --coral:       #e05c3a;
    --coral-dim:   rgba(224,92,58,0.09);
    --coral-mid:   rgba(224,92,58,0.18);
    --open:        #0a7c52;
    --open-bg:     rgba(10,124,82,0.09);
    --soon:        #7c3aed;
    --soon-bg:     rgba(124,58,237,0.08);
    --text:        #0f1523;
    --text2:       #64748b;
    --sub:         #a8b2c4;
    --shadow-sm:   0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md:   0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05);
    --shadow-lg:   0 16px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
}

html { scroll-behavior: smooth; }
body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    min-height: 100vh;
}

/* ── HERO ─────────────────────────────────────────────────────────────── */
.hero {
    position: relative;
    overflow: hidden;
    padding: 0 24px;
    background: #CD5C5C;
    z-index: 0;
}
.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 55% 80% at 5% 50%,  rgba(224,92,58,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 40% 60% at 90% 10%, rgba(255,255,255,0.05) 0%, transparent 55%),
        radial-gradient(ellipse 25% 40% at 70% 90%, rgba(224,92,58,0.10) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}
.hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
    pointer-events: none;
    z-index: 0;
}
.hero-inner {
    position: relative;
    z-index: 2;
    max-width: 1160px;
    margin: 0 auto;
    padding: 52px 0 14px;
}

/* ── BREADCRUMB ───────────────────────────────────────────────────────── */
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 40px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
}
.breadcrumb a        { color: rgba(255,255,255,0.5); text-decoration: none; transition: color .15s; }
.breadcrumb a:hover  { color: #e05c3a; }
.breadcrumb .current { color: rgba(255,255,255,0.75); }

/* ── HERO CARD ────────────────────────────────────────────────────────── */
.hero-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 24px;
    padding: 44px 48px;
    display: flex;
    gap: 36px;
    align-items: flex-start;
    backdrop-filter: blur(12px);
    animation: fadeUp .45s ease both;
}
@media (max-width: 640px) { .hero-card { flex-direction: column; padding: 28px 24px; } }

.hero-logo {
    flex-shrink: 0;
    width: 96px; height: 96px;
    border-radius: 18px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
.hero-logo img { width: 72px; height: 72px; object-fit: contain; border-radius: 10px; }

.hero-content  { flex: 1; min-width: 0; }

.hero-pills    { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }

/* Pill base */
.pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding: 4px 12px;
    border-radius: 20px;
    text-transform: uppercase;
}
.pill-cat  { background: rgba(224,92,58,0.18); color: #ff8a6e; border: 1px solid rgba(224,92,58,0.30); }
.pill-open { background: rgba(10,200,130,0.15); color: #0dd48a; border: 1px solid rgba(10,200,130,0.25); }
.pill-soon { background: rgba(167,139,250,0.15); color: #c4b5fd; border: 1px solid rgba(167,139,250,0.25); }

.hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: clamp(2rem, 3.5vw, 2.9rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-bottom: 8px;
}
.hero-subject { font-size: 14px; color: rgba(255,255,255,0.45); font-weight: 300; margin-bottom: 28px; }

/* Stats strip */
.hero-stats {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 14px;
    overflow: hidden;
    background: rgba(255,255,255,0.04);
}
.stat              { flex: 1; min-width: 120px; padding: 14px 20px; border-right: 1px solid rgba(255,255,255,0.07); }
.stat:last-child   { border-right: none; }
.stat-label        { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: rgba(255,255,255,0.30); text-transform: uppercase; margin-bottom: 5px; }
.stat-val          { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); }
.stat-val.coral    { color: #ff8a6e; }
.stat-val.green    { color: #0dd48a; }

/* ── TAB BAR ──────────────────────────────────────────────────────────── */
.tabbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    max-width: 1160px;
    margin: 0 auto;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-top: none;
    border-radius: 0 0 20px 20px;
}
@media (max-width: 640px) { .tabbar { padding: 0 16px; } }

.tabs { display: flex; }
.tab {
    padding: 15px 22px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.35);
    cursor: pointer;
    border: none;
    border-bottom: 2px solid transparent;
    background: none;
    font-family: 'DM Sans', sans-serif;
    transition: color .15s, border-color .15s;
}
.tab.active { color: #e05c3a; border-bottom-color: #e05c3a; }
.tab:hover  { color: rgba(255,255,255,0.70); }

.tab-actions { display: flex; gap: 8px; }
.action-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.80);
    font-size: 12px; font-weight: 500;
    background: rgba(255,255,255,0.08);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all .18s;
}
.action-btn:hover { border-color: rgba(224,92,58,0.55); color: #ff8a6e; background: rgba(224,92,58,0.12); }

/* ── MAIN LAYOUT ──────────────────────────────────────────────────────── */
.main-wrap {
    max-width: 1160px;
    margin: 0 auto;
    padding: 36px 24px 100px;
    position: relative;
    z-index: 3;
}
.content-grid {
    display: grid;
    grid-template-columns: 1fr 308px;
    gap: 24px;
    align-items: start;
    animation: fadeUp .5s .1s ease both;
}
@media (max-width: 800px) { .content-grid { grid-template-columns: 1fr; } }

/* ── DESCRIPTION CARD ─────────────────────────────────────────────────── */
.desc-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}
.card-hd {
    padding: 20px 28px;
    border-bottom: 1px solid var(--border2);
    display: flex;
    align-items: center;
    gap: 12px;
}
.card-hd-bar   { width: 3px; height: 16px; border-radius: 2px; background: linear-gradient(180deg, #e05c3a 0%, #1a1a2e 100%); flex-shrink: 0; }
.card-hd-title { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text2); }

.desc-body {
    padding: 32px;
    font-size: 14.5px;
    line-height: 1.9;
    color: #475569;
    font-weight: 300;
}
.desc-body p              { margin-bottom: 1.2em; }
.desc-body strong,
.desc-body b              { color: var(--text); font-weight: 600; }
.desc-body a              { color: var(--coral); text-decoration: underline; text-underline-offset: 3px; }
.desc-body ul,
.desc-body ol             { padding-left: 1.5em; margin-bottom: 1.2em; }
.desc-body li             { margin-bottom: 0.5em; }
.desc-body h2,
.desc-body h3             { font-family: 'Cormorant Garamond', serif; color: var(--text); font-weight: 700; margin: 1.5em 0 0.6em; line-height: 1.2; }
.desc-body h2             { font-size: 1.5rem; }
.desc-body h3             { font-size: 1.25rem; }

/* ── SIDEBAR ──────────────────────────────────────────────────────────── */
.sidebar    { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 24px; }
.side-card  { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-sm); }

.detail-list { padding: 4px 0; }
.detail-row {
    padding: 13px 22px;
    border-bottom: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.detail-row:last-child { border-bottom: none; }
.dl  { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sub); }
.dv  { font-size: 13px; color: var(--text); font-weight: 500; text-align: right; }

/* ── BUTTONS ──────────────────────────────────────────────────────────── */
.btn-apply {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 16px 20px;
    border-radius: 14px;
    background: var(--accent);
    color: #ffffff;
    font-size: 14px; font-weight: 600;
    text-decoration: none;
    border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.01em;
    position: relative; overflow: hidden;
    box-shadow: 0 4px 20px rgba(26,26,46,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
    transition: all .22s ease;
}
.btn-apply::after    { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(224,92,58,0) 0%, rgba(224,92,58,0.18) 100%); opacity: 0; transition: opacity .22s; }
.btn-apply:hover     { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,26,46,0.30); }
.btn-apply:hover::after { opacity: 1; }
.btn-apply:disabled  { background: #e2e8f0; color: var(--sub); cursor: not-allowed; box-shadow: none; transform: none; }

.btn-assist {
    display: flex; flex-direction: column; align-items: center;
    padding: 18px 20px;
    border-radius: 14px;
    background: var(--soon-bg);
    border: 1px solid rgba(124,58,237,0.15);
    text-decoration: none; cursor: pointer; gap: 4px;
    transition: all .18s ease;
}
.btn-assist:hover        { background: rgba(124,58,237,0.12); border-color: rgba(124,58,237,0.28); transform: translateY(-1px); }
.btn-assist-title        { font-size: 14px; font-weight: 600; color: #7c3aed; }
.btn-assist-sub          { font-size: 11.5px; color: rgba(124,58,237,0.50); }

/* ── DISCLAIMER ───────────────────────────────────────────────────────── */
.disclaimer {
    font-size: 11.5px;
    color: var(--sub);
    line-height: 1.7;
    padding: 15px 18px;
    background: #f9f9f7;
    border: 1px solid var(--border2);
    border-radius: 12px;
}
.disclaimer strong { color: var(--text2); }

/* ── TAB PANELS ───────────────────────────────────────────────────────── */
.tab-panel { padding: 28px 32px; }

.tab-panel-section { margin-bottom: 28px; }

.tab-section-title {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text2);
    margin-bottom: 16px; padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
}
.tab-section-icon { font-size: 14px; }

/* Conditions grid */
.conditions-grid { display: flex; flex-direction: column; gap: 0; }
.condition-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--border2);
    gap: 16px;
}
.condition-item:last-child { border-bottom: none; }
.condition-label { font-size: 13px; color: var(--text2); font-weight: 400; }
.condition-value { font-size: 13px; color: var(--text); font-weight: 600; text-align: right; }

/* Steps */
.steps-list { display: flex; flex-direction: column; gap: 14px; }
.step-item { display: flex; align-items: flex-start; gap: 14px; }
.step-number {
    flex-shrink: 0;
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--coral-dim);
    border: 1px solid var(--coral-mid);
    color: var(--coral);
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
}
.step-text { font-size: 14px; line-height: 1.7; color: #475569; font-weight: 300; padding-top: 3px; }

/* Note banner */
.tab-panel-note {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 14px 16px;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 10px;
    font-size: 13px; color: #0369a1; line-height: 1.6;
    margin-top: 8px;
}
.note-icon { font-size: 15px; flex-shrink: 0; }

/* Université tab */
.univ-identity {
    display: flex; align-items: center; gap: 20px;
    padding: 20px 0 24px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 24px;
}
.univ-logo-lg {
    width: 72px; height: 72px; flex-shrink: 0;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--surface2);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}
.univ-logo-lg img { width: 54px; height: 54px; object-fit: contain; border-radius: 8px; }
.univ-name { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 700; color: var(--text); line-height: 1.2; margin-bottom: 6px; }
.univ-location { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--text2); font-weight: 300; }

/* ── ANIMATION ────────────────────────────────────────────────────────── */
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0);    }
}
`;

// ─── Main component ───────────────────────────────────────────────────────────

const ScholarshipDetails = () => {
    const { id }         = useParams();
    const axiosPublic    = useAxiosPublic();

    const [scholarship, setScholarship] = useState(null);
    const [loading,     setLoading]     = useState(true);
    const [error,       setError]       = useState(null);
    const [saved,       setSaved]       = useState(false);
    const [copied,      setCopied]      = useState(false);
    const [activeTab,   setActiveTab]   = useState("description");

    // Fetch scholarship
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const { data } = await axiosPublic.get(`/top-scholarships/${id}`);
                if (!cancelled) setScholarship(data);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [id, axiosPublic]);

    // Sync saved state once scholarship is loaded
    useEffect(() => {
        if (scholarship?._id) setSaved(savedStorage.includes(scholarship._id));
    }, [scholarship?._id]);

    // Handlers
    const handleToggleSave = () => {
        if (!scholarship?._id) return;
        setSaved(savedStorage.toggle(scholarship._id));
    };

    const handleShare = async () => {
        if (!scholarship?._id) return;
        const url = `${window.location.origin}/scholarships/${scholarship._id}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: scholarship.university_name, text: scholarship.scholarship_name ?? "", url });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }
        } catch { /* user cancelled or unsupported */ }
    };

    // ── Render states
    if (loading || !scholarship) return <Loading />;
    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500 text-sm">Erreur&nbsp;: {error}</p>
        </div>
    );

    const applyLink = resolveApplyLink(scholarship);

    return (
        <>
            <Helmet>
                <title>{scholarship.university_name || "Détails de la Bourse"} | Détails de la Bourse</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
            </Helmet>

            <style>{STYLES}</style>

            {/* Hero */}
            <HeroSection
                scholarship={scholarship}
                saved={saved}
                copied={copied}
                onToggleSave={handleToggleSave}
                onShare={handleShare}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Body */}
            <div className="main-wrap">
                <div className="content-grid">

                    {/* Left — Tab content */}
                    <div className="desc-card">
                        {activeTab === "description" && (
                            <>
                                <CardHeader title="Description de la bourse" />
                                <div className="desc-body">
                                    <DescriptionRenderer text={scholarship.scholarship_description} />
                                </div>
                            </>
                        )}
                        {activeTab === "conditions" && (
                            <>
                                <CardHeader title="Conditions d'éligibilité" />
                                <ConditionsTab scholarship={scholarship} />
                            </>
                        )}
                        {activeTab === "universite" && (
                            <>
                                <CardHeader title="À propos de l'université" />
                                <UniversiteTab scholarship={scholarship} />
                            </>
                        )}
                    </div>

                    {/* Right — Sidebar */}
                    <Sidebar scholarship={scholarship} applyLink={applyLink} />

                </div>
            </div>
        </>
    );
};

export default ScholarshipDetails;