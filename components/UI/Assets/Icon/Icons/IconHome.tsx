/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconHome({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "27.715"}
      height={!height && "30.461"}
      viewBox="0 0 27.715 30.461"
    >
      <g id="icon-home" transform="translate(0)">
        <g id="Grupo_10883" data-name="Grupo 10883">
          <path
            id="Trazado_5387"
            data-name="Trazado 5387"
            d="M1269.986,657.1h8.274a1.5,1.5,0,0,1,1.5,1.5V670.89h6.306a1.92,1.92,0,0,0,1.915-1.915V651.43a1,1,0,0,0-.386-.789l-12.859-10a1,1,0,0,0-1.228,0l-12.856,10a1,1,0,0,0-.386.79v17.547a1.913,1.913,0,0,0,1.913,1.913h6.308V658.6A1.5,1.5,0,0,1,1269.986,657.1Z"
            transform="translate(-1260.265 -640.429)"
            fill={color || "#70777c"}
          />
          <path
            id="Trazado_5388"
            data-name="Trazado 5388"
            d="M1275.759,660.1h-3.273a1,1,0,0,0-1,1v9.788h5.273V661.1A1,1,0,0,0,1275.759,660.1Z"
            transform="translate(-1260.265 -640.429)"
            fill={color || "#70777c"}
          />
        </g>
      </g>
    </svg>
  )
}

export default IconHome
