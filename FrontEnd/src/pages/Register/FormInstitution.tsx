
import React from "react";
import { DataProps } from ".";
import Label from "../../components/Label";
import Avatar from "../../components/Avatar";

type FormAdopterProps = {
  data: DataProps;
  setData: Function
}

export default function FormInstituicao(props: FormAdopterProps) {
  function updateData() {
    props.setData({ ...props.data });
  }

  function setImg(img: string) {
    props.setData({ ...props.data, foto: img });
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[108%]">
        <div className="border-b-[2px] pb-1 mb-2 border-secondary pr-3 w-64">
          <h2 className="text-2xl">Cadastro Instituição</h2>
        </div>
      </div>
      <section className="h-full w-full overflow-auto">
        <div className="flex justify-between">

          <div className="w-[200px]">
            <Avatar img={props.data.foto || ''} setImg={setImg} disabled />
          </div>
          <div className="w-[80%] flex flex-col justify-between">
            <Label name='Nome' width="w-full" required>
              <input type="text" value={props.data.nome} onChange={(e) => {
                props.data.nome = e.target.value
                updateData()
              }} />
            </Label>
            <Label name='CNPJ' width="w-full" required>
              <input type="text" value={props.data.cnpj} onChange={(e) => {
                props.data.cnpj = e.target.value
                updateData()
              }} />
            </Label>
            <Label name='Contato' width="w-full" required>
              <input type="text" value={props.data.contato} onChange={(e) => {
                props.data.contato = e.target.value
                updateData()
              }} />
            </Label>
          </div>
        </div>
        <Label name='E-mail' width="w-[48%]" required>
          <input type="e-mail" value={props.data.email} onChange={(e) => {
            props.data.email = e.target.value
            updateData()
          }} />
        </Label>
        <Label name='Senha' width="w-[48%]" required>
          <input type="password" value={props.data.senha} onChange={(e) => {
            props.data.senha = e.target.value
            updateData()
          }} />
        </Label>
      </section>
    </div>
  )
}