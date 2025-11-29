import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { PlayerProvider } from "./context/PlayerContext";
import Favorites from "./pages/favorites";
import Explore from "./pages/explore";
import Profile from "./pages/profile";

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing page ("/") */}
          <Route path="/" element={<Home />} />

          {/* Página do player (/home e /player apontam para o mesmo lugar) */}
          <Route path="/home" element={<Player />} />
          <Route path="/player" element={<Player />} />

          {/* Página de Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Página de Cadastro */}
          <Route path="/register" element={<RegisterPage />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/profile" element={<Profile />} />
          {/* Rota coringa para redirecionar para a home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
