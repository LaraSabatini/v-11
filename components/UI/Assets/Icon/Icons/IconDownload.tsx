/* eslint-disable prettier/prettier */
import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconDownload({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "14.536"}
      height={!height && "20.285"}
      viewBox="0 0 14.536 20.285"
    >
      <g id="IconDownload" transform="translate(0 0)">
        <path
          id="Trazado_5721"
          data-name="Trazado 5721"
          d="M13.336,20.285H1.2a1.2,1.2,0,1,1,0-2.4H13.336a1.2,1.2,0,1,1,0,2.4"
          transform="translate(0 0)"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5722"
          data-name="Trazado 5722"
          d="M8.1,14.432l4.648-4.648a1.2,1.2,0,0,0-1.7-1.7L8.48,10.643V1.205a1.2,1.2,0,1,0-2.41,0v9.5L3.509,8.14a1.2,1.2,0,1,0-1.7,1.7l4.589,4.589a1.2,1.2,0,0,0,1.7,0Z"
          transform="translate(0 0)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconDownload
