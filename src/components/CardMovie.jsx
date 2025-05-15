function CardMovie({movie, index}) {
    return (
        <div className="card h-100 d-flex flex-column">
            {movie.image != null ? (
                <img src={`http://localhost:8000/storage/${movie.image}`} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "200px" }} />

            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ objectFit: "cover", height: "200px" }}>Nessuna Immagine Collegata</div>
            )}
            <div key={index} className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.story}</p>
                <a href="#" className="btn btn-outline-warning mt-auto">Visualizza Film</a>
            </div>
        </div>
    )
}

export default CardMovie