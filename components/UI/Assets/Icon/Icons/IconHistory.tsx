import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconHistory({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "20.833"}
      height={!height && "20.833"}
    >
      <g
        fill={color || "#70777c"}
        stroke={color || "#70777c"}
        strokeWidth={0.5}
      >
        <path
          data-name="Trazado 837"
          d="m14.033 12.2-2.826-2.119V5.764a.785.785 0 1 0-1.57 0v4.709a.783.783 0 0 0 .314.628l3.139 2.355a.785.785 0 0 0 .942-1.256Z"
        />
        <path
          data-name="Trazado 838"
          d="M10.417.25a10.167 10.167 0 1 0 10.166 10.167A10.178 10.178 0 0 0 10.417.25Zm0 18.758a8.592 8.592 0 1 1 8.592-8.592 8.6 8.6 0 0 1-8.592 8.592Z"
        />
      </g>
    </svg>
  )
}

export default IconHistory
