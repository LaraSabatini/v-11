import IconInterface from "interfaces/components/IconInterface"
import * as React from "react"

function IconArrowRight({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "8.38px"}
      height={height || "14.261px"}
      viewBox="0 0 8.38 14.261"
    >
      <path
        data-name="Trazado 868"
        d="M.358 13.91a1.213 1.213 0 0 0 1.707 0l5.963-5.984a1.207 1.207 0 0 0 .037-1.664L2.189.362A1.205 1.205 0 0 0 .459 2.04l.023.023 4.99 5.065-5.123 5.071a1.205 1.205 0 0 0 .008 1.7Z"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconArrowRight
