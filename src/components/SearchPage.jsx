import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query_search");
    const [resultsMovies, setResultsMovies] = useState([]);
    const [resultsDirectors, setResultsDirectors] = useState([]);

    useEffect(() => {
        if (query) {
            axios.get("http://localhost:8000/api/search", {
                params: {
                    query_search: query,
                },
            }).then((resp) => {
                console.log(resp.data.movies, resp.data.directors)
                setResultsMovies(resp.data.movies);
                setResultsDirectors(resp.data.directors);
            })
        }
    }, [query])

    return (
        <div className="container py-5">
            <h2>Risultati per: "{query}"</h2>
            <div className="row">
                {[...resultsMovies, ...resultsDirectors].length > 0 ? (
                    [...resultsMovies, ...resultsDirectors].map((item, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <div className="card" style={{ height: "100%" }}>
                                <img
                                    src={`http://localhost:8000/storage/${item.image}`}
                                    className="card-img-top"
                                    alt={item.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.story}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nessun risultato trovato.</p>
                )}
            </div>
        </div>
    );
}

export default SearchPage