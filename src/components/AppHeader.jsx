import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AppHeader() {
    const navLinks = [
        {
            path: "/",
            title: "HomePage",
        },

        {
            path: "/movies",
            title: "Films",
        },

        {
            path: "/directors",
            title: "Registi",
        },
    ];

    // Stato per la ricerca
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg px-3">
                    <div className="container-fluid">
                        <a className="navbar-brand" href={navLinks[0].path}>
                            <img src="img/logo.png" alt="Logo" width="auto" height="60" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {navLinks.map((link, index) => (
                                    <li key={index} className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to={link.path} aria-current="page">{link.title}</NavLink>
                                    </li>
                                ))}


                            </ul>
                            <form className="d-flex" role="search" onSubmit={(e) => {
                                e.preventDefault();
                                if (search.trim() === "") return;

                                navigate(`/search?query_search=${encodeURIComponent(search)}`)
                            }}>
                                <input className="form-control me-2" type="search" placeholder="Film o Regista" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <button className="btn btn-warning" type="submit">Cerca</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default AppHeader;