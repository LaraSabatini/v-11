/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconContact({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "20"}
      height={!height && "20"}
      viewBox="0 0 20 20"
    >
      <g id="icon-contacto" transform="translate(-1326.046 -250.546)">
        <path
          id="Icon_awesome-phone-alt"
          data-name="Icon awesome-phone-alt"
          d="M19.43,14.133l-4.375-1.875a.938.938,0,0,0-1.094.27l-1.938,2.367A14.479,14.479,0,0,1,5.1,7.973L7.469,6.036a.935.935,0,0,0,.27-1.094L5.863.567A.944.944,0,0,0,4.789.024L.727.962A.938.938,0,0,0,0,1.875,18.123,18.123,0,0,0,18.125,20a.938.938,0,0,0,.914-.727l.938-4.063a.949.949,0,0,0-.547-1.078Z"
          transform="translate(1326.046 250.545)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}
export default IconContact
