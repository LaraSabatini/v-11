/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconMenuOpen({ width, height, color }: IconInterface) {
  return (
    <svg
      id="menu-open"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "17.774"}
      height={!height && "12.558"}
      viewBox="0 0 17.774 12.558"
    >
      <path
        id="Trazado_5471"
        data-name="Trazado 5471"
        d="M1700.377,586.934h-15.366a1.2,1.2,0,0,1,0-2.408h15.366a1.2,1.2,0,1,1,0,2.408Z"
        transform="translate(-1683.807 -584.526)"
        fill={color || "#70777c"}
      />
      <path
        id="Trazado_5472"
        data-name="Trazado 5472"
        d="M1700.377,593.866h-15.366a1.2,1.2,0,0,1,0-2.409h15.366a1.2,1.2,0,0,1,0,2.409Z"
        transform="translate(-1683.807 -586.463)"
        fill={color || "#70777c"}
      />
      <path
        id="Trazado_5473"
        data-name="Trazado 5473"
        d="M1700.377,601.018h-15.366a1.2,1.2,0,0,1,0-2.408h15.366a1.2,1.2,0,1,1,0,2.408Z"
        transform="translate(-1683.807 -588.46)"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconMenuOpen
