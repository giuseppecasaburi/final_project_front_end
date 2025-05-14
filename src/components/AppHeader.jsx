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
                <nav class="navbar navbar-expand-lg px-3">
                    <div class="container-fluid">
                        <a class="navbar-brand" href={navLinks[0].path}>
                            <img src="img/logo.png" alt="Bootstrap" width="auto" height="50" />
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                {navLinks.map((link) => (
                                    <li class="nav-item">
                                        <NavLink class={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to={link.path} aria-current="page">{link.title}</NavLink>
                                    </li>
                                ))}


                            </ul>
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Film o Regista" aria-label="Search" />
                                <button class="btn btn-outline-secondary" type="submit">Cerca</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default AppHeader;