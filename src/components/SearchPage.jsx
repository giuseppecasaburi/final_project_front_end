import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardMovie from "./CardMovie";
import CardDirector from "./CardDirector";
import CustomSelect from "./CustomSelect";
import CustomSelectDirector from "./CustomSelectDirector";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query_search");
    const [resultsMovies, setResultsMovies] = useState([]);
    const [resultsDirectors, setResultsDirectors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDirectors, setSelectedDirectors] = useState([]);

    useEffect(() => {
        const genres = axios.get("http://localhost:8000/api/genres").then((resp) => {
            setGenres(resp.data.data);
        })

        const directors = axios.get("http://localhost:8000/api/directors").then((resp) => {
            setDirectors(resp.data.data);
        })
    }, [])

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

    const handleFilterSubmit = async e => {
        e.preventDefault();
        try {
            const resp = await axios.get("http://localhost:8000/api/search", {
                params: {
                    query_search: query,
                    genres: selectedGenres,       // array di id
                    directors: selectedDirectors, // array di id
                },
            });
            setResultsMovies(resp.data.movies);
            setResultsDirectors(resp.data.directors);
        } catch (err) {
            console.error(err);
        }
    };

    const handleGenreChange = (selectedGenres) => {
        // Gestisci i generi selezionati
        setSelectedGenres(selectedGenres.map(genre => genre.value));
        console.log(selectedGenres);

    };

    const handleDirectorChange = (selectedDirectors) => {
        // Gestisci i registi selezionati
        setSelectedDirectors(selectedDirectors.map(director => director.value));
        console.log(selectedDirectors);
    };

    return (
        <div className="d-sm-flex d-block">
            <div className="filter d-block d-sm-flex flex-column p-3">
                <form onSubmit={handleFilterSubmit}>
                    <input type="hidden" />
                    <h3>Aggiungi Filtri</h3>
                    <h5 className="d-block">Filtra per Genere</h5>
                    <div className="p-2">
                        {genres.map((genre, index) => (
                            <>
                                <span className="d-none d-sm-block pb-2 px-2" key={`genre-${index}`}>
                                    <input
                                        type="checkbox"
                                        id={`genre-${genre.id}`}
                                        name="genres"
                                        value={genre.id}
                                        checked={selectedGenres.includes(genre.id)}
                                        onChange={e => {
                                            const id = genre.id;
                                            setSelectedGenres(prev =>
                                                e.target.checked ? [...prev, id] : prev.filter(g => g !== id)
                                            );
                                        }}
                                    />
                                    <label htmlFor={`genre-${genre.id}`} className="ps-2">{genre.name}</label>
                                </span>
                            </>
                        ))}
                        <div className="d-block d-sm-none">
                            <CustomSelect
                                optionsData={genres}
                                placeholder="Filtra per Genere"
                                onChange={handleGenreChange}
                            />
                        </div>
                    </div>

                    <h5 className="d-block">Filtra per Regista</h5>
                    <div className="p-2">
                        {directors.map((director, index) => (
                            <>
                                <span className="d-none d-sm-block pb-2 px-2" key={`director-${index}`}>
                                    <input
                                        type="checkbox"
                                        id={`director-${director.id}`}
                                        name="directors"
                                        value={director.id}
                                        checked={selectedDirectors.includes(director.id)}
                                        onChange={e => {
                                            const id = director.id;
                                            setSelectedDirectors(prev =>
                                                e.target.checked ? [...prev, id] : prev.filter(d => d !== id)
                                            );
                                        }}
                                    />
                                    <label htmlFor={`director-${director.id}`} className="ps-2 wrap">{director.name} {director.surname}</label>
                                </span>
                            </>
                        ))}
                        <div className="d-block d-sm-none">
                            <CustomSelectDirector
                                optionsData={directors}
                                placeholder="Filtra per Regista"
                                onChange={handleDirectorChange}
                            />
                        </div>
                    </div>
                    <button className="btn btn-warning mt-3 me-1">Filtra</button>
                    <button className="btn btn-secondary mt-3 me-1">Rimuovi Filtri</button>
                </form>
            </div>
            <div className="content p-3">
                <h2>Risultati per: "{query}"</h2>
                <div className="row">
                    {[...resultsMovies, ...resultsDirectors].length > 0 ? (
                        <>
                            {resultsMovies.length > 0 &&
                                resultsMovies.map((movie, index) => (
                                    <div className="col-md-4 mb-3" key={`movie-${index}`}>
                                        <CardMovie movie={movie} index={index} />
                                    </div>
                                ))
                            }
                            {resultsDirectors.length > 0 &&
                                resultsDirectors.map((director, index) => (
                                    <div className="col-md-4 mb-3" key={`director-${index}`}>
                                        <CardDirector director={director} index={index} />
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <p>Nessun risultato trovato.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage