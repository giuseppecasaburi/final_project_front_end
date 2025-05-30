import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Loader from "../components/AppLoader";

const apiUrl = import.meta.env.VITE_URL_API;
const apiStorage = import.meta.env.VITE_URL_STORAGE;

function SingleMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovie()
    }, []);

    const getMovie = () => {
        axios.get(`${apiUrl}/movies/${id}`).then((resp) => {
            setMovie(resp.data.data);
            setLoading(false)
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log("Film non trovato");
                    setError("Film non trovato")
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
        <>
            <div className="container my-4">
                {loading ? (
                    <Loader />
                ) : (
                    <>

                        {/* HEADER */}
                        <div
                            className="header-content d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center my-3">
                            <h2 className="mb-2 mb-lg-0"><strong>{movie.title}</strong></h2>
                            <p className="mb-0 fs-5"><strong>Voto:</strong> {renderStars(movie.vote)} {movie.vote}/10</p>
                        </div>

                        {/* BODY */}
                        <div className="body-content d-flex flex-column flex-lg-row">
                            {/* IMMAGINE */}
                            <div className="image-content w-80 mb-3 mb-lg-0">
                                {movie.image != null ? (
                                    <img src={`${apiStorage}/${movie.image}`} alt={`Copertina del Film ${movie.title}`} className="img-fluid h-100 rounded" />

                                ) : (
                                    <div className="d-flex justify-content-center align-items-center h-100">Nessuna immagine collegata</div>

                                )}
                            </div>

                            {/* INFO */}
                            <div className="info-content d-flex flex-column w-100 px-lg-3 py-2">
                                {/* GENERI */}
                                <div className="mb-3">
                                    {movie.genres.length > 0 && movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="rounded-5 p-2 me-1 d-inline-block text-white"
                                            style={{ backgroundColor: genre.color }}
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                {/* REGISTA */}
                                {movie.director != null ? (
                                    <Link to={`/directors/${movie.director["id"]}`} className="ms-a"><h5><strong>Regista: </strong>{movie.director["name"]} {movie.director["surname"]}</h5></Link>
                                ) : (
                                    <h5 className="mb-3">Nessun regista collegato</h5>
                                )}


                                {/* STORY */}
                                <h5><strong>Trama</strong></h5>
                                <p className="fs-5">{movie.story}</p>

                                {/* ANNO */}
                                <p className="fs-5"><strong>Anno di pubblicazione:</strong> {movie.year_of_publication}</p>

                                {/* DURATA */}
                                <span className="fs-5"><strong>Durata:</strong> {movie.duration} minuti</span>
                            </div>
                        </div>

                        {/* RECENSIONE */}
                        <div className="body-review mt-4">
                            <div className="d-flex justify-content-between align-items-lg-center flex-column flex-lg-row">
                                <h5><strong>Recensione</strong></h5>
                                <p className="mb-0"><strong>Voto:</strong> {renderStars(movie.vote)} {movie.vote}/10</p>
                            </div>
                            {movie.review ? (
                                <p>{movie.review}</p>
                            ) : (
                                <p>Nessuna recensione presente.</p>
                            )}
                        </div>

                        {/* LINK TORNA ALLA HOME */}
                        <div className="mt-3">
                            <Link to={"/movies"} className="btn btn-outline-secondary w-sm-auto">Torna al catalogo</Link>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SingleMovie