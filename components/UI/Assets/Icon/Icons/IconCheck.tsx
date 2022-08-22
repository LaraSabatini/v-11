import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconCheck({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "14.796"}
      height={!height && "10.916"}
      viewBox="0 0 14.796 10.916"
    >
      <g id="IconCheckWhiteSmall" transform="translate(-976.499 -508.542)">
        <path
          id="Trazado_5516"
          data-name="Trazado 5516"
          d="M1377.794,666.562a1.189,1.189,0,0,0,1.681,0l8.538-8.537a1.189,1.189,0,0,0-1.682-1.682l-7.7,7.7L1375.595,661a1.189,1.189,0,0,0-1.681,1.681Z"
          transform="translate(-397.066 -147.452)"
          fill={color || "#ffffff"}
        />
      </g>
    </svg>
  )
}

export default IconCheck
