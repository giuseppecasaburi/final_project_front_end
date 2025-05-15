import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardMovie from "./CardMovie";
import CardDirector from "./CardDirector";
import CustomSelect from "./CustomSelect";
import CustomSelectDirector from "./CustomSelectDirector";

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Params iniziali da URL
    const initialQuery = searchParams.get("query_search") || "";
    const initialGenres = searchParams.get("genres")
        ? searchParams.get("genres").split(",").map(id => parseInt(id, 10))
        : [];
    const initialDirectors = searchParams.get("directors")
        ? searchParams.get("directors").split(",").map(id => parseInt(id, 10))
        : [];

    // Stati
    const [query, setQuery] = useState("");
    const [resultsMovies, setResultsMovies] = useState([]);
    const [resultsDirectors, setResultsDirectors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(initialGenres);
    const [selectedDirectors, setSelectedDirectors] = useState(initialDirectors);

    // Carica generi e registi
    useEffect(() => {
        axios.get("http://localhost:8000/api/genres").then(r => setGenres(r.data.data));
        axios.get("http://localhost:8000/api/directors").then(r => setDirectors(r.data.data.data));
    }, []);

    // Funzione per chiamare l'API search con params correnti
    const fetchSearch = async (params) => {
        const resp = await axios.get("http://localhost:8000/api/search", { params });
        setResultsMovies(resp.data.movies);
        setResultsDirectors(resp.data.directors);
    };

    // Al mount e ogni volta che cambiano query/searchParams, esegue la ricerca iniziale
    useEffect(() => {
        if (!query && selectedGenres.length === 0 && selectedDirectors.length === 0) {
            setResultsMovies([]);
            setResultsDirectors([]);
            return;
        }
        fetchSearch({
            query_search: query,
            genres: selectedGenres.length ? selectedGenres : undefined,
            directors: selectedDirectors.length ? selectedDirectors : undefined
        });
    }, [query, selectedGenres, selectedDirectors]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (query) params.set("query_search", query);
        if (selectedGenres.length) params.set("genres", selectedGenres.join(","));
        if (selectedDirectors.length) params.set("directors", selectedDirectors.join(","));
        setSearchParams(params, { replace: true });
    }, [query, selectedGenres, selectedDirectors, setSearchParams]);

    useEffect(() => {
        const newQuery = searchParams.get("query_search") || "";
        setQuery(newQuery);
    }, [searchParams]);

    // Submit del form: aggiorna URL e stato
    const handleFilterSubmit = e => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (query) params.set("query_search", query);
        if (selectedGenres.length) params.set("genres", selectedGenres.join(","));
        if (selectedDirectors.length) params.set("directors", selectedDirectors.join(","));
        navigate(`/search?${params.toString()}`, { replace: true });
        // fetchSearch verrà richiamato automaticamente dal useEffect sopra
    };

    // Rimuovi tutti i filtri
    const handleClearFilters = () => {
        setSelectedGenres([]);
        setSelectedDirectors([]);
        navigate(`/search?query_search=${encodeURIComponent(query)}`, { replace: true });
    };

    // Handlers per checkbox e custom select
    const handleGenreCheckbox = e => {
        const id = parseInt(e.target.value, 10);
        setSelectedGenres(prev =>
            e.target.checked ? [...prev, id] : prev.filter(g => g !== id)
        );
    };
    const handleDirectorCheckbox = e => {
        const id = parseInt(e.target.value, 10);
        setSelectedDirectors(prev =>
            e.target.checked ? [...prev, id] : prev.filter(d => d !== id)
        );
    };
    const handleGenreChange = opts => {
        setSelectedGenres(opts ? opts.map(o => o.value) : []);
    };
    const handleDirectorChange = opts => {
        setSelectedDirectors(opts ? opts.map(o => o.value) : []);
    };

    return (
        <div className="d-sm-flex d-block">
            <aside className="filter d-block d-sm-flex flex-column p-3">
                <form onSubmit={handleFilterSubmit}>
                    <h3>Aggiungi Filtri</h3>

                    <h5>Filtra per Genere</h5>
                    <div className="p-2">
                        {genres.map(g => (
                            <label
                                key={g.id}
                                className="d-none d-sm-block me-3"
                            >
                                <input
                                    type="checkbox"
                                    value={g.id}
                                    checked={selectedGenres.includes(g.id)}
                                    onChange={handleGenreCheckbox}
                                />
                                <span className="ps-2">{g.name}</span>
                            </label>
                        ))}
                        <div className="d-block d-sm-none mb-3">
                            <CustomSelect
                                optionsData={genres}
                                placeholder="Filtra per Genere"
                                onChange={handleGenreChange}
                                value={genres
                                    .filter((g) => selectedGenres.includes(g.id))
                                    .map((g) => ({ value: g.id, label: g.name }))}
                            />
                        </div>
                    </div>

                    <h5>Filtra per Regista</h5>
                    <div className="p-2">
                        {directors.map(d => (
                            <label
                                key={d.id}
                                className="d-none d-sm-block me-3"
                            >
                                <input
                                    type="checkbox"
                                    value={d.id}
                                    checked={selectedDirectors.includes(d.id)}
                                    onChange={handleDirectorCheckbox}
                                />
                                <span className="ps-2">{d.name} {d.surname}</span>
                            </label>
                        ))}
                        <div className="d-block d-sm-none mb-3">
                            <CustomSelectDirector
                                optionsData={directors}
                                placeholder="Filtra per Regista"
                                onChange={handleDirectorChange}
                                value={directors
                                    .filter((d) => selectedDirectors.includes(d.id))
                                    .map((d) => ({ value: d.id, label: `${d.name} ${d.surname}` }))}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-warning mt-3 me-1">
                        Filtra
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={handleClearFilters}
                    >
                        Rimuovi Filtri
                    </button>
                </form>
            </aside>

            <main className="content p-3">
                <h2>{[...resultsMovies, ...resultsDirectors].length} risultati per: "{query}"</h2>
                <div className="row">
                    {resultsMovies.length + resultsDirectors.length > 0 ? (
                        <>
                            {resultsMovies.map((m, i) => (
                                <div className="col-md-4 mb-3" key={`movie-${i}`}>
                                    <CardMovie movie={m} index={i} />
                                </div>
                            ))}
                            {resultsDirectors.map((d, i) => (
                                <div className="col-md-4 mb-3" key={`director-${i}`}>
                                    <CardDirector director={d} index={i} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>Nessun risultato trovato.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default SearchPage;