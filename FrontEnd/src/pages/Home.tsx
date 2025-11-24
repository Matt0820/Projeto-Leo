import Logo from "../assets/Logo-removebg-preview.png";
import Gif from "../assets/demo.mp4";
import { Link } from "react-router-dom";



export default function Home() {
  return (
    <div className="landing-page">
          <div className="landing-page">
      {/* HERO */}
      <section className="hero container d-flex flex-column align-items-center text-center py-5">
        <div className="logo mb-4">
          <img
            src={Logo}
            alt="Synesthesia Logo"
            className="img-fluid hero-logo"
          />
        </div>

        <h1 className="fw-bold hero-title">Synesthesia</h1>

        <p className="hero-subtitle text-light-50 mx-auto">
          Uma experiência musical interativa — visualizações, playlists
          inteligentes e uma interface viva.
        </p>

        <div className="scroll-indicator mt-4 text-light-50">
          <i className="bi bi-arrow-down fs-3 opacity-75"></i>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features container text-center py-5">
        <h2 className="fw-bold mb-4">O que o Synesthesia oferece?</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card p-4 rounded-4 h-100">
              <h4 className="fw-semibold">Visualizações Dinâmicas</h4>
              <p className="text-light-50 mt-2">
                Gráficos que reagem ao ritmo e intensidade da música.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card p-4 rounded-4 h-100">
              <h4 className="fw-semibold">Playlists Inteligentes</h4>
              <p className="text-light-50 mt-2">
                Crie ou descubra playlists que se adaptam ao seu momento.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card p-4 rounded-4 h-100">
              <h4 className="fw-semibold">Interface Viva</h4>
              <p className="text-light-50 mt-2">
                Uma UI que muda conforme a música — fluida e moderna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE SHOWCASE */}
      <section className="showcase container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6 text-center">
            <video
              src={Gif}
              className="img-fluid rounded-4 showcase-img"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold">Música que você vê.</h2>
            <p className="text-light-50 mt-3">
              O player transforma frequências, batidas e intensidade em
              movimento. Cada faixa vira uma experiência audiovisual única.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="final-cta container text-center py-5">
        <h2 className="fw-bold">Pronto para entrar?</h2>
        <p className="text-light-50 mt-2 mb-4">
          Sinta a música como nunca antes.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="primary btn">Começar</Link>
          <Link to='/player' className="secondary btn">Ver Player</Link>
        </div>
      </section>
    </div>
    </div>
  );
}
