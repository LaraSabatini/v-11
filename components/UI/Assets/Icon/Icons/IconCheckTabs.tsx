/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconCheckTabs({ width, height, color }: IconInterface) {
  return (
    <svg
      id="IconCheckTabs"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "30"}
      height={!height && "30"}
      viewBox="0 0 30 30"
    >
      <path
        id="Trazado_5666"
        data-name="Trazado 5666"
        d="M12,22.5a1.992,1.992,0,0,1-1.414-.586l-5-5a2,2,0,0,1,2.828-2.828L12,17.671l9.586-9.585a2,2,0,1,1,2.828,2.828l-11,11A1.992,1.992,0,0,1,12,22.5"
        fill={color || "#70777c"}
      />
      <rect
        id="Rectángulo_4360"
        data-name="Rectángulo 4360"
        width="30"
        height="30"
        fill="none"
      />
    </svg>
  )
}

export default IconCheckTabs
