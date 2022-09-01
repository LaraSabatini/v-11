/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconRemove({ width, height, color }: IconInterface) {
  return (
    <svg
      id="icon-eliminar"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "17.697"}
      height={!height && "21.781"}
      viewBox="0 0 17.697 21.781"
    >
      <path
        id="Trazado_2454"
        data-name="Trazado 2454"
        d="M64,2.723H60.252V2.042A2.042,2.042,0,0,0,58.21,0H55.487a2.042,2.042,0,0,0-2.042,2.042v.681H49.7a1.7,1.7,0,0,0-1.7,1.7V5.786a.681.681,0,0,0,.681.681H65.016a.681.681,0,0,0,.681-.681V4.424A1.7,1.7,0,0,0,64,2.723Zm-9.189-.681a.682.682,0,0,1,.681-.681H58.21a.682.682,0,0,1,.681.681v.681H54.807Z"
        transform="translate(-48)"
        fill={color || "#70777c"}
      />
      <path
        id="Trazado_2455"
        data-name="Trazado 2455"
        d="M73.577,184a.213.213,0,0,0-.212.223l.562,11.786a2.039,2.039,0,0,0,2.039,1.945H86.3a2.039,2.039,0,0,0,2.039-1.945l.562-11.786a.213.213,0,0,0-.212-.223Zm10.279,1.7a.681.681,0,1,1,1.361,0v8.849a.681.681,0,1,1-1.361,0Zm-3.4,0a.681.681,0,1,1,1.361,0v8.849a.681.681,0,1,1-1.361,0Zm-3.4,0a.681.681,0,1,1,1.361,0v8.849a.681.681,0,1,1-1.361,0Z"
        transform="translate(-72.285 -176.172)"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconRemove
