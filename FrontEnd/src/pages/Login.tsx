import { useState } from "react";
import { loginUser } from "../services/auth";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo-removebg-preview.png";

export default function LoginPage() {
  // Campos controlados para email e senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Lógica de login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    const payload = { email, password: senha };
    console.log("ENVIANDO:", payload);

    try {
      const result = await loginUser(payload);
      console.log("RESPOSTA DO BACK:", result);

      // Se recebeu token, salva e redireciona
      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        window.location.href = "/home";
      }

    } catch (err: any) {
      console.error("ERRO:", err);

      const msg = err?.response?.data?.detail || "Erro desconhecido";
      alert(msg);
    }
  }

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      {/* Cartão central de login */}
      <div className="login-card p-4 p-md-5 rounded-4 text-center shadow-lg">

        {/* Logo */}
        <div className="login-logo mb-3">
          <img src={Logo} alt="Synesthesia Logo" className="img-fluid logo-img" />
        </div>

        <h2 className="fw-bold mb-2 text-gradient">Entrar</h2>

        {/* Formulário de login */}
        <form className="d-flex flex-column gap-3 mt-3" onSubmit={handleLogin}>
          {/* Campo email */}
          <div className="text-start">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
            />
          </div>

          {/* Campo senha */}
          <div className="text-start">
            <label htmlFor="senha" className="input-label">Senha</label>
            <input
              id="senha"
              type="password"
              className="form-control login-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Botão */}
          <button type="submit" className="btn primary w-100 mt-2">
            Entrar
          </button>
        </form>

        {/* Link para cadastro */}
        <p className="mt-4 small">
          Não tem conta? <Link to="/register" className="text-gradient fw-semibold">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
