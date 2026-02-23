import { useRef, useEffect } from "react";

const Banner = () => {
    const carouselRef = useRef(null);

    const scrollPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -carouselRef.current.offsetWidth,
                behavior: "smooth"
            });
        }
    };

    const scrollNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: carouselRef.current.offsetWidth,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const carousel = carouselRef.current;
                // Check if we've reached the end
                if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 10) {
                    // Reset to the beginning
                    carousel.scrollLeft = 0;
                } else {
                    // Scroll to next slide
                    carousel.scrollBy({
                        left: carousel.offsetWidth,
                        behavior: "smooth"
                    });
                }
            }
        }, 5000); // Scroll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative">
            <div ref={ carouselRef } className="carousel max-w-full flex overflow-hidden">
                {/* Carousel item 1 */}
                <div className="carousel-item flex-shrink-0 w-full relative">
                    <img
                        src="https://images.unsplash.com/photo-1627556704243-5f0771d90783?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Carousel Image 1"
                        className="w-full h-[85vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>

                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6 lg:px-20 text-white fade-in">
                            <p className="max-w-2xl text-sm md:text-lg opacity-90 mb-3">Nous le rendons simple et vous mettons en relation avec les bourses pour lesquelles vous êtes admissible.</p>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-primary-50">Trouvez des bourses pour l'université — rapidement</h1>

                            <div className="mt-6 max-w-xl">
                                <div className="flex gap-2 items-center bg-white/95 rounded-lg p-1 shadow-md">
                                    <input
                                        aria-label="Search scholarships"
                                        placeholder="Université, matière ou pays (ex: France, ingénierie)"
                                        className="flex-1 px-4 py-3 rounded-md bg-transparent outline-none text-black placeholder-gray-600"
                                    />
                                    <button className="btn-gradient rounded-md px-4 py-2 font-semibold ml-2" style={{ background: 'linear-gradient(90deg, var(--primary-500), var(--secondary-500))' }}>Rechercher</button>
                                </div>

                                <div className="mt-4 flex gap-3">
                                    <a href="/all-scholarship" className="inline-block bg-white/95 text-black px-5 py-2 rounded-lg font-semibold shadow hover:shadow-lg">Voir les bourses</a>
                                    <a href="/assistance-service" className="inline-block btn-gradient px-4 py-2 rounded-lg font-medium" style={{ background: 'linear-gradient(90deg, var(--primary-500), var(--secondary-500))' }}>Besoin d'aide ?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel item 2 */ }
                <div className="carousel-item flex-shrink-0 w-full relative">
                    <img
                        src="https://www.ppic.org/wp-content/uploads/2021/05/college-graduate-hugging-mother-and-holding-diploma.jpg"
                        alt="Carousel Image 2"
                        className="w-full h-[85vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>

                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6 lg:px-20 text-white fade-in">
                            <p className="max-w-2xl text-sm md:text-lg opacity-90 mb-3">Simplifiez et concentrez votre processus de candidature avec la plateforme tout-en-un pour les bourses.</p>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-primary-50">Le chemin le plus rapide pour obtenir des bourses</h1>

                                <div className="mt-6 flex gap-3">
                                <a href="/all-scholarship" className="inline-block bg-white/95 text-black px-5 py-2 rounded-lg font-semibold shadow hover:shadow-lg">Voir les bourses</a>
                                <a href="/assistance-service" className="inline-block btn-gradient px-4 py-2 rounded-lg font-medium" style={{ background: 'linear-gradient(90deg, var(--primary-500), var(--secondary-500))' }}>Comment ça marche</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel item 3 */ }
                <div className="carousel-item flex-shrink-0 w-full relative">
                    <img
                        src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Carousel Image 3"
                        className="w-full h-[85vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>

                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6 lg:px-20 text-white fade-in">
                            <p className="max-w-2xl text-sm md:text-lg opacity-90 mb-3">Sécurisez votre parcours éducatif avec des opportunités de bourses stratégiques.</p>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-primary-50">Construisez votre avenir pour demain</h1>

                                <div className="mt-6 flex gap-3">
                                <a href="/signup" className="inline-block bg-white/95 text-black px-5 py-2 rounded-lg font-semibold shadow hover:shadow-lg">Inscrivez-vous</a>
                                <a href="/all-scholarship" className="inline-block btn-gradient px-4 py-2 rounded-lg font-medium" style={{ background: 'linear-gradient(90deg, var(--primary-500), var(--secondary-500))' }}>Explorer</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Previous Button */}
            <div className="absolute inset-y-0 left-0 flex items-center justify-start pl-2 lg:pl-4">
                <button
                    className="carousel-control-prev bg-primary-800 hover:bg-primary-600 text-text-50 rounded-full p-2 focus:outline-none"
                    onClick={ scrollPrev }
                >
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            </div>

            {/* Next Button */}
            <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-2 lg:pr-4">
                <button
                    className="carousel-control-next bg-primary-800 hover:bg-primary-600 text-text-50 rounded-full p-2 focus:outline-none"
                    onClick={ scrollNext }
                >
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Banner;