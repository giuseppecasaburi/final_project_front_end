import axios from "axios"
import { useEffect, useState } from "react"

function DirectorPage() {
    const [directors, setDirectors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const getDirectors = (page = 1) => {
        axios.get(`http://127.0.0.1:8000/api/directors?page=${currentPage}`).then((resp) => {
            setDirectors(resp.data.data.data)
            setCurrentPage(resp.data.data.current_page)
            setLastPage(resp.data.data.last_page)
        })
    }

    useEffect(() => {
        getDirectors()
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="container my-3">
            <h2 className="mb-4 d-flex flex-column flex-sm-row align-items-center">Catalogo Registi</h2>
            <div className="row row-cols-1 row-cols-lg-3 g-4">
                {directors.map((director, index) => (
                    <>
                        <div className="col">
                            <div key={index} className="card h-100 d-flex flex-column">
                                {director.image != null ? (
                                    <img src={`http://localhost:8000/storage/${director.image}`} className="card-img-top" alt=""
                                        style={{ objectFit: "cover", objectPosition: "top", height: "300px" }} />
                                ) : (
                                    <div style={{ border: "2px solid #ffa500", height: "300px", color: "#ffa500" }} className="justify-content-center d-flex align-items-center">Nessuna immagine collegata</div>

                                )}

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{director.name} {director.surname}</h5>
                                    <p className="card-text">Nato il: {director.date_of_birth}</p>
                                    <span>Nazionalità {director.nationality}</span><br />
                                    <a href={`/directors/${director.id}`} className="btn btn-warning mt-auto">Visualizza
                                        Film
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
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
        </div>
    )

}

export default DirectorPage