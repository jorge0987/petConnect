import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../PageTemplate";
import { api } from "../../api";
import Button from "../../components/Button";

function Home() {
  const [typeUser, setTypeUser] = useState<string>(
    String(localStorage.getItem("tipo_usuario"))
  );
  const [posts, setPosts] = useState<Array<any>>([]);
  const navigate = useNavigate();

  async function getPosts() {
    const res = await api.index({ params: "animal" });
    if (res.statusCode) {
      alert("erro ao carregar Animais!");
    } else {
      setPosts(res.result);
    }
  }

  useEffect(() => {
    const req = async () => {
      await getPosts();
    };
    req();
  }, []);

  return (
    <PageTemplate>
      {(typeUser === "1" && (
        <div className="w-full flex justify-center pt-10 bg-background">
          <section className="w-[60%] bg-gray-200 flex flex-col pt-10 px-10">
            {posts.map((animal: any, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full min-h-[500px] p-6 rounded-xl bg-white mb-10 flex flex-col justify-between"
                >
                  <div className="w-full h-8 flex items-center">
                    <div className="w-7 h-7 rounded-full bg-black mr-2"></div>
                    <p>{animal.user.nome}</p>
                  </div>
                  <div className="w-full flex justify-between my-6">
                    <div className="w-1/2 flex flex-col">
                      <div className="flex">
                        <h3 className="font-semibold mr-2">Espécie: </h3>
                        <p>{animal.especie}</p>
                      </div>
                      <div className="flex">
                        <h3 className="font-semibold mr-2">Idade: </h3>
                        <p>{animal.idade}</p>
                      </div>
                      <div className="flex">
                        <h3 className="font-semibold mr-2">Sexo: </h3>
                        <p>{animal.sexo}</p>
                      </div>
                      <div className="flex">
                        <h3 className="font-semibold mr-2">Descrição: </h3>
                        <p>{animal.descricao}</p>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <div className="flex">
                        <h3 className="font-semibold mr-2">Raça: </h3>
                        <p>{animal.raca}</p>
                      </div>
                      <div className="flex">
                        <h3 className="font-semibold mr-2">tamanho: </h3>
                        <p>{animal.tamanho}</p>
                      </div>
                      <div className="flex">
                        <h3 className="font-semibold mr-2">Sexo: </h3>
                        <p>{animal.personalidade}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-full h-[80%] grid gap-0 ${
                      animal.fotos?.length > 1 ? "grid-cols-2" : "grid-cols-1"
                    } ${
                      animal.fotos?.length > 2 ? "grid-rows-2" : "grid-rows-1"
                    }`}
                  >
                    {animal.fotos?.map((foto: any, i: number) => {
                      return (
                        <img
                          key={i + index}
                          src={foto.arquivo}
                          className="w-full h-full"
                        />
                      );
                    })}
                  </div>
                  <div className="w-full flex items-end justify-end mt-4">
                    <Button text="Interesse na adoção" className="w-60 bg-[#53740E]"/>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      )) || <div>página em construção</div>}
    </PageTemplate>
  );
}

export default Home;
