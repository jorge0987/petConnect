import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import login from '../../assets/login.svg'
import { message } from "antd";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const loginUser = async () => {
    if (!email || !senha) {
      message.error({
        content: "Preencha os campos corretamente",
        style: {
          color: 'red'
        }
      });
    } else {
      fetch(`http://localhost:3334/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha: senha,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("tipo_usuario", data.tipo_usuario);
          navigate("/");
        })
        .catch((error) => {
          message.error({
            content: "Login inválido",
            style: {
              color: 'red'
            }
          });
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="w-screen h-screen flex bg-slate-400 px-[10%] py-[5%] items-center justify-between">
      <div className="w-1/2 h-full">
        <img src={login} width={500} height={300} alt=""/>
      </div>
      <section className="w-[40%] h-[70%] p-4 bg-white rounded-xl flex flex-col items-center justify-start">
        <div className="w-[90%] h-[60%] flex flex-col justify-between">
          <label className="text-2xl font-semibold">E-mail</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-2xl font-semibold">Senha</label>
          <input
            type="password"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            onClick={loginUser}
            className="w-full bg-secondary rounded-lg my-2 text-white font-semibold text-2xl"
          >
            Entrar
          </button>
          <button onClick={() => navigate("/register")} className="text-secondary">
            Cadastre-se
          </button>
        </div>
      </section>
    </div>
  );
}

export default Login;
