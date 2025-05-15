import { Link } from "react-router-dom"

function CardMovie({movie, index}) {
    return (
        <div className="card h-100 d-flex flex-column">
            {movie.image != null ? (
                <img src={`http://localhost:8000/storage/${movie.image}`} className="card-img-top" alt="..." style={{ objectFit: "cover", objectPosition: "top", height: "200px" }} />

            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ objectFit: "cover", height: "200px" }}>Nessuna Immagine Collegata</div>
            )}
            <div key={index} className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title} {movie.name} {movie.surname}</h5>
                <p className="card-text">{movie.story} {movie.description}</p>
                <Link to={"/movies/:id"} className="btn btn-warning mt-auto">Visualizza Film</Link>
            </div>
        </div>
    )
}

export default CardMovie