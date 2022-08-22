/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconExclamation({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "74.036"}
      height={!height && "74.036"}
      viewBox="0 0 74.036 74.036"
    >
      <g id="icon-alert-modal" transform="translate(-180.118 -302.739)">
        <path
          id="Trazado_5491"
          data-name="Trazado 5491"
          d="M37.018,0A37.018,37.018,0,1,1,0,37.018,37.018,37.018,0,0,1,37.018,0Z"
          transform="translate(180.118 302.739)"
          fill="none"
        />
        <g
          id="Grupo_10940"
          data-name="Grupo 10940"
          transform="translate(-932.468 -263.671)"
        >
          <path
            id="Trazado_5471"
            data-name="Trazado 5471"
            d="M1149.7,614.04a4.09,4.09,0,1,0,4.088,4.092A4.09,4.09,0,0,0,1149.7,614.04Z"
            fill={color || "#70777c"}
          />
          <path
            id="Trazado_5472"
            data-name="Trazado 5472"
            d="M1149.7,585.4c-2.348,0-4.124,1.225-4.124,3.2V606.75c0,1.986,1.776,3.2,4.124,3.2,2.29,0,4.123-1.271,4.123-3.2V588.6C1153.822,586.67,1151.989,585.4,1149.7,585.4Z"
            fill={color || "#70777c"}
          />
        </g>
      </g>
    </svg>
  )
}

export default IconExclamation
