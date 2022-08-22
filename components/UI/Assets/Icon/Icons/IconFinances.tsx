/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconFinances({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "30"}
      height={!height && "29.999"}
      viewBox="0 0 30 29.999"
    >
      <g id="IconFinances" transform="translate(0.001 -34.775)">
        <path
          id="Trazado_5945"
          data-name="Trazado 5945"
          d="M30,15A15,15,0,1,1,15,0,15,15,0,0,1,30,15M16.283,22.948c3.292-.514,4.991-2.571,4.991-4.861,0-2.5-1.389-3.885-4.733-4.887-2.342-.72-3.421-1.286-3.421-2.109,0-.665.514-1.415,2.315-1.415a9.563,9.563,0,0,1,4.193.978l.823-3.037a10.921,10.921,0,0,0-4.117-.9V4.479H13.686v2.4C10.655,7.363,8.9,9.19,8.9,11.583c0,2.647,2.161,3.957,5.17,4.781,2.11.566,2.985,1.131,2.985,2.083,0,1.055-1.133,1.569-2.676,1.569a10.52,10.52,0,0,1-4.81-1.26L8.724,21.87a11.35,11.35,0,0,0,4.914,1.26v2.391h2.649V22.947"
          transform="translate(0 34.775)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconFinances
