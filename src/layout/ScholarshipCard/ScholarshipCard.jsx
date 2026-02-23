import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

    const location = university_location?.country || "Unknown";

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
        <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 p-5 relative overflow-hidden">
            {/* status badge */}
            <div className="absolute top-4 right-4">
                {isOpen() ? (
                    <span role="status" aria-label="Bourse Ouverte" className="inline-flex items-center gap-2 bg-secondary-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
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

            <div className="flex gap-6 items-start">
                {/* logo */}
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-primary-50 flex items-center justify-center ring-1 ring-gray-100 overflow-hidden">
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
                            <p className="text-sm text-gray-500">{ university_name }</p>
                            <h3 className="text-lg font-semibold text-gray-800 mt-1">{ subject_name }</h3>
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