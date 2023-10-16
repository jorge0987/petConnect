import React, { ReactNode } from "react";
type LabelProps = {
  name: String;
  width?: string;
  required?: boolean;
  children: JSX.Element;
}
export default function Label(props: LabelProps) {
  return(
    <div className={`flex flex-col align-baseline ${props.width}`}>
      <label className="flex text-xl font-semibold">{props.name}
        {
          props.required &&
          <p className="ml-2 text-red-500">*</p>
        }
      </label>
      {props.children}
    </div>
  )
}