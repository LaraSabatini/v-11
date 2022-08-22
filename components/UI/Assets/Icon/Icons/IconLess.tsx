/* eslint-disable prettier/prettier */
import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconLess({ width, height, color }: IconInterface) {
  return (
    <svg
      id="IconLess"
      xmlns="http://www.w3.org/2000/svg"
      width="21.271"
      height="3.158"
      viewBox="0 0 21.271 3.158"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectángulo_4358"
            data-name="Rectángulo 4358"
            width={!width && "21.271"}
            height={!height && "3.158"}
            fill="#70777c"
          />
        </clipPath>
      </defs>
      <g id="Grupo_11188" data-name="Grupo 11188">
        <path
          id="Trazado_5664"
          data-name="Trazado 5664"
          d="M19.692,0H1.578a1.579,1.579,0,0,0,0,3.158H19.692a1.579,1.579,0,1,0,0-3.158"
          transform="translate(0 0)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconLess
