import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  async function logout() {
    localStorage.removeItem("token");
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
          alert('faça o login')
          navigate("/login");
        } 
      })
      .catch((error) => {
      });
  }, []);
  return <div>Welcome to the Home page!
    <button onClick={logout}>sair</button>
  </div>;
}

export default Home;
