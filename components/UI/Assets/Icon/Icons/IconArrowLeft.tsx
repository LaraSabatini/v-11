import IconInterface from "interfaces/components/IconInterface"
import * as React from "react"

function IconArrowLeft({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "8.38px"}
      height={height || "14.261px"}
      viewBox="0 0 8.38 14.261"
    >
      <g id="arrow-left" transform="translate(579.581 248.61) rotate(180)">
        <path
          id="Trazado_868"
          data-name="Trazado 868"
          d="M1562.122,650.117a1.213,1.213,0,0,0,0,1.707l5.984,5.963a1.207,1.207,0,0,0,1.664.037l5.9-5.876a1.205,1.205,0,0,0-1.678-1.73l-.023.023-5.065,4.99-5.071-5.123a1.205,1.205,0,0,0-1.7.008Z"
          transform="translate(-78.557 1810.381) rotate(-90)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconArrowLeft
