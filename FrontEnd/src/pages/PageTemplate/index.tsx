import React from "react";
import Menu from "../../components/Menu"
interface PageTemplateProps {
  disableMenu?: boolean;
  children: JSX.Element;
}
export default function PageTemplate(props: PageTemplateProps) {
  return(
    <div className="w-screen h-screen bg-background flex flex-col">
      {
        !props.disableMenu && 
        <Menu />
      }
      {props.children}
    </div>
  )
}