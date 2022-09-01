/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconArrowOptions({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "14.239"}
      height={!height && "8.327"}
      viewBox="0 0 14.239 8.327"
    >
      <g id="icon-arrow-opciones" transform="translate(-146.349 -167.165)">
        <path
          id="Trazado_5497"
          data-name="Trazado 5497"
          d="M1870.014,658.045l-5.907,5.907a1.209,1.209,0,0,1-1.711,0l-5.907-5.907a1.209,1.209,0,0,1,.855-2.065h11.815A1.209,1.209,0,0,1,1870.014,658.045Z"
          transform="translate(-1709.783 -488.815)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}
export default IconArrowOptions
