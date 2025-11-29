import React, { useState } from "react";
import "../styles/index.css";
import Logo from '../assets/Logo-removebg-preview.png'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.username || !form.email || !form.password) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser(form);
      console.log("Registro sucesso:", result);
      
      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        navigate("/home");
      }
    } catch (err: any) {
      console.error("Erro no registro:", err);
      const msg = err?.response?.data?.detail || "Erro ao registrar";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center p-4">
      <div className="login-card p-4 rounded-4">
        <div className="login-logo text-center mb-3">
          <img src={Logo} alt="logo" />
        </div>

        <h2 className="text-center mb-4" style={{ fontWeight: 600 }}>
          Criar sua conta
        </h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            name="username"
            className="form-control login-input"
            placeholder="Seu username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control login-input"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control login-input"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            className="primary mt-2 w-100"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <div className="divider my-4">
          <span>ou</span>
        </div>

        <div className="d-flex flex-column gap-2">
          <button className="social-btn google"> <FcGoogle size={20} /> Entrar com Google</button>
          <button className="social-btn github"> <FaGithub size={20} /> Entrar com GitHub</button>
          <button className="social-btn apple">  <FaApple size={20} /> Entrar com Apple</button>
        </div>

        <p className="mt-4 text-center" style={{ fontSize: "0.9rem" }}>
          Já tem conta? {" "}
          <a href="/login" className="text-gradient" style={{ fontWeight: 600 }}>
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
