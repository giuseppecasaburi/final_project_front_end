import { NavLink } from "react-router-dom";

function AppFooter() {
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
        <footer className="mt-auto">
            <div
                id="footer-div"
                className="container d-flex flex-column flex-sm-row flex-wrap justify-content-between align-items-center text-center"
            >
                {/* Colonna 1: Copyright */}
                <div className="text-center py-3">
                    <p className="mb-0">© 2025 Company, Inc</p>
                </div>

                {/* Colonna 2: Logo */}
                <div className="text-center py-3">
                    <img src="./img/logo.png" alt="Logo" height="50" />
                </div>

                {/* Colonna 3: Navigazione */}
                <div className="text-center py-3">
                    <ul className="nav d-flex flex-column flex-sm-row justify-content-center">
                        {navLinks.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active text-warning" : "nav-link"
                                    }
                                    to={link.path}
                                    aria-current="page"
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default AppFooter