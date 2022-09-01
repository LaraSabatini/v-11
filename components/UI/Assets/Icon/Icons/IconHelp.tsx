/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconHelp({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "25.499"}
      height={!height && "25.498"}
      viewBox="0 0 25.499 25.498"
    >
      <g id="icon-help" transform="translate(-1061.011 -650.261)">
        <path
          id="Trazado_5495"
          data-name="Trazado 5495"
          d="M1073.764,650.261h0a12.749,12.749,0,1,0,12.75,12.749A12.664,12.664,0,0,0,1073.76,650.261Zm7.531,20.289a10.6,10.6,0,0,1-7.538,3.121h-.005a10.665,10.665,0,0,1-.023-21.33h.031a10.665,10.665,0,0,1,7.535,18.209Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5496"
          data-name="Trazado 5496"
          d="M1073.315,655.3a4.13,4.13,0,0,0-4.083,4.167,1.162,1.162,0,1,0,2.324,0,1.759,1.759,0,1,1,3.517,0,2.476,2.476,0,0,1-1.274,1.677,2.9,2.9,0,0,0-1.646,2.625v.383a1.162,1.162,0,1,0,2.323,0v-.383a.523.523,0,0,1,.3-.471,4.735,4.735,0,0,0,2.624-3.831A4.129,4.129,0,0,0,1073.315,655.3Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5497"
          data-name="Trazado 5497"
          d="M1073.315,666.837a1.612,1.612,0,1,0,1.611,1.613A1.612,1.612,0,0,0,1073.315,666.837Z"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconHelp
