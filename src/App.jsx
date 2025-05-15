import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"
import SearchPage from './components/SearchPage'
import MoviePage from './pages/MoviesPage'
import DirectorPage from './pages/DirectorsPage'
import SingleMovie from './pages/SingleMovie'
import SingleDirector from './pages/SingleDirector'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movies/:id" element={<SingleMovie />} />
            <Route path="/directors" element={<DirectorPage />} />
            <Route path="/directors/:id" element={<SingleDirector/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
