import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

function SingleMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState()

    useEffect(() => {
        getMovie()
    }, [])

    const getMovie = () => {
        axios.get(`http://localhost:8000/api/movies/${id}`).then((resp) => {
            setMovie(resp.data.data);
        })
    }

    const renderStars = (vote) => {
        const fullStars = Math.ceil(vote);
        const emptyStars = 5 - fullStars;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fa-solid text-warning fa-star"></i>);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="fa-regular text-warning fa-star"></i>);
        }
        return stars;
    };

    if (!movie) {
        return <div>Caricamento</div>
    }

    return (
        <>
            <div className="container my-4">
                {/* HEADER */}
                <div
                    className="header-content d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center my-3">
                    <h2 className="mb-2 mb-lg-0">{movie.title}</h2>
                    <p className="mb-0 fs-5"><strong>Voto:</strong> {renderStars(movie.vote)} {movie.vote}/5</p>
                </div>

                {/* BODY */}
                <div className="body-content d-flex flex-column flex-lg-row">
                    {/* IMMAGINE */}
                    <div className="image-content w-25 w-lg-100 mb-3 mb-lg-0">
                        {movie.image != null ? (
                            <img src={`http://localhost:8000/storage/${movie.image}`} alt="locandina del film" className="img-fluid rounded" />

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
                            <h5 className="mb-3"><strong>Regista: </strong>{movie.director["name"]} {movie.director["surname"]}</h5>
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
                        <p className="mb-0"><strong>Voto:</strong> {renderStars(movie.vote)} {movie.vote}/5</p>
                    </div>
                    {movie.review ? (
                        <p>{movie.review}</p>
                    ) : (
                        <p>Nessuna recensione presente.</p>
                    )}
                </div>

                {/* LINK TORNA ALLA HOME */}
                <div className="mt-3">
                    <Link to={"/movies"} className="btn btn-outline-secondary w-sm-auto">Torna alla Home</Link>
                </div>
            </div>
        </>
    )
}

export default SingleMovie