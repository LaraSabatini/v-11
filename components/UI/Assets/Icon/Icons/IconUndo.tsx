/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconUndo({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "21.363"}
      height={!height && "21.364"}
      viewBox="0 0 21.363 21.364"
    >
      <g id="icon-deshacer" transform="translate(1.833 -1)">
        <path
          id="Trazado_5484"
          data-name="Trazado 5484"
          d="M1380.28,712.511a10.681,10.681,0,0,0-14.979-1.953,10.394,10.394,0,0,0-.993.883l-.073-1.3a1.553,1.553,0,0,0-3.1.2l.339,6.1a1.535,1.535,0,0,0,.2.908c.023.04.063.065.089.1a1.574,1.574,0,0,0,.23.266,1.6,1.6,0,0,0,.177.139,1.558,1.558,0,0,0,.356.177c.031.011.055.035.087.043a1.534,1.534,0,0,0,.424.049h.006a1.545,1.545,0,0,0,.411-.059c.008,0,.017,0,.026,0l5.989-1.762a1.553,1.553,0,0,0-.9-2.974l-2.427.714a7.353,7.353,0,0,1,5.65-2.586h.024a7.575,7.575,0,1,1,0,15.15h-.025a7.536,7.536,0,0,1-4.591-1.57,7.692,7.692,0,0,1-2.684-3.978,1.553,1.553,0,0,0-2.988.849,10.817,10.817,0,0,0,3.775,5.589,10.635,10.635,0,0,0,6.484,2.216h.032a10.681,10.681,0,0,0,8.464-17.193Z"
          transform="translate(-1362.965 -707.341)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconUndo
