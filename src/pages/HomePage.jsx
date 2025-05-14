import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMovies()
    }, [])

    const getMovies = () => {
        axios.get("http://127.0.0.1:8000/api/movies").then((resp) => {
            const movies = resp.data.data

            setMovies(movies)
        })
    }

    console.log(movies)

    return (
        <main>
            <div className="hero position-relative text-white text-center">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="/img/hero_harry_p.jpg" class="d-block w-100" alt="/img/hero_harry_p" />
                        </div>
                        <div class="carousel-item">
                            <img src="/img/hero_odissea.jpg" class="d-block w-100" alt="/img/hero_harry_p" />
                        </div>
                        <div class="carousel-item">
                            <img src="/img/hero_turman.jpg" class="d-block w-100" alt="/img/hero_harry_p" />
                        </div>
                    </div>


                </div>
                {/* Overlay per rendere leggibile il testo */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} // Sfondo nero trasparente
                ></div>

                {/* Contenuto sopra l'overlay */}
                <div className="hero-overlay position-absolute top-50 start-50 translate-middle">
                    <h1 className="fw-bold pb-2">I film imperdibili, tutti in un solo posto</h1>
                    <p className="fs-5 pb-2 d-custom-none">
                        Esplora le migliori pellicole da vedere da solo, con gli amici o in famiglia. Dai grandi classici ai capolavori moderni: lasciati ispirare, emozionare e sorprendere.
                    </p>
                    <Link to={`/`} className="btn ms-btn btn-outline-warning mt-2">Lista Film</Link>
                    <Link to={`/`} className="btn ms-btn btn-outline-warning mt-2">Lista Registi</Link>
                </div>
            </div>




            {/* <h1 class="home">Home</h1>
            <ul>
                {movies.map((movie) => (
                    <li>{movie.title}</li>
                ))}
            </ul> */}
        </main>
    )
}


export default HomePage;