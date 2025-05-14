import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"
import SearchPage from './components/SearchPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />}/>
            <Route path="/search" element={<SearchPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
