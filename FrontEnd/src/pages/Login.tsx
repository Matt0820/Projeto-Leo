import { Link } from "react-router-dom";
import Logo from "../assets/Logo-removebg-preview.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import "../styles/index.css";

export default function LoginPage() {
  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card p-4 p-md-5 rounded-4 text-center shadow-lg">

        {/* LOGO */}
        <div className="login-logo mb-3">
          <img src={Logo} alt="Synesthesia Logo" className="img-fluid logo-img" />
        </div>

        {/* TÍTULO */}
        <h2 className="fw-bold mb-2 text-gradient">Entrar</h2>

        {/* SUBTÍTULO */}
        <p className="text-light-50 mb-4 small">
          Acesse sua conta e viva a experiência audiovisual completa.
        </p>

        {/* FORM */}
        <form className="d-flex flex-column gap-3 mt-3">
          <div className="text-start">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control login-input"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className="text-start">
            <label htmlFor="senha" className="input-label">Senha</label>
            <input
              id="senha"
              type="password"
              className="form-control login-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn primary w-100 mt-2">
            Entrar
          </button>
        </form>

        {/* LINK REGISTRO */}
        <p className="mt-4 small">
          Não tem conta?{" "}
          <Link to="/register" className="text-gradient fw-semibold">
            Criar conta
          </Link>
        </p>

        {/* DIVISOR */}
        <div className="divider my-4 d-flex align-items-center">
          <span className="divider-line"></span>
          <span className="divider-text mx-auto">ou continue com</span>
          <span className="divider-line"></span>
        </div>

        {/* SOCIAL LOGIN */}
        <div className="social-login d-flex flex-column gap-3">
          <button className="social-btn google">
            <FcGoogle size={20} className="me-2" />
            Entrar com Google
          </button>

          <button className="social-btn github">
            <FaGithub size={20} className="me-2" />
            Entrar com GitHub
          </button>

          <button className="social-btn apple">
            <FaApple size={20} className="me-2" />
            Entrar com Apple
          </button>
        </div>

      </div>
    </div>
  );
}
