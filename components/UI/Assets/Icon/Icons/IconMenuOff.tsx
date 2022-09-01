/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconMenuOff({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "13.273"}
      height={!height && "13.273"}
      viewBox="0 0 13.273 13.273"
    >
      <g id="menu-off" transform="translate(-1711.484 -555.74)">
        <path
          id="Trazado_5473"
          data-name="Trazado 5473"
          d="M1722.7,568.66l-10.865-10.866a1.2,1.2,0,1,1,1.7-1.7l10.865,10.865a1.2,1.2,0,1,1-1.7,1.7Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5473-2"
          data-name="Trazado 5473"
          d="M1711.837,566.957l10.865-10.865a1.2,1.2,0,0,1,1.7,1.7L1713.54,568.66a1.2,1.2,0,0,1-1.7-1.7Z"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconMenuOff
