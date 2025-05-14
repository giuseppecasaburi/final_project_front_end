import { NavLink } from "react-router-dom";

function AppHeader() {
    const navLinks = [
        {
            path: "",
            title: "HomePage",
        },

        {
            path: "/a",
            title: "Films",
        },

        {
            path: "/ss",
            title: "Registi",
        },
    ];

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg px-3">
                    <div className="container-fluid">
                        <a className="navbar-brand" href={navLinks[0].path}>
                            <img src="img/logo.png" alt="Logo" width="auto" height="50" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {navLinks.map((link) => (
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link active text-warning" : "nav-link"} to={link.path} aria-current="page">{link.title}</NavLink>
                                    </li>
                                ))}


                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Film o Regista" aria-label="Search" />
                                <button className="btn btn-outline-secondary" type="submit">Cerca</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default AppHeader;