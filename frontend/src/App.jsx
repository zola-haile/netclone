import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import MoviesPage from "./pages/Movies/MoviesPage.jsx";
import ShowsPage from "./pages/Shows/ShowsPage.jsx";
import WatchPage from "./pages/Watch/WatchPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import MainLayout from "./components/Layout/MainLayout.jsx";
import ProtectedRoute from "./components/Layout/ProtectedRoute.jsx";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route>
            <Route element={<MainLayout/>}>
              <Route path="/" element={<HomePage />}/>
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/shows" element={<ShowsPage />} />
              <Route path="/watch" element={<WatchPage/>}/>
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage/>}/>
      
        </Routes>

    </BrowserRouter>
  )
}

export default App
