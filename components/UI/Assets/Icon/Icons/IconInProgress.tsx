import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconInProgress({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "26"}
      height={!height && "26"}
      viewBox="0 0 26 26"
    >
      <g id="Icon" transform="translate(-0.061)">
        <path
          id="Trazado_6061"
          data-name="Trazado 6061"
          d="M13,0h0A13,13,0,1,0,26,13,13,13,0,0,0,13,0Zm7.679,20.688a10.8,10.8,0,0,1-7.686,3.183h-.005a10.875,10.875,0,0,1-.023-21.75H13a10.874,10.874,0,0,1,7.683,18.567"
          transform="translate(0.061)"
          fill={color || "#0033a1"}
        />
        <path
          id="Trazado_6059"
          data-name="Trazado 6059"
          d="M21.031,12.187,17.11,8.266a1.171,1.171,0,0,0-1.667,1.645l.011.011,3.921,3.921"
          transform="translate(0.061)"
          fill={color || "#0033a1"}
        />
        <path
          id="Trazado_6064"
          data-name="Trazado 6064"
          d="M14.639,14.163h5.544a1.167,1.167,0,0,0,1.169-1.167v0a1.169,1.169,0,0,0-1.167-1.17H14.637l-2.34,0h-.641a1.171,1.171,0,0,0-.016,2.342h3Z"
          transform="translate(0.061)"
          fill={color || "#0033a1"}
        />
        <path
          id="Trazado_6060"
          data-name="Trazado 6060"
          d="M19.345,12.157l-3.921,3.921-.011.011a1.171,1.171,0,1,0,1.667,1.645L21,13.813"
          transform="translate(0.061)"
          fill={color || "#0033a1"}
        />
        <path
          id="Trazado_6062"
          data-name="Trazado 6062"
          d="M11.891,14.163h-.06A1.168,1.168,0,0,0,13,12.995v0a1.169,1.169,0,0,0-1.168-1.17h.057l-2.34,0H8.908a1.171,1.171,0,1,0-.016,2.342h3Z"
          transform="translate(0.061)"
          fill={color || "#0033a1"}
          opacity="0.6"
        />
        <path
          id="Trazado_6063"
          data-name="Trazado 6063"
          d="M9.064,14.163H9a1.168,1.168,0,0,0,1.169-1.167v0a1.169,1.169,0,0,0-1.168-1.17h.057l-2.34,0H6.081a1.171,1.171,0,1,0-.016,2.342h3Z"
          transform="translate(0.061)"
          fill={color || "#0033a1"}
          opacity="0.4"
        />
      </g>
    </svg>
  )
}

export default IconInProgress
