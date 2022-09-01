/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconPlus({ width, height, color }: IconInterface) {
  return (
    <svg
      id="icon-mas"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "21.272"}
      height={!height && "21.271"}
      viewBox="0 0 21.272 21.271"
    >
      <path
        id="Trazado_5375"
        data-name="Trazado 5375"
        d="M1363.929,700.04a1.579,1.579,0,0,0-1.579-1.579h-7.478v-7.477a1.579,1.579,0,0,0-3.158,0v7.477h-7.478a1.579,1.579,0,0,0,0,3.158h7.478V709.1a1.579,1.579,0,1,0,3.158,0v-7.478h7.478A1.578,1.578,0,0,0,1363.929,700.04Z"
        transform="translate(-1342.657 -689.405)"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconPlus
