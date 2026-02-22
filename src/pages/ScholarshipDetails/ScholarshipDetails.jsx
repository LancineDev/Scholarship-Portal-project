import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ScholarshipDetails = () => {
    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchScholarshipDetails = async () => {
            try {
                const response = await axiosPublic.get(`/top-scholarships/${id}`);
                setScholarship(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchScholarshipDetails();
    }, [id, axiosPublic]);

    if (loading || !scholarship) return <Loading />;
    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500 text-sm">Error: {error}</p>
        </div>
    );

        // Helper: extract first link from HTML string
        function extractFirstLink(html) {
            const match = html && html.match(/href=["']([^"']+)["']/i);
            return match && match[1] && match[1].startsWith('http') ? match[1] : null;
        }

        const fallbackLink = extractFirstLink(scholarship.scholarship_description);
        const applyLink = scholarship.official_link && scholarship.official_link.startsWith('http')
            ? scholarship.official_link
            : fallbackLink;

        return (
                <>
            <Helmet>
                <title>{scholarship?.university_name || 'Détails de la Bourse'} | Détails de la Bourse</title>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Helmet>

            <style>{`
                .sd-wrap * { box-sizing: border-box; }

                .sd-wrap {
                    font-family: 'Inter', sans-serif;
                    color: #1a1a2e;
                    min-height: 100vh;
                    padding: 48px 20px 80px;
                }

                .sd-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                }

                /* ── BREADCRUMB ── */
                .sd-breadcrumb {
                    font-size: 12px;
                    color: #94a3b8;
                    margin-bottom: 36px;
                    letter-spacing: 0.03em;
                }
                .sd-breadcrumb span { color: #1a1a2e; font-weight: 500; }

                /* ── HERO CARD ── */
                .sd-hero {
                    background: #fff;
                    border: 1px solid #e8ecf2;
                    border-radius: 24px;
                    padding: 40px 44px;
                    display: flex;
                    gap: 32px;
                    align-items: flex-start;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 24px rgba(0,0,0,0.05);
                    animation: fadeUp 0.5s ease both;
                }

                @media (max-width: 640px) {
                    .sd-hero { flex-direction: column; padding: 28px 22px; }
                }

                .sd-logo-box {
                    flex-shrink: 0;
                    width: 96px;
                    height: 96px;
                    border: 1px solid #e8ecf2;
                    border-radius: 18px;
                    overflow: hidden;
                    background: #f8f9fc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .sd-logo-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    padding: 10px;
                }

                .sd-hero-text { flex: 1; }

                .sd-tag {
                    display: inline-block;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #3b82f6;
                    background: #eff6ff;
                    border: 1px solid #bfdbfe;
                    border-radius: 999px;
                    padding: 3px 12px;
                    margin-bottom: 14px;
                }

                .sd-university {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.6rem, 3vw, 2.4rem);
                    font-weight: 700;
                    line-height: 1.2;
                    color: #0f172a;
                    margin-bottom: 6px;
                }

                .sd-subject {
                    font-size: 14px;
                    color: #64748b;
                    font-weight: 400;
                    margin-bottom: 20px;
                }

                .sd-meta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    align-items: center;
                }

                .sd-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 13px;
                    color: #475569;
                }

                .sd-meta-icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 8px;
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    flex-shrink: 0;
                }

                .sd-meta-label { color: #94a3b8; font-size: 11px; display: block; }
                .sd-meta-val   { color: #1e293b; font-weight: 500; font-size: 13px; display: block; }

                .sd-funded {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #16a34a;
                    background: #f0fdf4;
                    border: 1px solid #bbf7d0;
                    border-radius: 999px;
                    padding: 4px 13px;
                }
                .sd-funded::before {
                    content: '';
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #22c55e;
                    flex-shrink: 0;
                }

                /* ── GRID ── */
                .sd-grid {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 24px;
                    animation: fadeUp 0.5s 0.08s ease both;
                }

                @media (max-width: 760px) {
                    .sd-grid { grid-template-columns: 1fr; }
                }

                /* ── DESCRIPTION CARD ── */
                .sd-desc-card {
                    background: #fff;
                    border: 1px solid #e8ecf2;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
                }

                .sd-card-title {
                    padding: 18px 28px;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 11.5px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #94a3b8;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .sd-card-title::before {
                    content: '';
                    width: 3px;
                    height: 14px;
                    border-radius: 2px;
                    background: #3b82f6;
                    flex-shrink: 0;
                }

                .sd-desc-body {
                    padding: 28px 30px;
                    font-size: 14.5px;
                    line-height: 1.85;
                    color: #475569;
                    font-weight: 300;
                }
                .sd-desc-body p { margin-bottom: 1em; }
                .sd-desc-body strong { color: #1e293b; font-weight: 600; }
                .sd-desc-body a { color: #3b82f6; }
                .sd-desc-body ul, .sd-desc-body ol { padding-left: 1.4em; margin-bottom: 1em; }
                .sd-desc-body li { margin-bottom: 0.4em; }

                /* ── SIDEBAR ── */
                .sd-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .sd-side-card {
                    background: #fff;
                    border: 1px solid #e8ecf2;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
                }

                .sd-side-body { padding: 6px 0; }

                .sd-detail-row {
                    padding: 13px 22px;
                    border-bottom: 1px solid #f8fafc;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .sd-detail-row:last-child { border-bottom: none; }

                .sd-dl { font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; }
                .sd-dv { font-size: 13.5px; color: #1e293b; font-weight: 500; }

                /* Buttons */
                .sd-btn-apply {
                    display: block;
                    padding: 15px;
                    border-radius: 14px;
                    background: #2563eb;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    text-align: center;
                    text-decoration: none;
                    letter-spacing: 0.01em;
                    transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
                    box-shadow: 0 4px 18px rgba(37,99,235,0.28);
                }
                .sd-btn-apply:hover {
                    background: #1d4ed8;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 28px rgba(37,99,235,0.35);
                }

                .sd-btn-assist {
                    display: block;
                    padding: 14px;
                    border-radius: 14px;
                    background: #fff;
                    color: #7c3aed;
                    font-size: 13.5px;
                    font-weight: 600;
                    text-align: center;
                    text-decoration: none;
                    border: 2px solid #7c3aed;
                    transition: background 0.18s, transform 0.18s;
                }
                .sd-btn-assist:hover {
                    background: #faf5ff;
                    transform: translateY(-1px);
                }
                .sd-btn-assist small {
                    display: block;
                    font-weight: 400;
                    font-size: 11.5px;
                    color: #a78bfa;
                    margin-top: 2px;
                }

                .sd-disclaimer {
                    font-size: 11.5px;
                    color: #94a3b8;
                    line-height: 1.7;
                    padding: 14px 18px;
                    background: #f8fafc;
                    border: 1px solid #e8ecf2;
                    border-radius: 14px;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="sd-wrap">
                <div className="sd-inner">

                    {/* Breadcrumb */}
                    <div className="sd-breadcrumb">
                        Scholarships / <span>{scholarship.university_name}</span>
                    </div>

                    {/* Hero */}
                    <div className="sd-hero">
                        <div className="sd-logo-box">
                            <img src={scholarship.university_logo} alt={`${scholarship.university_name} logo`} />
                        </div>

                        <div className="sd-hero-text">
                            <div className="sd-tag">Scholarship</div>
                            <h1 className="sd-university">{scholarship.university_name}</h1>
                            <p className="sd-subject">{scholarship.subject_name}</p>

                            <div className="sd-meta-row">
                                <div className="sd-meta-item">
                                    <div className="sd-meta-icon">📍</div>
                                    <div>
                                        <span className="sd-meta-label">Location</span>
                                        <span className="sd-meta-val">
                                            {scholarship.university_location?.city}, {scholarship.university_location?.country}
                                        </span>
                                    </div>
                                </div>
                                <div className="sd-meta-item">
                                    <div className="sd-meta-icon">📅</div>
                                    <div>
                                        <span className="sd-meta-label">Deadline</span>
                                        <span className="sd-meta-val">{scholarship.application_deadline}</span>
                                    </div>
                                </div>
                                <div className="sd-meta-item">
                                    <span className="sd-funded">{scholarship.scholarship_category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Body Grid */}
                    <div className="sd-grid">

                        {/* Description */}
                        <div className="sd-desc-card">
                            <div className="sd-card-title">Scholarship Description</div>
                            <div
                                className="sd-desc-body"
                                dangerouslySetInnerHTML={{ __html: scholarship.scholarship_description }}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="sd-sidebar">
                            <div className="sd-side-card">
                                <div className="sd-card-title">Details</div>
                                <div className="sd-side-body">
                                    <div className="sd-detail-row">
                                        <span className="sd-dl">Funding</span>
                                        <span className="sd-dv">{scholarship.scholarship_category}</span>
                                    </div>
                                    <div className="sd-detail-row">
                                        <span className="sd-dl">Deadline</span>
                                        <span className="sd-dv">{scholarship.application_deadline}</span>
                                    </div>
                                    <div className="sd-detail-row">
                                        <span className="sd-dl">City</span>
                                        <span className="sd-dv">{scholarship.university_location?.city}</span>
                                    </div>
                                    <div className="sd-detail-row">
                                        <span className="sd-dl">Country</span>
                                        <span className="sd-dv">{scholarship.university_location?.country}</span>
                                    </div>
                                    <div className="sd-detail-row">
                                        <span className="sd-dl">Field of Study</span>
                                        <span className="sd-dv">{scholarship.subject_name}</span>
                                    </div>
                                </div>
                            </div>

                                                        {applyLink ? (
                                                            <a
                                                                href={applyLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="sd-btn-apply"
                                                            >
                                                                Apply on Official Website ↗
                                                            </a>
                                                        ) : (
                                                            <button className="sd-btn-apply opacity-60 cursor-not-allowed" disabled>
                                                                Official link unavailable
                                                            </button>
                                                        )}

                            <Link to={`/assistance/${scholarship._id}`} className="sd-btn-assist">
                                Need Assistance?
                                <small>Professional Help · $50 USD</small>
                            </Link>

                            <div className="sd-disclaimer">
                                Scholarship Portal is not affiliated with the scholarship provider. We offer independent information and optional application assistance.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ScholarshipDetails;