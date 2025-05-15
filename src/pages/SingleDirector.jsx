import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CardMovie from "../components/CardMovie";

function SingleDirector() {
    const { id } = useParams();
    const [director, setDirector] = useState()

    useEffect(() => {
        getDirector()
    }, [])

    const getDirector = () => {
        axios.get(`http://localhost:8000/api/directors/${id}`).then((resp) => {
            setDirector(resp.data.data);
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

    if (!director) {
        return <div>Caricamento</div>
    }

    return (
        <>
            <div class="container my-4">
                {/* HEADER */}
                <div
                    class="header-content d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center my-3">
                    <h2 class="mb-2 mb-lg-0">{director.name} {director.surname}</h2>
                </div>

                {/* BODY */}
                <div class="body-content d-flex flex-column flex-lg-row">
                    {/* IMMAGINE */}
                    <div class="image-content w-80 mb-3 mb-lg-0">
                        {director.image != null ? (
                            <img src={`http://localhost:8000/storage/${director.image}`} alt={`Immagine di ${director.name} ${director.surname}`} className="img-fluid h-100 rounded" />

                        ) : (
                            <div className="d-flex justify-content-center align-items-center h-100">Nessuna immagine collegata</div>

                        )}
                    </div>

                    {/* INFO */}
                    <div class="info-content d-flex flex-column w-100 px-lg-3">

                        {/* STORY */}
                        <h5><strong>Storia</strong></h5>
                        <p class="fs-5">{director.description}</p>

                        {/* ANNO */}
                        <p class="fs-5"><strong>Anno di nascita:</strong> {director.date_of_birth}
                        </p>

                        {/* DURATA */}
                        <span class="fs-5"><strong>Nazionalità:</strong> {director.nationality}</span>
                    </div>
                </div>

                {/* FILM COLLEGATI */}
                <div class="related-movies mt-4">
                    <h3 class="mt-5 mb-3">Film collegati</h3>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {director.movies.length > 0 ? (
                                director.movies.map((movie, index) => (
                                    <div class="col">
                                        <CardMovie index={index} movie={movie}/>
                                    </div>
                                ))
                        ) : (
                            <div>Nessun Film Collegato.</div>
                        )}
                    </div>
                </div>

                {/* LINK TORNA ALLA HOME */}
                <div class="mt-3">
                    <Link to={"/directors"} class="btn btn-outline-secondary w-sm-auto">Torna alla Home</Link>
                </div>
            </div>
        </>
    )
}

export default SingleDirector