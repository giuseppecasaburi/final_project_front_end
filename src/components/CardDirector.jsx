function CardDirector({director, index}) {
    return (
        <div className="card h-100 d-flex flex-column">
            {director.image != null ? (
                <img src={`http://localhost:8000/storage/${director.image}`} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "200px" }} />

            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ objectFit: "cover", height: "200px" }}>Nessuna Immagine Collegata</div>
            )}
            <div key={index} className="card-body d-flex flex-column">
                <h5 className="card-title">{director.name} {director.surname}</h5>
                <p className="card-text">{director.description}</p>
                <a href="#" className="btn btn-outline-warning mt-auto">Visualizza Regista</a>
            </div>
        </div>
    )
}

export default CardDirector