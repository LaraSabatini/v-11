/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconFullArrow({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "19.769"}
      height={!height && "15.55"}
      viewBox="0 0 19.769 15.55"
    >
      <g id="icon-arrow" transform="translate(1362.054 686.256) rotate(180)">
        <path
          id="Trazado_2659"
          data-name="Trazado 2659"
          d="M1754.131,628.46l-6.214-6.214a1.611,1.611,0,0,0-2.277,2.278l3.425,3.425h-12.62a1.611,1.611,0,0,0,0,3.222h12.7l-3.424,3.424a1.611,1.611,0,0,0,2.278,2.278l6.135-6.135a1.613,1.613,0,0,0,0-2.277Z"
          transform="translate(-392.548 48.911)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconFullArrow
