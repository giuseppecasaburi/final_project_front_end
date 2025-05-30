import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import CardMovie from "./CardMovie";
import CardDirector from "./CardDirector";
import CustomSelect from "./CustomSelect";
import CustomSelectDirector from "./CustomSelectDirector";
import Loader from "./AppLoader";

const apiUrl = import.meta.env.VITE_URL_API;
const apiStorage = import.meta.env.VITE_URL_STORAGE;

function SearchPage() {
    // Prelievo dei parametri dalla ricerca e navigazione programmatica
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Flag per controllare gli aggiornamenti dell'URL
    const isInitialMount = useRef(true);
    const isUpdatingFromURL = useRef(false);

    // Funzioni per estrarre parametri dall'URL
    const getQueryParam = () => searchParams.get("query_search") || "";
    const getGenresParam = () => searchParams.get("genres") ? searchParams.get("genres").split(",").map(id => parseInt(id, 10)) : [];
    const getDirectorsParam = () => searchParams.get("directors") ? searchParams.get("directors").split(",").map(id => parseInt(id, 10)) : [];

    // Stati per paginazione separata
    const [moviesPage, setMoviesPage] = useState(1);
    const [directorsPage, setDirectorsPage] = useState(1);
    const [moviesLastPage, setMoviesLastPage] = useState(1);
    const [directorsLastPage, setDirectorsLastPage] = useState(1);

    // Stati per la query e risultati
    const [query, setQuery] = useState(getQueryParam());
    const [resultsMovies, setResultsMovies] = useState([]);
    const [resultsDirectors, setResultsDirectors] = useState([]);
    const [totalMovies, setTotalMovies] = useState(0);
    const [totalDirectors, setTotalDirectors] = useState(0);

    // Stati per i filtri
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(getGenresParam());
    const [selectedDirectors, setSelectedDirectors] = useState(getDirectorsParam());
    const [loading, setLoading] = useState(true);

    // Carica generi e registi all'avvio
    useEffect(() => {
        axios.get(`${apiUrl}/genres`).then(r => setGenres(r.data.data));
        axios.get(`${apiUrl}/select_directors`).then(r => setDirectors(r.data.data));
        
    }, []);

    // Funzione per chiamare l'API search con params correnti
    const fetchSearch = useCallback(async (params) => {
        setLoading(true);
        try {
            const resp = await axios.get(`${apiUrl}/search`, {
                params: params
            });

            // Gestione dei risultati per film
            if (params.moviesPage === 1) {
                setResultsMovies(resp.data.movies.data);
            } else {
                setResultsMovies(prev => [...prev, ...resp.data.movies.data]);
            }
            setMoviesLastPage(resp.data.movies.last_page);
            setTotalMovies(resp.data.movies.total);

            // Gestione dei risultati per registi
            if (params.directorsPage === 1) {
                setResultsDirectors(resp.data.directors.data);
            } else {
                setResultsDirectors(prev => [...prev, ...resp.data.directors.data]);
            }
            setDirectorsLastPage(resp.data.directors.last_page);
            setTotalDirectors(resp.data.directors.total);

        } catch (error) {
            console.error("Errore nella ricerca:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Gestore form submit
    const handleFilterSubmit = (e) => {
        e.preventDefault();

        // Resetta paginazione
        setMoviesPage(1);
        setDirectorsPage(1);

        // Esegui ricerca
        fetchSearch({
            query_search: query,
            genres: selectedGenres.length ? selectedGenres : undefined,
            directors: selectedDirectors.length ? selectedDirectors : undefined,
            moviesPage: 1,
            directorsPage: 1
        });
    };

    // Gestori checkboxes e selezioni
    const handleGenreCheckbox = (e) => {
        const genreId = parseInt(e.target.value, 10);
        setSelectedGenres(prev =>
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    const handleGenreChange = (selectedOptions) => {
        const newSelectedGenres = selectedOptions.map(option => option.value);
        setSelectedGenres(newSelectedGenres);
    };

    const handleDirectorCheckbox = (e) => {
        const directorId = parseInt(e.target.value, 10);
        setSelectedDirectors(prev =>
            prev.includes(directorId)
                ? prev.filter(id => id !== directorId)
                : [...prev, directorId]
        );
    };

    const handleDirectorChange = (selectedOptions) => {
        const newSelectedDirectors = selectedOptions.map(option => option.value);
        setSelectedDirectors(newSelectedDirectors);
    };

    const handleClearFilters = () => {
        setSelectedGenres([]);
        setSelectedDirectors([]);
        setMoviesPage(1);
        setDirectorsPage(1);
    };

    // Gestori "carica altri"
    const handleLoadMoreMovies = () => {
        const nextPage = moviesPage + 1;
        setMoviesPage(nextPage);

        fetchSearch({
            query_search: query,
            genres: selectedGenres.length ? selectedGenres : undefined,
            directors: selectedDirectors.length ? selectedDirectors : undefined,
            moviesPage: nextPage,
            directorsPage: directorsPage
        });
    };

    const handleLoadMoreDirectors = () => {
        const nextPage = directorsPage + 1;
        setDirectorsPage(nextPage);

        fetchSearch({
            query_search: query,
            genres: selectedGenres.length ? selectedGenres : undefined,
            directors: selectedDirectors.length ? selectedDirectors : undefined,
            moviesPage: moviesPage,
            directorsPage: nextPage
        });
    };

    // Effetto per rilevare i cambiamenti nell'URL (per le ricerche dall'header)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Stiamo controllando i cambiamenti URL
        isUpdatingFromURL.current = true;

        const newQuery = getQueryParam();
        const newGenres = getGenresParam();
        const newDirectors = getDirectorsParam();

        // Aggiorna gli stati con i nuovi valori dall'URL
        setQuery(newQuery);
        setSelectedGenres(newGenres);
        setSelectedDirectors(newDirectors);

        // Resetta paginazione
        setMoviesPage(1);
        setDirectorsPage(1);

        // Esegui la ricerca con i nuovi parametri
        if (newQuery || newGenres.length > 0 || newDirectors.length > 0) {
            fetchSearch({
                query_search: newQuery,
                genres: newGenres.length ? newGenres : undefined,
                directors: newDirectors.length ? newDirectors : undefined,
                moviesPage: 1,
                directorsPage: 1
            });
        } else {
            // Nessun parametro di ricerca, pulisci i risultati
            setResultsMovies([]);
            setResultsDirectors([]);
            setTotalMovies(0);
            setTotalDirectors(0);
            setLoading(false);
        }

        // Fine aggiornamento da URL
        setTimeout(() => {
            isUpdatingFromURL.current = false;
        }, 0);

    }, [location.search, fetchSearch]);

    // Aggiorna l'URL quando gli stati cambiano (ma solo se non stiamo aggiornando da URL)
    useEffect(() => {
        // Salta il primo rendering e gli aggiornamenti da URL
        if (isInitialMount.current || isUpdatingFromURL.current) {
            return;
        }

        // Crea i nuovi parametri di ricerca
        const params = new URLSearchParams();
        if (query) params.set("query_search", query);
        if (selectedGenres.length) params.set("genres", selectedGenres.join(","));
        if (selectedDirectors.length) params.set("directors", selectedDirectors.join(","));

        // Aggiorna l'URL solo se i parametri sono effettivamente cambiati
        const newSearchString = params.toString();
        const currentSearchString = searchParams.toString();

        if (newSearchString !== currentSearchString) {
            setSearchParams(params, { replace: true });
        }
    }, [query, selectedGenres, selectedDirectors, searchParams, setSearchParams]);

    return (
        <div className="d-sm-flex d-block">
            {loading && resultsMovies.length === 0 && resultsDirectors.length === 0 ? (
                <Loader />
            ) : (
                <>
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
                                <div className="d-block d-sm-none mb-3 text-dark">
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
                                <div className="d-block d-sm-none mb-3 text-dark">
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
                        {(query || selectedGenres.length > 0 || selectedDirectors.length > 0) && (
                            <h2>{totalMovies + totalDirectors} Risultati</h2>
                        )}

                        {/* Sezione Film */}
                        {(query || selectedGenres.length > 0 || selectedDirectors.length > 0) && (
                            <section className="mb-5">
                                <h3 className="mb-3">Film ({totalMovies})</h3>
                                <div className="row">
                                    {resultsMovies.length > 0 ? (
                                        resultsMovies.map((m, i) => (
                                            <div className="col-md-4 mb-3" key={`movie-${m.id}`}>
                                                <CardMovie url={apiStorage} movie={m} index={i} />
                                            </div>
                                        ))
                                    ) : (
                                        <p>Nessun film trovato.</p>
                                    )}
                                </div>
                                {resultsMovies.length > 0 && moviesPage < moviesLastPage && (
                                    <div className="text-center mt-3">
                                        <button
                                            className="btn btn-warning"
                                            onClick={handleLoadMoreMovies}
                                            disabled={loading}
                                        >
                                            {loading ? 'Caricamento...' : 'Carica altri film'}
                                        </button>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Sezione Registi - mostrata solo se c'è una ricerca testuale */}
                        {query && (
                            <section>
                                <h3 className="mb-3">Registi ({totalDirectors})</h3>
                                <div className="row">
                                    {resultsDirectors.length > 0 ? (
                                        resultsDirectors.map((d, i) => (
                                            <div className="col-md-4 mb-3" key={`director-${d.id}`}>
                                                <CardDirector url={apiStorage} director={d} index={i} />
                                            </div>
                                        ))
                                    ) : (
                                        <p>Nessun regista trovato.</p>
                                    )}
                                </div>
                                {resultsDirectors.length > 0 && directorsPage < directorsLastPage && (
                                    <div className="text-center mt-3">
                                        <button
                                            className="btn btn-warning"
                                            onClick={handleLoadMoreDirectors}
                                            disabled={loading}
                                        >
                                            {loading ? 'Caricamento...' : 'Carica altri registi'}
                                        </button>
                                    </div>
                                )}
                            </section>
                        )}
                    </main>
                </>
            )}
        </div>
    );
}

export default SearchPage;