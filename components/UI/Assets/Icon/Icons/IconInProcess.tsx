import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconInProcess({ width, height, color }: IconInterface) {
  return (
    <svg
      id="Icon"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "26"}
      height={!height && "26"}
      viewBox="0 0 26 26"
    >
      <path
        id="Trazado_6055"
        data-name="Trazado 6055"
        d="M13,0h0A13,13,0,1,0,26,13,13,13,0,0,0,13,0Zm7.679,20.688a10.8,10.8,0,0,1-7.686,3.183h-.005a10.875,10.875,0,0,1-.023-21.75H13a10.874,10.874,0,0,1,7.683,18.567"
        fill={color || "#b2b9e2"}
      />
      <path
        id="Trazado_6052"
        data-name="Trazado 6052"
        d="M7.529,11.829A1.171,1.171,0,1,0,8.7,13a1.171,1.171,0,0,0-1.171-1.172Z"
        fill={color || "#b2b9e2"}
        opacity="0.4"
      />
      <path
        id="Trazado_6053"
        data-name="Trazado 6053"
        d="M12.985,11.829A1.171,1.171,0,1,0,14.156,13a1.171,1.171,0,0,0-1.171-1.172Z"
        fill={color || "#b2b9e2"}
        opacity="0.6"
      />
      <path
        id="Trazado_6054"
        data-name="Trazado 6054"
        d="M18.441,11.829A1.171,1.171,0,1,0,19.612,13a1.171,1.171,0,0,0-1.171-1.172Z"
        fill={color || "#b2b9e2"}
      />
    </svg>
  )
}

export default IconInProcess
