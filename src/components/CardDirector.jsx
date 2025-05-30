import { Link } from "react-router-dom"

function CardDirector({url, director, index}) {
    return (
        <div key={index} className="card h-100 d-flex flex-column">
            {director.image != null ? (
                <img src={`${url}/${director.image}`} className="card-img-top" alt={`Immagine di ${director.name} ${director.surname}`} style={{ objectFit: "cover", height: "350px" }} />

            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ objectFit: "cover", height: "350px" }}>Nessuna Immagine Collegata</div>
            )}
            <div key={index} className="card-body d-flex flex-column">
                <h5 className="card-title">{director.name} {director.surname}</h5>
                <p className="card-text">{`${director?.description || ''}`.split(' ').slice(0, 10).join(' ')}...</p>
                <Link to={`/directors/${director.id}`} className="btn btn-warning mt-auto">Visualizza Regista</Link>
            </div>
        </div>
    )
}

export default CardDirector