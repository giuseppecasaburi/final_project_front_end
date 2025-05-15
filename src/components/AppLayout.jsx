import { Outlet } from "react-router-dom"
import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"

function AppLayout() {
    return (
        <>
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <Outlet />
                <AppFooter />
            </div>
        </>
    )
}

export default AppLayout