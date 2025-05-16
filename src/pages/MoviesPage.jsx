import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Loader from "../components/AppLoader";
import { span } from "framer-motion/client";

function MoviePage() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMovies = (page = 1) => {
        axios.get(`http://127.0.0.1:8000/api/movies?page=${currentPage}`).then((resp) => {
            setMovies(resp.data.data.data)
            setCurrentPage(resp.data.data.current_page)
            setLastPage(resp.data.data.last_page)
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

    useEffect(() => {
        getMovies()
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" })
    };

    const renderStars = (vote) => {
        const fullStars = Math.ceil(vote);
        const emptyStars = 10 - fullStars;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fa-solid text-warning fa-star"></i>);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="fa-regular text-warning fa-star"></i>);
        }
        return stars;
    };

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
        <div className="container my-3">
            <h2 className="mb-4 d-flex flex-column flex-sm-row align-items-center">Catalogo Films</h2>
            {loading ? (
                <Loader />
            ) : (
                <>

                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                        {movies.map((movie, index) => (
                            <div key={index}  className="col">
                                <div className="card h-100 d-flex flex-column">
                                    {movie.image != null ? (
                                        <img src={`http://localhost:8000/storage/${movie.image}`} className="card-img-top" alt={`Copertina del Film ${movie.title}`}
                                            style={{ objectFit: "cover", objectPosition: "top", height: "300px" }} />
                                    ) : (
                                        <div style={{ border: "2px solid #ffa500", height: "300px", color: "#ffa500" }} className="justify-content-center d-flex align-items-center">Nessuna immagine collegata</div>

                                    )}

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <div>
                                            {movie.genres.length > 0 ? (
                                                movie.genres.map((genre) => (
                                                    <span key={genre.id} className="rounded-5 p-2 me-1 mb-1 d-inline-block text-white" style={{ backgroundColor: genre.color }}>{genre.name}</span>
                                                ))
                                            ) : (
                                                <p>Nessun genere collegato</p>
                                            )}
                                        </div>
                                        <p className="card-text"><strong>Data di uscita:</strong> {movie.year_of_publication}</p>
                                        <span><strong>Durata:</strong> {movie.duration} minuti</span>

                                        {movie.director != null ? (
                                            <p className="card-text"><strong>Regista:</strong> {movie.director['name']} {movie.director['surname']}</p>
                                        ) : (
                                            <p className="card-text">Nessun regista collegato</p>
                                        )}
                                        <p className="mb-3">{renderStars(movie.vote)}</p>
                                        <Link to={`/movies/${movie.id}`} className="btn btn-warning mt-auto">Visualizza Film</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 my-5">
                        {/* Bottone Precedente */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`btn btn-outline-warning ${currentPage === 1 ? 'disabled' : ''}`}
                        >
                            &laquo; Precedente
                        </button>

                        {/* Numeri delle pagine */}
                        {Array.from({ length: lastPage }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`btn d-none d-sm-inline-block ${page === currentPage ? 'btn-warning fw-bold text-white' : 'btn-outline-warning'}`}

                            >
                                {page}
                            </button>
                        ))}

                        {/* Bottone Successiva */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === lastPage}
                            className={`btn btn-outline-warning ${currentPage === lastPage ? 'disabled' : ''}`}
                        >
                            Successiva &raquo;
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default MoviePage