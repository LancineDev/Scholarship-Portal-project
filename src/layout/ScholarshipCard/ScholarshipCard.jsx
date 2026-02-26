import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./scholarship-card.css";

const ScholarshipCard = ({ scholarship, compact = false }) => {
    if (!scholarship) return null;
    
    const {
        _id, 
        university_name = "Unknown University", 
        university_logo = "/logo.png", 
        scholarship_category = "Unknown", 
        university_location = {}, 
        application_deadline = "N/A", 
        subject_name = "General", 
        application_fees = 0 
    } = scholarship;

    // Saved (local favorites) state stored in localStorage
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        try {
            const savedList = JSON.parse(localStorage.getItem('savedScholarships') || '[]');
            setSaved(Array.isArray(savedList) && savedList.includes(_id));
        } catch (e) {
            setSaved(false);
        }
    }, [_id]);

    const toggleSave = () => {
        try {
            const raw = localStorage.getItem('savedScholarships');
            const arr = raw ? JSON.parse(raw) : [];
            const set = new Set(arr);
            if (set.has(_id)) set.delete(_id);
            else set.add(_id);
            const next = Array.from(set);
            localStorage.setItem('savedScholarships', JSON.stringify(next));
            setSaved(set.has(_id));
        } catch (e) {
            // ignore
        }
    };

    const shareScholarship = async () => {
        const url = `${window.location.origin}/scholarships/${_id}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: university_name, text: scholarship.scholarship_name || '', url });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }
        } catch (e) {
            // silent
        }
    };

    const location = university_location?.country || "Unknown";

    // Variant selection (deterministic): use _id or university name to alternate colors
    const colorVariant = (() => {
        const seed = String(_id || university_name || "");
        let sum = 0;
        for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
        return sum % 2 === 0 ? 'secondary' : 'warning';
    })();

    // Determine if scholarship is open or coming soon
    // Open: deadline within next 90 days (by May 23, 2026)
    // Coming Soon: deadline after May 23, 2026
    const isOpen = () => {
        if (application_deadline === "N/A") return true;
        const deadline = new Date(application_deadline);
        const cutoffDate = new Date("2026-05-23");
        return deadline <= cutoffDate;
    };

    return (
        <div className={`sc-card ${compact ? 'compact' : ''}`}>
            <div className="sc-accent-bar" />

            <div className="row between" style={{ marginBottom: compact ? 14 : 18 }}>
                { isOpen() ? (
                    <span className="sc-badge-open" role="status" aria-label="Open">OUVERT</span>
                ) : (
                    <span className="sc-badge-coming" role="status" aria-label="Coming">À VENIR</span>
                ) }

                <div className="sc-actions">
                    <button onClick={ toggleSave } aria-pressed={ saved } aria-label={ saved ? 'Unsave' : 'Save' } className={`sc-action-btn ${saved ? 'saved' : ''}`}>
                        {/* heart / saved icon */}
                        { saved ? (
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657 3.172 11.828a4 4 0 010-5.656z"/></svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                        ) }
                    </button>

                    <button onClick={ shareScholarship } aria-label="Share" className="sc-action-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    </button>

                    <a href={ scholarship.apply_link || '#' } target="_blank" rel="noopener noreferrer" className="sc-action-btn apply" aria-label="Apply">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>

            <div className="row start gap-20">
                <div className="sc-logo-wrap" style={ compact ? { width: 48, height: 48 } : undefined }>
                    <img src={ university_logo } alt={`${university_name} logo`} onError={(e)=>{e.target.src='/logo.png'}} />
                </div>

                <div className="flex-1">
                    <span className="sc-subject-pill">{subject_name}</span>
                    <div className={`row between start mt-8 ${compact ? '' : 'gap-10'}`}
                        style={ compact ? undefined : undefined }>
                        <h3 className="sc-university-name" style={ compact ? { fontSize: 20 } : undefined }>{ compact ? (university_name.length > 24 ? university_name.slice(0,22)+'…' : university_name) : university_name }</h3>
                        <div className="text-right shrink-0">
                            <div className="sc-fees">{ application_fees ? `${application_fees} USD` : 'Gratuit' }</div>
                            { !compact && <div style={{ fontSize: 11, color: 'var(--c-sub)', marginTop: 2 }}>{ location }</div> }
                        </div>
                    </div>

                    { !compact && (scholarship.description || scholarship.summary) && (
                        <p className="sc-description">{ (scholarship.description || scholarship.summary).slice(0, 240) }</p>
                    ) }

                    <div className="sc-divider" />

                    <div className="row wrap gap-14">
                        <span className="sc-category-pill">{ scholarship_category }</span>
                        <div className="sc-dot" />
                        <span className="sc-meta-item">{ location }</span>
                        <div className="sc-dot" />
                        <span className="sc-meta-item">{ application_deadline }</span>
                    </div>

                    { !compact && (
                        <div className="row gap-10 mt-18">
                            <Link to={`/scholarships/${_id}`} className="sc-btn-detail">Détails <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg></Link>
                            { scholarship.apply_link ? (
                                <a href={ scholarship.apply_link } target="_blank" rel="noopener noreferrer" className="sc-btn-apply">Postuler</a>
                            ) : (
                                <button disabled className="sc-btn-apply" style={{opacity:0.6}}>Postuler</button>
                            ) }
                        </div>
                    ) }
                </div>
            </div>
        </div>
    );
};

ScholarshipCard.propTypes = {
    scholarship: PropTypes.object,
    compact: PropTypes.bool,
};

export default ScholarshipCard;