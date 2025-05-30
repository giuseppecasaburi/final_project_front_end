import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardMovie from "../components/CardMovie";
import CardDirector from "../components/CardDirector";
import Loader from "../components/AppLoader";

const apiUrlNumeri = import.meta.env.VITE_URL_NUMERI;
const apiStorage = import.meta.env.VITE_URL_STORAGE;


function HomePage() {
    
    const [movies, setMovies] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Stato per la ricerca
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getMovies()
        getDirectors()
    }, []);

    const getMovies = () => {
        axios.get(`${apiUrlNumeri}/movies`).then((resp) => {
            setMovies(resp.data.data.data)
            setLoading(false)
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log("Films non trovati");
                    setError("Films non trovati")
                } else if (error.response.status === 500) {
                    console.log("Errore del server");
                    setError("Errore del server");
                } else {
                    console.log("Errore generico");
                    setError("Errore generico");
                }
            } else if (error.request) {
                // Nessuna risposta dal server
                console.error("Nessuna risposta dal server.");
                setError("Nessuna risposta dal server.");
            } else {
                // Altro tipo di errore (es. errore nella configurazione)
                console.error("Errore nella richiesta:", error.message);
                setError("Errore nella richiesta.");
            }
        });
    };

    const getDirectors = () => {
        axios.get(`${apiUrlNumeri}/directors`).then((resp) => {
            const directors = resp.data.data.data;
            // Mischia casualmente l'array e ne preleva i primi 3 da salvare in directors
            const shuffled = [...directors].sort(() => 0.5 - Math.random());
            setDirectors(shuffled.slice(0, 3));
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log("Registi non trovati");
                    setError("Registi non trovati")
                } else if (error.response.status === 500) {
                    console.log("Errore del server");
                    setError("Errore del server");
                } else {
                    console.log("Errore generico");
                    setError("Errore generico");
                }
            } else if (error.request) {
                // Nessuna risposta dal server
                console.error("Nessuna risposta dal server.");
                setError("Nessuna risposta dal server.");
            } else {
                // Altro tipo di errore (es. errore nella configurazione)
                console.error("Errore nella richiesta:", error.message);
                setError("Errore nella richiesta.");
            }
        });
    };

    // Filtra tutti i film e restituisce gli ultimi tre aggiunti
    const recentMovies = movies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);

    if (error) {
        return (
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h3 className="modal-title">Errore</h3>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setError(null)}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h4>{error}</h4>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => setError(null)}
                            >
                                Chiudi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <main>
            <div className="hero position-relative text-white text-center">
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/img/hero_harry_p.jpg" className="d-block w-100" alt="/img/hero_harry_p" />
                        </div>
                        <div className="carousel-item">
                            <img src="/img/hero_odissea.jpg" className="d-block w-100" alt="/img/hero_harry_p" />
                        </div>
                        <div className="carousel-item">
                            <img src="/img/hero_turman.jpg" className="d-block w-100" alt="/img/hero_harry_p" />
                        </div>
                    </div>
                </div>
                {/* Overlay per rendere leggibile il testo */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} // Sfondo nero trasparente
                ></div>

                {/* Contenuto sopra l'overlay */}
                <div className="hero-overlay position-absolute top-50 start-50 translate-middle">
                    <h1 className="fw-bold pb-2">I film imperdibili, tutti in un solo posto</h1>
                    <p className="fs-5 pb-2 d-custom-none">
                        Esplora le migliori pellicole da vedere da solo, con gli amici o in famiglia. Dai grandi classici ai capolavori moderni: lasciati ispirare, emozionare e sorprendere.
                    </p>
                    <Link to={`/movies`} className="btn ms-btn btn-outline-warning mt-2">Lista Film</Link>
                    <Link to={`/directors`} className="btn ms-btn btn-outline-warning mt-2">Lista Registi</Link>
                </div>
            </div>

            <section id="search-section">
                <div className="search-section">
                    <h3 className="text-center my-4">Cerca per nome del Film o per nome o cognome del Regista</h3>
                    <form className="d-flex" role="search" onSubmit={(e) => {
                        e.preventDefault();
                        if (search.trim() === "") return;

                        navigate(`/search?query_search=${encodeURIComponent(search)}`)
                    }}>
                        <input className="form-control me-2" type="search" placeholder="Film o Regista" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button className="btn btn-warning" type="submit">Cerca</button>
                    </form>
                </div>
            </section>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <section id="recent-section">
                        <h3 className="text-center my-4">Le Novità del Momento</h3>
                        <div className="row g-4">
                            {recentMovies.map((movie, index) => (
                                <div key={index} className="col-12 col-md-4">
                                    <CardMovie url={apiStorage} movie={movie} index={index} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="recent-section">
                        <h3 className="text-center my-4">Scopri un Regista</h3>
                        <div className="row g-4">
                            {directors.map((director, index) => (
                                <div key={index} className="col-12 col-md-4">
                                    <CardDirector url={apiStorage} director={director} index={index} />
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </main>
    )
}


export default HomePage;