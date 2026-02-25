import { Helmet } from "react-helmet-async";
import ScholarshipCard from "../../layout/ScholarshipCard/ScholarshipCard";
import Loading from "../../components/Loading";
import useScholarshipData from "../../hooks/useScholarshipData";
import { useEffect, useState, useRef } from "react";
import Title from "../../components/Title";

const AllScholarship = () => {
    const [scholarships, loading, error, refetch] = useScholarshipData();
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");
    const debounceRef = useRef(null);

    useEffect(() => {
        setSearchTerm("");
        setQuery("");
    }, [scholarships]);

    useEffect(() => {
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error || !scholarships || scholarships.length === 0) {
        // Don't show error, just show empty state or retry
        return (
            <>
                <Helmet>
                    <title>10bourse | Toutes les Bourses</title>
                </Helmet>
                <section className="container my-16 mx-auto px-2 md:px-4">
                    <Title title="All Scholarship" />
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">Chargement des bourses...</p>
                        <button 
                            onClick={() => refetch()} 
                            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded"
                        >
                            Réessayer
                        </button>
                    </div>
                </section>
            </>
        );
    }

    const handleSearchChange = (e) => {
        const v = e.target.value;
        setQuery(v);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setSearchTerm(v.toLowerCase());
        }, 300);
    };

    // Filter scholarships based on search term
    const filteredScholarships = scholarships.filter(scholarship =>
        scholarship.university_name.toLowerCase().includes(searchTerm) ||
        scholarship.scholarship_category.toLowerCase().includes(searchTerm) ||
        scholarship.subject_name.toLowerCase().includes(searchTerm)
    );

    // Deduplicate by university_name so each university appears once
    const uniqueByUniversity = (list) => {
        const map = new Map();
        for (const s of list) {
            const key = (s.university_name || '').trim();
            if (!map.has(key)) map.set(key, s);
        }
        return Array.from(map.values());
    };

    // University filter state
    const [universityFilter, setUniversityFilter] = useState("");
    const universitiesList = uniqueByUniversity(scholarships).map(s => s.university_name).filter(Boolean);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        // Filtering is handled in filteredScholarships directly based on searchTerm
    };

    return (
        <>
            <Helmet>
                <title>10Bourse | Toutes les Bourses</title>
            </Helmet>

            <section className="container my-16 mx-auto px-2 md:px-4">
                <Title title="Toutes les Bourses" />

                {/* Search */}
                <form onSubmit={ handleSubmit } className="mb-10 mx-auto max-w-xl py-2 px-6 rounded bg-primary-100 focus-within:border flex focus-within:border-primary-300">
                    <input type="text" placeholder="Rechercher par Bourse, Université, Diplôme" className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic" value={ query } onChange={ handleSearchChange } /><button type="submit" className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-primary-500 border-transparent py-1.5 h-[38px] -mr-3 text-black">Chercher</button>
                </form>

                {/* Controls: university filter */}
                <div className="mb-4 flex items-center gap-4">
                    <label className="text-sm text-gray-600">Université:</label>
                    <select value={ universityFilter } onChange={ (e) => setUniversityFilter(e.target.value) } className="border rounded px-3 py-1 text-sm">
                        <option value="">Toutes</option>
                        { universitiesList.map(u => <option key={u} value={u}>{u}</option>) }
                    </select>
                </div>

                {/* Scholarship cards */ }
                <div className={ `grid md:px-3 lg:px-6 mb-6 ${filteredScholarships.length === 0 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 gap-4"}` }>
                    {
                        searchTerm === "" ? (
                            // Show all scholarships when searchTerm is empty (deduplicate by university)
                            uniqueByUniversity(scholarships)
                                .filter(s => !universityFilter || s.university_name === universityFilter)
                                .map(scholarship => (
                                    <ScholarshipCard key={ scholarship._id } scholarship={ scholarship } />
                                ))
                        ) : filteredScholarships.length === 0 ? (
                            // Show message when no results are found
                            <div className="text-red-400 text-2xl font-semibold flex items-center justify-center">No scholarships found.</div>
                        ) : (
                            // Show filtered scholarships (deduplicate by university)
                            uniqueByUniversity(filteredScholarships)
                                .filter(s => !universityFilter || s.university_name === universityFilter)
                                .map(scholarship => (
                                    <ScholarshipCard key={ scholarship._id } scholarship={ scholarship } />
                                ))
                        ) }
                </div>
            </section>
        </>
    );
};

export default AllScholarship;