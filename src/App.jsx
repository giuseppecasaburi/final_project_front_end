import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
