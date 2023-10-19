import { useState } from "react";
import PageTemplate from "../PageTemplate";
import register from "../../assets/register.svg";
import dog from "../../assets/dog.svg";
import institution from "../../assets/institution.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import FormAdopter from "./FormAdopter";
import { api } from "../../api";
import FormInstituicao from "./FormInstitution";
import React from "react";
import { message } from "antd";

export type DataProps = {
  nome: string;
  tipo_usuario?: string;
  endereco?: string;
  historico?: string;
  contato?: string;
  email: string;
  senha: string;
  cnpj?: string;
  foto?: string;
};

const emptyData = {
  nome: "",
  tipo_usuario: "",
  endereco: "",
  historico: "",
  cnpj: "",
  contato: "",
  email: "",
  senha: "",
  foto: ""
};

export default function Register() {
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [data, setData] = useState<DataProps>(emptyData);
  const navigate = useNavigate();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  function closeForm() {
    setActiveForm(false);
    setData({ ...emptyData });
  }

  async function validate() {
    if (selectedOption === "option1") {
      if (!data.nome || !data.email || !data.senha || !data.contato) {
        message.warning({
          content: 'Preencha os dados obrigatórios!',
        });
        return;
      }
    } else if (!data.nome || !data.cnpj || !data.contato || (!data.email && !data.senha)) {
      message.warning({
        content: 'Preencha os dados obrigatórios!',
      });
      return;
    }

    const dataCopy = { ...data };
    if (selectedOption === "option1") dataCopy.tipo_usuario = "1";
    else {
      dataCopy.tipo_usuario = "2";
    }
    if (!dataCopy.cnpj) delete dataCopy.cnpj;
    if (!dataCopy.contato) delete dataCopy.contato;
    if (!dataCopy.endereco) delete dataCopy.endereco;
    if (!dataCopy.historico) delete dataCopy.historico;
    
    let res = await api.create({ body: dataCopy });
    
    if (res.statusCode) {
      message.error({
        content: 'Falha no cadastro',
        style: {
          color: 'red'
        }
      });
    } else {
      setData({ ...emptyData });
      message.success({
        content: 'Cadastro realizado com sucesso!',
      });
      navigate("/login");
    }
  }
  return (
    <PageTemplate disableMenu>
      <div className="w-full h-full px-32 flex items-center flex-col overflow-hidden">
        <div className="w-full h-[85%] p-[4%] relative">
          {(!activeForm && (
            <section className="w-96">
              <div className="border-b-[2px] pb-1 mb-10 border-secondary pr-3">
                <h2 className="text-2xl">Qual cadastro deseja realizar?</h2>
              </div>
              <label className="flex items-center w-28 cursor-pointer">
                <input
                  type="radio"
                  value="option1"
                  className="w-6 mr-2"
                  checked={selectedOption === "option1"}
                  onChange={handleOptionChange}
                />
                Adotante
              </label>

              <label className="flex items-center w-28 cursor-pointer">
                <input
                  type="radio"
                  value="option2"
                  className="w-6 mr-2"
                  checked={selectedOption === "option2"}
                  onChange={handleOptionChange}
                />
                Instituição
              </label>
            </section>
          )) ||
            (selectedOption === "option1" && (
              <FormAdopter data={data} setData={setData} />
            )) || <FormInstituicao data={data} setData={setData} />}
          <img
            src={
              !activeForm
                ? register
                : selectedOption === "option1"
                ? dog
                : institution
            }
            alt=""
            className={`absolute bottom-0 right-0 ${activeForm && selectedOption === 'option2' ? 'w-[25%]' : 'w-[30%]'}`}
          />
        </div>
        <div className="w-full flex items-end pt-1 justify-end border-t-2 border-secondary">
          <Button
            text="Voltar"
            className="mr-2 bg-gray-400"
            handle={activeForm ? closeForm : () => navigate("/login")}
          />
          <Button
            text={!activeForm ? "Avançar" : "Concluir"}
            color="primary"
            handle={!activeForm ? () => setActiveForm(true) : validate}
          />
        </div>
      </div>
    </PageTemplate>
  );
}
