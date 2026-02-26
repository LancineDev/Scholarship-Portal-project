import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../../components/Title";

const CountryIndex = () => {
    const axios = useAxiosPublic();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        axios.get('/scholarships')
            .then(res => {
                if (!mounted) return;
                const data = res.data || [];
                setItems(data.filter(Boolean));
            })
            .catch(err => { if (mounted) setError(err); })
            .finally(() => { if (mounted) setLoading(false); });

        return () => { mounted = false; };
    }, [axios]);

    if (loading) return (
        <section className="container my-16 mx-auto px-4"><Title title="Countries & Topics" /><p>Loading…</p></section>
    );

    if (error) return (
        <section className="container my-16 mx-auto px-4"><Title title="Countries & Topics" /><p className="text-red-500">Unable to load index.</p></section>
    );

    // derive unique countries and topics
    const countrySet = new Set();
    const topicSet = new Set();
    for (const s of items) {
        const c = s?.university_location?.country || s?.university_location || s?.country;
        if (c) countrySet.add(String(c).trim());
        if (s?.scholarship_category) topicSet.add(String(s.scholarship_category).trim());
        if (s?.subject_name) topicSet.add(String(s.subject_name).trim());
    }

    const countries = Array.from(countrySet).sort((a,b)=> a.localeCompare(b));
    const topics = Array.from(topicSet).sort((a,b)=> a.localeCompare(b));

    return (
        <>
            <Helmet>
                <title>10Bourse | Countries & Topics</title>
            </Helmet>

            <section className="container my-16 mx-auto px-4">
                <Title title="Browse by Country & Topic" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                        <h4 className="text-xl font-semibold mb-3">Countries</h4>
                        <div className="flex flex-wrap gap-2">
                            { countries.map(c => (
                                <Link key={c} to={`/all-scholarship?country=${encodeURIComponent(c)}`} className="px-3 py-1 bg-primary-100 rounded text-sm hover:bg-primary-200">{c}</Link>
                            )) }
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-3">Topics & Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                            { topics.map(t => (
                                <Link key={t} to={`/all-scholarship?topic=${encodeURIComponent(t)}`} className="px-3 py-1 bg-primary-100 rounded text-sm hover:bg-primary-200">{t}</Link>
                            )) }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CountryIndex;
