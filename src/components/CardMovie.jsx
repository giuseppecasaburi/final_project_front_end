import { Link } from "react-router-dom"

function CardMovie({ url, movie, index }) {
    return (
        <div key={index} className="card h-100 d-flex flex-column">
            {movie.image != null ? (
                <img src={`${url}/${movie.image}`} className="card-img-top" alt={`Copertina del Film ${movie.title}`} style={{ objectFit: "cover", objectPosition: "top", height: "350px" }} />

            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ objectFit: "cover", height: "350px" }}>Nessuna Immagine Collegata</div>
            )}
            <div key={index} className="card-body d-flex flex-column">
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
                <p className="card-text">{`${movie?.story || ''}`.split(' ').slice(0, 10).join(' ')}...</p>
                <Link to={`/movies/${movie.id}`} className="btn btn-warning mt-auto">Visualizza Film</Link>
            </div>
        </div>
    )
}

export default CardMovie