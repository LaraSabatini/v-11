/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconSeeMore({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "20.463"}
      height={!height && "4.468"}
      viewBox="0 0 20.463 4.468"
    >
      <g id="IconSeeMore" transform="translate(0)">
        <path
          id="Trazado_5368"
          data-name="Trazado 5368"
          d="M1343.4,680.715a2.234,2.234,0,1,1,2.234-2.234A2.236,2.236,0,0,1,1343.4,680.715Z"
          transform="translate(-1341.17 -676.247)"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5369"
          data-name="Trazado 5369"
          d="M1351.276,680.715a2.234,2.234,0,1,1,2.234-2.234A2.237,2.237,0,0,1,1351.276,680.715Z"
          transform="translate(-1341.17 -676.247)"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5370"
          data-name="Trazado 5370"
          d="M1359.4,680.715a2.234,2.234,0,1,1,2.235-2.234A2.237,2.237,0,0,1,1359.4,680.715Z"
          transform="translate(-1341.17 -676.247)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconSeeMore
