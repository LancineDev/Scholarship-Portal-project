import Loading from "../../components/Loading";
import ScholarshipCard from "../../layout/ScholarshipCard/ScholarshipCard";
import { Link } from "react-router-dom";
import useScholarshipData from "../../hooks/useScholarshipData";

const TopScholarship = () => {
    const [scholarships, loading, error] = useScholarshipData();

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <div>Error: { error }</div>;
    }

    return (
        <section className="container my-16 mx-auto px-2 md:px-4">
            <div className="text-center mb-8">
                <h2 className="mb-2 text-3xl md:text-4xl font-extrabold text-accent-700">Top Scholarships</h2>
                <p className="text-sm text-slate-600">Découvre des opportunités sélectionnées pour toi — mises à jour régulièrement.</p>
            </div>

            {/* Top scholarship cards */ }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-3 lg:px-6 mb-6">
                {
                    // Deduplicate by university and show up to 6 universities
                    (() => {
                        const map = new Map();
                        for (const s of scholarships) {
                            const key = (s.university_name || '').trim();
                            if (!map.has(key)) map.set(key, s);
                        }
                        return Array.from(map.values()).slice(0, 6).map(scholarship => (
                            <div key={ scholarship._id } className="group transform transition hover:scale-105 hover:shadow-xl rounded-lg">
                                <ScholarshipCard scholarship={ scholarship } />
                            </div>
                        ));
                    })()
                }
            </div>

            {/* All scholarship button */ }
            <div className="flex justify-center w-full">
                <Link to="all-scholarship" className="inline-block btn-gradient px-6 py-3 rounded-lg text-white font-semibold shadow hover:opacity-95">Voir toutes les bourses</Link>
            </div>
        </section>
    );
};

export default TopScholarship;