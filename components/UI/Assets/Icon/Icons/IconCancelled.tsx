import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconCancelled({ width, height, color }: IconInterface) {
  return (
    <svg
      id="Icon"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "26"}
      height={!height && "26"}
      viewBox="0 0 26 26"
    >
      <path
        id="Trazado_6066"
        data-name="Trazado 6066"
        d="M13,0h0A13,13,0,1,0,26,13,13,13,0,0,0,13,0Zm7.679,20.688a10.8,10.8,0,0,1-7.686,3.183h-.005a10.875,10.875,0,0,1-.023-21.75H13a10.874,10.874,0,0,1,7.683,18.567"
        fill={color || "#70777c"}
      />
      <path
        id="Trazado_6067"
        data-name="Trazado 6067"
        d="M19.553,14.17h-.524a1.171,1.171,0,0,0,0-2.341h.525l-2.34,0H6.971a1.171,1.171,0,0,0,0,2.342l10.241,0Z"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconCancelled
