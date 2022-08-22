/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconBeneficiary({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "27.212"}
      height={!height && "33.81"}
      viewBox="0 0 27.212 33.81"
    >
      <g id="icon-beneficiarios" transform="translate(0)">
        <path
          id="Trazado_5391"
          data-name="Trazado 5391"
          d="M1289.2,505.676V491.749a.945.945,0,0,0-.674-.906l-12.66-3.8a.951.951,0,0,0-.544,0l-12.66,3.8a.946.946,0,0,0-.674.906v13.927a9,9,0,0,0,2.179,5.511c.213.271.455.543.7.814.9-.722,1.93-1.408,2.947-2.086l.1-.066c2.116-1.411,4.533-3.025,7.894-2.981a13.011,13.011,0,0,1,6.9,2.374l.009.005a28.58,28.58,0,0,1,3.757,2.585c.188-.215.385-.43.553-.645A9,9,0,0,0,1289.2,505.676Zm-13.482-.179a5.013,5.013,0,0,1-5.136-4.888h0c0-.044,0-.087,0-.131a4.959,4.959,0,0,1,4.872-5h.019a5.014,5.014,0,0,1,.247,10.024Z"
          transform="translate(-1261.984 -487.005)"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5392"
          data-name="Trazado 5392"
          d="M1282.125,511.592a11.952,11.952,0,0,0-6.334-2.18c-3.087-.04-5.307,1.442-7.251,2.738l-.091.061c-.934.622-1.877,1.253-2.708,1.916a22.352,22.352,0,0,0,3.531,3.116,37.462,37.462,0,0,0,5.969,3.5.867.867,0,0,0,.71,0,37.462,37.462,0,0,0,5.969-3.5,21.889,21.889,0,0,0,3.664-3.272,26.332,26.332,0,0,0-3.451-2.374Z"
          transform="translate(-1261.984 -487.005)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconBeneficiary
