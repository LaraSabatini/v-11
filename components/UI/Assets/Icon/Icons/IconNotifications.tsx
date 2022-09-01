/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconNotifications({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "19.01"}
      height={!height && "22.002"}
      viewBox="0 0 19.01 22.002"
    >
      <g id="IconNotifications" transform="translate(0.291 0.338)">
        <path
          id="Trazado_6068"
          data-name="Trazado 6068"
          d="M11.591,27.49a2.263,2.263,0,0,1-1.712-.664.877.877,0,0,1,.631-1.488h2.17a.876.876,0,0,1,.631,1.488,2.263,2.263,0,0,1-1.712.664"
          transform="translate(-2.378 -5.828)"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_6069"
          data-name="Trazado 6069"
          d="M16.92,14.775a.876.876,0,0,1-.288-.649V9.143A7.109,7.109,0,0,0,15.239,4.78a6.612,6.612,0,0,0-3.953-2.435V1.616A1.706,1.706,0,0,0,9.5,0,1.707,1.707,0,0,0,7.722,1.62v.732A6.619,6.619,0,0,0,3.776,4.78a7.107,7.107,0,0,0-1.4,4.365v4.984a.877.877,0,0,1-.287.649L.48,16.233a1.459,1.459,0,0,0,.981,2.541H17.547a1.461,1.461,0,0,0,1.463-1.459v-.009a1.458,1.458,0,0,0-.481-1.082Z"
          transform="translate(-0.291 -0.338)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconNotifications
