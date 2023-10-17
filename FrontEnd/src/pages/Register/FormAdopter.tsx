import React from "react";
import { DataProps } from ".";
import Label from "../../components/Label";

type FormAdopterProps = {
  data: DataProps;
  setData: Function
}

export default function FormAdopter(props: FormAdopterProps) {
  function updateData() {
    props.setData({ ...props.data });
  }
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[108%]">
        <div className="border-b-[2px] pb-1 mb-2 border-secondary pr-3 w-64">
          <h2 className="text-2xl">Cadastro Adotante</h2>
        </div>
      </div>
      <section className="h-full w-full overflow-auto scroll-red-300">
        <div className="w-full flex justify-between">
          <Label name='Nome' width="w-[48%]" required>
            <input type="text" value={props.data.nome} onChange={(e) => {
              props.data.nome = e.target.value
              updateData()
            }} />
          </Label>
          <Label name='Endereço' width="w-[48%]">
            <input type="text" value={props.data.endereco} onChange={(e) => {
              props.data.endereco = e.target.value
              updateData()
            }} />
          </Label>
        </div>

        <Label name='Histórico com Animais' width="w-full">
          <textarea value={props.data.historico} className="resize-none h-16"  onChange={(e) => {
            props.data.historico = e.target.value
            updateData()
          }} />
        </Label>
        <Label name='Contato' width="w-[48%]" required>
          <input type="text" value={props.data.contato} onChange={(e) => {
            props.data.contato = e.target.value
            updateData()
          }} />
        </Label>
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