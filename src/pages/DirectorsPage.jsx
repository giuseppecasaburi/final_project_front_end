import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Loader from "../components/AppLoader";

const apiUrlNumeri = import.meta.env.VITE_URL_NUMERI;
const apiStorage = import.meta.env.VITE_URL_STORAGE;

function DirectorPage() {
    const [directors, setDirectors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDirectors = (page = 1) => {
        axios.get(`${apiUrlNumeri}/directors?page=${currentPage}`).then((resp) => {
            setDirectors(resp.data.data.data)
            setCurrentPage(resp.data.data.current_page)
            setLastPage(resp.data.data.last_page)
            setLoading(false)
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

    useEffect(() => {
        getDirectors()
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" })
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
            <h2 className="mb-4 d-flex flex-column flex-sm-row align-items-center">Catalogo Registi</h2>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                        {directors.map((director, index) => (
                                <div key={index} className="col">
                                    <div className="card h-100 d-flex flex-column">
                                        {director.image != null ? (
                                            <img src={`${apiStorage}/${director.image}`} className="card-img-top" alt={`Immagine di ${director.name} ${director.surname}`}
                                                style={{ objectFit: "cover", height: "300px" }} />
                                        ) : (
                                            <div style={{ border: "2px solid #ffa500", height: "300px", color: "#ffa500" }} className="justify-content-center d-flex align-items-center">Nessuna immagine collegata</div>

                                        )}

                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{director.name} {director.surname}</h5>
                                            <p className="card-text"><strong>Nato il:</strong> {director.date_of_birth}</p>
                                            <span><strong>Nazionalità:</strong> {director.nationality}</span><br />
                                            <Link to={`/directors/${director.id}`} className="btn btn-warning mt-auto">Visualizza Regista</Link>
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

export default DirectorPage