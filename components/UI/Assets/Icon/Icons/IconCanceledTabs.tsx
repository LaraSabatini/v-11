/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconCanceledTabs({ width, height, color }: IconInterface) {
  return (
    <svg
      id="IconCloseTabs"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "30"}
      height={!height && "30"}
      viewBox="0 0 30 30"
    >
      <path
        id="Trazado_5667"
        data-name="Trazado 5667"
        d="M9,22.75a1.75,1.75,0,0,1-1.237-2.987l12-12a1.749,1.749,0,0,1,2.474,2.474l-12,12A1.741,1.741,0,0,1,9,22.75"
        fill={color || "#70777c"}
      />
      <path
        id="Trazado_5668"
        data-name="Trazado 5668"
        d="M21,22.75a1.741,1.741,0,0,1-1.237-.513l-12-12a1.749,1.749,0,0,1,2.474-2.474l12,12A1.75,1.75,0,0,1,21,22.75"
        fill={color || "#70777c"}
      />
      <rect
        id="Rectángulo_4361"
        data-name="Rectángulo 4361"
        width="30"
        height="30"
        fill="none"
      />
    </svg>
  )
}

export default IconCanceledTabs
