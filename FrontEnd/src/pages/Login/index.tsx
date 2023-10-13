import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const loginUser = async () => {
        if (!email || !senha) {
          alert('preencha os campos corretamente')
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
                navigate("/");
            })
            .catch((error) => {
              alert('Login inválido')
            });
        }
      };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    });

    return (
        <div className='w-screen h-screen flex bg-slate-400 px-[10%] py-[5%] items-center'>
            <div className='w-1/2'>
            </div>
            <section className='w-[40%] h-[70%] p-4 bg-white rounded-xl flex flex-col items-center justify-start'>
                <div className='w-[90%] h-[60%] flex flex-col justify-between'>
                    <label className='text-2xl font-semibold'>E-mail</label>
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className='text-2xl font-semibold'>Senha</label>
                    <input type="text" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button onClick={loginUser} className='w-full bg-secondary rounded-lg my-2 text-white font-semibold text-2xl'>Entrar</button>
                    <button onClick={() => {}} className='text-secondary'>Cadastre-se</button>
                </div>
            </section>
        </div>
    );
}

export default Login;