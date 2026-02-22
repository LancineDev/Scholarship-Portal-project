import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import TopScholarship from "./TopScholarship";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>10Bourse | Accueil</title>
            </Helmet>
            
            <Banner />
            <div className="flex justify-center my-8">
                <Link
                    to="/assistance-service"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
                >
                    Besoin d’assistance ?
                </Link>
            </div>
            <TopScholarship />
            <ContactUs />
        </>
    );
};

export default Home;