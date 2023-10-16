import { useEffect, useState } from "react"
import { UilCamera  } from '@iconscout/react-unicons'
import React from "react";
type avatarProps = {
  img: string,
  setImg: Function,
  disabled?: boolean,
}

export default function Avatar({img, setImg, disabled}:avatarProps) {
  const [disabledImage, setDisabledImage] = useState<Boolean>(false)
  function addFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    let blob: any
    reader.onload = function(event: any) {
      blob = new Blob([event.target.result], { type: file.type });
      const readerBase64 = new FileReader();
      readerBase64.onloadend = function() {
        setImg(readerBase64.result)
        
      };
      readerBase64.readAsDataURL(blob);
    };
    
    reader.readAsArrayBuffer(file);
  }

  return (
    <section className={`w-[160px] border-2 border-gray-1 ${disabledImage && img ? 'h-[150px]': 'h-[204px]'}
        flex flex-col items-center justify-between
        border-[1px] rounded-xl`}>
      <div className={`h-[154px] w-[144px] m-[8px] flex items-center justify-center`} >
        {
          !img &&
          <UilCamera className="w-full my-auto h-10"/>
        }

        {
          img && 
          <img src={img} alt="Imagem da pessoa física" className="h-[150px] w-[144px] rounded-xl object-cover"/>
        }

        <input
          accept="image/jpeg"
          type="file"
          id="select-image"
          className="hidden"
          onChange={(event: React.FormEvent<HTMLInputElement>) => addFile(event)}
        />
      </div>
      {
        !disabledImage &&
        <label htmlFor="select-image" className="w-full h-[36px] leading-9 text-center cursor-pointer border-t-[1px] border-gray-border-100">
          Selecionar Foto
        </label>
      }
    </section>
  )
}