import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ScholarshipCard = ({ scholarship }) => {
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
    const variant = (() => {
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

    const cardBase = "group w-full max-w-4xl rounded-2xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 p-6 relative overflow-hidden";
    const cardVariant = variant === 'warning'
        ? "bg-warning-50 dark:bg-warning-900 border border-warning-200 dark:border-warning-700"
        : "bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700";

    return (
        <div className={`${cardBase} ${cardVariant}`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${variant === 'warning' ? 'bg-warning-500' : 'bg-green-500'}`} />
            {/* status badge */}
            <div className="absolute top-4 right-4">
                {isOpen() ? (
                    <span role="status" aria-label="Bourse Ouverte" className="inline-flex items-center gap-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 10l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                        </svg>
                        <span className="leading-none">OUVERT</span>
                    </span>
                ) : (
                    <span role="status" aria-label="À venir" className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="leading-none">À VENIR</span>
                    </span>
                )}
            </div>

            {/* quick actions: save, share, quick apply (visible on hover) */}
            <div className="absolute top-16 right-4 flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                <button onClick={ toggleSave } aria-pressed={ saved } aria-label={ saved ? 'Unsave' : 'Save' } className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:scale-105 transition">
                    { saved ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657 3.172 11.828a4 4 0 010-5.656z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5A4.5 4.5 0 017.5 4h0A4.5 4.5 0 0112 8.5 4.5 4.5 0 0116.5 4h0A4.5 4.5 0 0121 8.5c0 6-9 11.5-9 11.5S3 14.5 3 8.5z" />
                        </svg>
                    ) }
                </button>

                <button onClick={ shareScholarship } aria-label="Share" className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:scale-105 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v.01M20 12v.01M12 4v.01M12 20v.01M7.05 7.05l.01.01M16.95 16.95l.01.01M16.95 7.05l.01.01M7.05 16.95l.01.01" />
                    </svg>
                </button>

                <a href={ scholarship.apply_link || '#' } target="_blank" rel="noopener noreferrer" aria-label="Apply" className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:scale-105 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>

            <div className="flex gap-6 items-start">
                {/* logo */}
                <div className={`flex-shrink-0 w-20 h-20 rounded-xl bg-primary-50 flex items-center justify-center ring-1 ${variant === 'warning' ? 'ring-warning-200 dark:ring-warning-700' : 'ring-green-200 dark:ring-green-700'} overflow-hidden`}>
                    <img
                        className="w-16 h-16 object-cover rounded-lg"
                        src={ university_logo }
                        alt={ `${university_name} logo` }
                        onError={(e) => { e.target.src = "/logo.png"; }}
                    />
                </div>

                {/* main content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex text-xs font-medium uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{ subject_name }</span>
                            </div>
                            <h3 className="text-2xl font-extrabold text-green-800 mt-2">{ university_name }</h3>
                        </div>

                        <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-2">
                            <div className="text-sm text-gray-500">{ location }</div>
                            <div className="text-sm font-medium text-gray-700">{ application_fees } USD</div>
                        </div>
                    </div>

                    {/* optional short description snippet */}
                    { (scholarship.description || scholarship.summary) && (
                        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{ (scholarship.description || scholarship.summary).slice(0, 140) }{ (scholarship.description || scholarship.summary).length > 140 ? '...' : '' }</p>
                    ) }

                    <div className="mt-4 flex items-center gap-3 flex-wrap">
                        <span className="bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm whitespace-nowrap">{ scholarship_category }</span>
                        <span className="text-gray-500 text-sm flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            { location }
                        </span>
                        <span className="ml-auto sm:ml-0 text-sm text-gray-500 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            { application_deadline }
                        </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        <Link to={ `/scholarships/${_id}` } className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary-200 text-primary-700 hover:bg-primary-50 transition">
                            Détails
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>

                        { scholarship.apply_link ? (
                            <a href={ scholarship.apply_link } target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary-500 text-white hover:bg-secondary-600 transition">
                                Postuler
                            </a>
                        ) : (
                            <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">Postuler</button>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );
};

ScholarshipCard.propTypes = {
    scholarship: PropTypes.object,
};

export default ScholarshipCard;