/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconAlertTabs({ width, height, color }: IconInterface) {
  return (
    <svg
      id="IconAlertTabs"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "30"}
      height={!height && "30"}
      viewBox="0 0 30 30"
    >
      <path
        id="Trazado_5665"
        data-name="Trazado 5665"
        d="M15,5c-1.275,0-2.24.665-2.24,1.74V16.6c0,1.076.965,1.739,2.24,1.739,1.244,0,2.24-.691,2.24-1.739V6.74c0-1.049-1-1.74-2.24-1.74m0,15.557a2.222,2.222,0,1,0,2.221,2.223A2.222,2.222,0,0,0,15,20.557"
        fill={color || "#70777c"}
      />
      <rect
        id="Rectángulo_4359"
        data-name="Rectángulo 4359"
        width="30"
        height="30"
        fill="none"
      />
    </svg>
  )
}

export default IconAlertTabs
