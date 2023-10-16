import React from "react";

type ButtonProps = {
  text: string;
  color?: string;
  className?: string;
  bg?: string;
  handle?: Function;
  disable?: boolean;
};

export default function Button(props: ButtonProps) {
  async function handle(handle: any) {
    await handle();
  }
  return (
    <button
      className={`
      w-40 h-10 text-lg font-semibold rounded-xl outline-none text-center text-white
      ${props.disable ? "cursor-default" : "cursor-pointer"}
      ${props.color ? "bg-" + props.color : ""}
      ${props.className}
      `}
      onClick={
        props.disable ? () => {} : props.handle ? () => handle(props.handle) : () => {}
      }
    >
      {props.text}
    </button>
  );
}
