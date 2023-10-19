import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../PageTemplate";
import { api } from "../../api";
import Button from "../../components/Button";
import { UilPlus, UilPentagon } from "@iconscout/react-unicons";
import Label from "../../components/Label";
import { message } from "antd";
import wellcome from '../../assets/wellcome.svg'
import empty from '../../assets/empty.svg'

type AnimalProps = {
  especie: string;
  raca: string;
  idade: string;
  tamanho: string;
  sexo: string;
  descricao: string;
  personalidade: string;
  user_id: string;
  fotos: Array<any>;
};

const emptyData = {
  especie: "",
  raca: "",
  idade: "",
  tamanho: "",
  sexo: "",
  descricao: "",
  personalidade: "",
  user_id: localStorage.getItem("userId") || "",
  fotos: [],
};

function Home() {
  const [typeUser, setTypeUser] = useState<string>(
    String(localStorage.getItem("tipo_usuario"))
  );
  const [value, setValue] = useState<any>("");
  const [institution, setInstitution] = useState(false);
  const [enableForm, setEnableForm] = useState(false);
  const [data, setData] = useState<AnimalProps>(emptyData);
  const [posts, setPosts] = useState<Array<any>>([]);
  const navigate = useNavigate();

  function addFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    let blob: any;
    reader.onload = function (event: any) {
      blob = new Blob([event.target.result], { type: file.type });
      // Faça algo com o objeto Blob aqui, como enviá-lo para o servidor ou processá-lo localmente

      const readerBase64 = new FileReader();
      readerBase64.onloadend = function () {
        const base64data = readerBase64.result;
        data.fotos.push(base64data);
        setData({ ...data, fotos: [...data.fotos] });
      };
      readerBase64.readAsDataURL(blob);
    };

    reader.readAsArrayBuffer(file);
  }

  async function register() {
    if (!data.sexo || !data.tamanho || !data.especie) {
      message.error({
        content: 'Preencha os dados obrigatório do animal',
        style: {
          color: 'red'
        }
      }); 
      return;
    }
    if (!data.fotos.length) {
      message.error({
        content: 'Adicione pelo menos uma foto ao animal',
        style: {
          color: 'red'
        }
      }); 
      return;
    }
    data.user_id = localStorage.getItem("userId") || "";

    const res = await api.register({ params: "animal", body: data });
    if (res.statusCode) {
      message.error({
        content: res.statusCode,
        style: {
          color: 'red'
        }
      }); 
    } else {
      message.success({
        content: 'Animal cadastrado com sucesso1',
      });
      await getAnimalsByInstitution()
      setEnableForm(false);
      setData({ ...emptyData, fotos: [] });
    }
  }

  async function confirmAdocao(animal) {
    await api.adotarAnimal(animal.id)
    message.success({
      content: 'Adoção aprovada com sucesso'
    })
    await getAnimalsByInstitution();
    
  }

  async function getPosts() {
    const res = await api.index({ params: "animal" }, true);
    if (res.statusCode) {
      message.error({
        content: 'erro ao carregar Animais!',
        style: {
          color: 'red'
        }
      });
    } else {
      setPosts(res.result);
    }
  }
  async function getInteresseByAnimal(animal: any) {
    const res = await api.listInteresseByAnimal(animal.id);
    if (res.statusCode) {
      message.error({
        content: 'erro ao carregar Animais!',
        style: {
          color: 'red'
        }
      });
    } else {
      animal.interessados = res;
      setPosts([...posts]);
    }
  }
  function removeFile(index: number) {
    if (data.fotos[index].id) {
      data.fotos[index].excluir = true;
    } else {
      data.fotos.splice(index, 1);
    }
    setData({ ...data, fotos: data.fotos });
  }

  async function getAnimalsByInstitution() {
    const res = await api.getAnimalsByInstitution();
    
    if (res.statusCode) {
      message.error({
        content: 'erro ao carregar Animais!',
        style: {
          color: 'red'
        }
      });
    } else {
      setPosts(res);
    }
  }

  function refreshCurrentPosts() {
    setPosts([...posts]);
  }

  async function addInteresse(animal: any) {
    const res = await api.addInteresse(animal.id);
    if (res.statusCode) {
      animal.interesseActive = !animal.interesseActive;
      message.error({
        content: 'Falha',
        style: {
          color: 'red'
        }
      });
    } else {
      animal.interesseActive = !animal.interesseActive;
      message.success({
        content: animal.interesseActive ? 'Interesse adicionado com sucesso!' : 'Interesse removido com sucesso!',
      });
    }
    refreshCurrentPosts();
  }

  useEffect(() => {
    if (typeUser === "1") {
      const req = async () => {
        await getPosts();
      };
      req();
    } else {
      setInstitution(true);
      const req = async () => {
        await getAnimalsByInstitution();
      };
      req();
    }
  }, []);

  return (
    <PageTemplate>
      {(typeUser === "1" && (
        <div className="w-full flex justify-center pt-10 bg-background">
          <section className={`w-[60%] flex flex-col pt-10 px-10 ${posts.length ? 'bg-gray-200' : ''}`}>
            {posts.length > 0 && posts.map((animal: any, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full min-h-[500px] p-6 rounded-xl bg-white mb-10 flex flex-col justify-between"
                >
                  {!institution && (
                    <div className="w-full h-8 flex items-center">
                      {(animal.user.foto && (
                        <img
                          src={animal.user.foto || ""}
                          className="w-7 h-7 rounded-full bg-black mr-2"
                        />
                      )) || (
                        <div className="w-7 h-7 rounded-full border-2 border-gray-300 mr-2">
                          <UilPentagon />
                        </div>
                      )}
                      <p>{animal.user.nome}</p>
                    </div>
                  )}
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
                    <Button
                      text={`${
                        !animal.interesseActive
                          ? "Interesse na adoção"
                          : "Remover interesse"
                      }`}
                      handle={() => addInteresse(animal)}
                      className={`w-60 ${
                        animal.interesseActive ? "bg-gray-400" : "bg-[#53740E]"
                      }`}
                    />
                  </div>
                </div>
              );
            }) ||
              <div className="w-full h-full flex flex-col justify-center items-center">
                <img src={wellcome} alt="" />
                <p className="my-4 text-secondary text-2xl">
                  No momento não há nenhum animal disponível no sistema!
                </p>
              </div>
            }
          </section>
        </div>
      )) || (
        <div>
          {
            ((posts.length > 0) || enableForm) &&
            <div className="w-full px-32 pt-4">
              <div className="w-1/3 border-b-[2px] pb-1 my-10 border-secondary pr-3">
                <h2 className="text-2xl">
                  {enableForm
                    ? "Cadastro de Animal"
                    : "Seus animais ja cadastrados"}
                </h2>
              </div>
            </div>
          }
          {(enableForm && (
            <div>
              <section
                className={`h-full w-full px-32 pb-10 ${
                  enableForm ? "bg-background" : ""
                }`}
              >
                <div className="w-full flex justify-between">
                  <Label name="Espécie do animal" width="w-[48%]" required>
                    <input
                      type="text"
                      value={data.especie}
                      onChange={(e) => {
                        setData({ ...data, especie: e.target.value });
                      }}
                    />
                  </Label>
                  <Label name="Raça" width="w-[48%]">
                    <input
                      type="text"
                      value={data.raca}
                      onChange={(e) => {
                        setData({ ...data, raca: e.target.value });
                      }}
                    />
                  </Label>
                </div>
                <div className="w-full flex justify-between">
                  <Label name="Idade" width="w-[48%]">
                    <input
                      type="text"
                      value={data.idade}
                      onChange={(e) => {
                        setData({ ...data, idade: e.target.value });
                      }}
                    />
                  </Label>
                  <Label name="Tamanho" width="w-[48%]" required>
                    <input
                      type="text"
                      value={data.tamanho}
                      onChange={(e) => {
                        setData({ ...data, tamanho: e.target.value });
                      }}
                    />
                  </Label>
                </div>
                <Label name="Sexo" width="w-[48%]" required>
                  <input
                    type="text"
                    value={data.sexo}
                    onChange={(e) => {
                      setData({ ...data, sexo: e.target.value });
                    }}
                  />
                </Label>
                <Label name="Descrição" width="w-full">
                  <textarea
                    value={data.descricao}
                    className="resize-none h-16"
                    onChange={(e) => {
                      setData({ ...data, descricao: e.target.value });
                    }}
                  />
                </Label>
                <Label name="Personalidade" width="w-[48%]">
                  <input
                    type="text"
                    value={data.personalidade}
                    onChange={(e) => {
                      setData({ ...data, personalidade: e.target.value });
                    }}
                  />
                </Label>
                <div className="w-full h-[200px] grid grid-cols-4">
                  {data.fotos?.map((foto: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-[90%] p-2 h-[200px] rounded-3xl group/item relative"
                      >
                        <img src={foto} className="w-full h-full rounded-3xl" />
                        <div
                          className={`w-[95%] m-auto flex justify-center items-center h-[90%] top-[10px] left-[10px] group/edit invisible rounded-[10px] opacity-70 group-hover/item:visible absolute
                          `}
                        >
                          <div
                            className="group-hover/item:text-white w-[100px] h-[100px] border-2 border-white rounded-xl flex items-center justify-center"
                            onClick={() => removeFile(index)}
                          >
                            <i className="group-hover/item:text-white uil uil-trash-alt h-[160px] cursor-pointer text-[100px]"></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {!(data.fotos.length > 3) && (
                    <div>
                      <label
                        htmlFor="inputFile"
                        className="w-24 h-24 flex flex-col items-center justify-center rounded-[10px] border-dotted border-2 bg-[#F5F7FB] cursor-pointer"
                        onClick={() => setValue("")}
                      >
                        <i className="uil uil-plus text-5xl"></i>
                      </label>
                    </div>
                  )}
                  <input
                    type="file"
                    value={value}
                    className="hidden"
                    accept="image/jpeg"
                    id="inputFile"
                    onChange={(el: any) => {
                      setValue(value);
                      addFile(el);
                    }}
                  />
                </div>
                <div className="w-full flex justify-end">
                  <Button
                    text="Voltar"
                    className="w-24 mr-2 bg-gray-500"
                    handle={() => setEnableForm(false)}
                  />
                  <Button
                    text="Cadastrar"
                    color="secondary"
                    handle={() => register()}
                  />
                </div>
              </section>
            </div>
          )) || (
            <div className={`w-full flex flex-col items-center justify-center ${posts.length ? 'bg-background' : ''}`}>
              <section className={`w-[60%] flex flex-col pt-10 px-10 ${posts.length ? 'bg-gray-200' : ''}`}>
                {posts.length > 0 &&
                  posts.map((animal: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-full min-h-[500px] p-6 rounded-xl bg-white mb-10 flex flex-col justify-between"
                      >
                        {!institution && (
                          <div className="w-full h-8 flex items-center">
                            {(animal.user.foto && (
                              <img
                                src={animal.user.foto || ""}
                                className="w-7 h-7 rounded-full bg-black mr-2"
                              />
                            )) || (
                              <div className="w-7 h-7 rounded-full border-2 border-gray-300 mr-2">
                                <UilPentagon />
                              </div>
                            )}
                            <p>{animal.user.nome}</p>
                          </div>
                        )}
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
                              <h3 className="font-semibold mr-2">
                                Descrição:{" "}
                              </h3>
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
                            animal.fotos?.length > 1
                              ? "grid-cols-2"
                              : "grid-cols-1"
                          } ${
                            animal.fotos?.length > 2
                              ? "grid-rows-2"
                              : "grid-rows-1"
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
                        <div className="w-full flex items-end justify-between mt-4">
                          <div className="relative">
                            {
                              animal.adotado && <div className="p-2 bg-primary rounded-xl text-white">Animal adotado!</div> ||
                              <>
                              <Button
                                text="Interessados"
                                handle={() => getInteresseByAnimal(animal)}
                                className={`w-36 bg-[#53740E]`}
                              />
                              {
                                animal.interesse && animal.interesse.length > 0 && <div className="w-5 h-5 rounded-full bg-red-500 absolute right-0 top-[-10px] flex items-center justify-center">
                                <i className="uil uil-info text-white text-2xl"></i>
                                </div>
                              }
                            </>
                          }
                          </div>
                          <div className="flex">
                            {/* <Button
                              text="Editar"
                              handle={() => {
                                setData({ ...animal });
                                setEnableForm(true);
                              }}
                              className={`w-24 mr-2 bg-secondary`}
                            />
                            <Button
                              text="Remover"
                              handle={() => {}}
                              className={`w-24 bg-[#E74747]`}
                            /> */}
                          </div>
                        </div>
                        {animal.interessados &&
                          animal.interessados.map(
                            (interesse: any, j: number) => {
                              return (
                                <div key={j} className="w-full flex items-center ">
                                  <div
                                    className="w-full px-4 py-2 my-2 flex justify-between items-center bg-gray-300 rounded-xl"
                                  >
                                    <p>{interesse.user.nome}</p>
                                    <p>{interesse.user.contato}</p>
                                    <p>{interesse.user.historico}</p>
                                    <p>{interesse.user.email}</p>
                                  </div>
                                  {
                                    !animal.adotado &&
                                    <Button handle={() => confirmAdocao(animal)} text="Aprovar" color="primary" className="ml-2"/>
                                  }
                                </div>
                              );
                            }
                          )}
                      </div>
                    );
                  })
                    || 
                  <div className="w-full flex flex-col items-center justify-center mb-4 pt-5">
                    <img src={empty} className="w-[60%]"/>
                    <p className="my-4 text-secondary text-2xl">Ainda não hà animais cadastrados no sistema!</p>
                  </div>
                }
              </section>
            </div>
          )}
          {!enableForm && (
            <div
              className="w-full flex items-center justify-center mb-10"
              onClick={() => {
                setData({ ...emptyData, fotos: [] });
                setEnableForm(true);
              }}
            >
              <div className="w-32 p-2 text-white font-bold bg-secondary rounded-xl flex justify-between items-center">
                Adicionar <UilPlus />
              </div>
            </div>
          )}
        </div>
      )}
    </PageTemplate>
  );
}

export default Home;
