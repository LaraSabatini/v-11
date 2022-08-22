/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconEdit({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "18.404"}
      height={!height && "18.306"}
      viewBox="0 0 18.404 18.306"
    >
      <g id="icon-editar" transform="translate(-1321.56 -733.756)">
        <path
          id="Trazado_5489"
          data-name="Trazado 5489"
          d="M1339.56,736.072l-1.8-1.8a1.783,1.783,0,0,0-2.517,0l-1.377,1.377h0l-10.19,10.192,4.024,4.027,9.849-9.849h0l2.007-2.006A1.374,1.374,0,0,0,1339.56,736.072Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5490"
          data-name="Trazado 5490"
          d="M1321.571,751.5a.459.459,0,0,0,.555.545l4.488-1.088-4.026-4.026Z"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconEdit
