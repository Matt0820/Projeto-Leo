import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page ("/") */}
        <Route path="/" element={<Home />} />

        {/* Página do player */}
        <Route path="/player" element={<Player />} />

        {/* Página de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Página de Cadastro */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
