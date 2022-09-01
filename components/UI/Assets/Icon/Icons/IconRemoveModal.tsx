import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconRemoveModal({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "74.036"}
      height={!height && "74.036"}
      viewBox="0 0 74.036 74.036"
    >
      <g id="icon-eliminar-modal" transform="translate(-256.092 -298.014)">
        <circle
          id="Elipse_1258"
          data-name="Elipse 1258"
          cx="37.018"
          cy="37.018"
          r="37.018"
          transform="translate(256.092 298.014)"
          fill="none"
        />
        <g id="icon" transform="translate(-829.412 -267.48)">
          <path
            id="Trazado_2454"
            data-name="Trazado 2454"
            d="M1134.081,590.415h-6.075v-1.1A3.309,3.309,0,0,0,1124.7,586h-4.413a3.309,3.309,0,0,0-3.309,3.31v1.1h-6.07a2.755,2.755,0,0,0-2.755,2.756h0v2.209a1.1,1.1,0,0,0,1.1,1.1h26.473a1.1,1.1,0,0,0,1.1-1.1v-2.208A2.756,2.756,0,0,0,1134.081,590.415Zm-14.893-1.1a1.106,1.106,0,0,1,1.1-1.1h4.405a1.106,1.106,0,0,1,1.1,1.1v1.1h-6.619Z"
            fill={color || "#70777c"}
          />
          <path
            id="Trazado_2455"
            data-name="Trazado 2455"
            d="M1110.244,598.689a.345.345,0,0,0-.344.346v.015l.911,19.1a3.3,3.3,0,0,0,3.3,3.152h16.748a3.3,3.3,0,0,0,3.3-3.152l.911-19.1a.345.345,0,0,0-.328-.361h-24.507Zm16.659,2.755a1.1,1.1,0,0,1,2.206-.084q0,.042,0,.084v14.342a1.1,1.1,0,0,1-2.206.084q0-.042,0-.084Zm-5.511,0a1.1,1.1,0,0,1,2.206-.084q0,.042,0,.084v14.342a1.1,1.1,0,1,1-2.206.084q0-.042,0-.084Zm-5.51,0a1.1,1.1,0,0,1,2.206-.084q0,.042,0,.084v14.342a1.1,1.1,0,0,1-2.206.084q0-.042,0-.084Z"
            fill={color || "#70777c"}
          />
        </g>
      </g>
    </svg>
  )
}

export default IconRemoveModal
