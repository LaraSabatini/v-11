/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconOk({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "25.9"}
      height={!height && "25.9"}
      viewBox="0 0 25.9 25.9"
    >
      <g id="icon-ok" transform="translate(-1129.914 -649.859)">
        <path
          id="Trazado_5500"
          data-name="Trazado 5500"
          d="M1142.867,649.859h0a12.95,12.95,0,1,0,12.95,12.95A12.965,12.965,0,0,0,1142.864,649.859Zm7.65,20.609a10.763,10.763,0,0,1-7.657,3.17h0a10.833,10.833,0,0,1-.023-21.666h.031a10.833,10.833,0,0,1,7.653,18.5Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5501"
          data-name="Trazado 5501"
          d="M1148.42,657.7l-7.7,7.7-3.039-3.039a1.189,1.189,0,0,0-1.682,1.681l3.88,3.881a1.19,1.19,0,0,0,1.682,0l8.538-8.537a1.189,1.189,0,0,0-1.682-1.682Z"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconOk
