import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  
  async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("topo_usuario");
    navigate("/login");
  }

  useEffect(() => {
    fetch(`http://localhost:3334/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("tipo_usuario");
          alert('faça o login')
          navigate("/login");
        } 
      })
      .catch((error) => {
      });
  }, []);
  return (
    <div className="w-full h-12 px-32 bg-primary flex items-center justify-between fixed">
      <div>logo</div>
      <div><button onClick={logout}>sair</button></div>
    </div>
  )
}