/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconLocation({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "16"}
      height={!height && "21.333"}
      viewBox="0 0 16 21.333"
    >
      <g id="icon-ubicacion" transform="translate(-662.123 -223.703)">
        <path
          id="Icon_awesome-map-marker-alt"
          data-name="Icon awesome-map-marker-alt"
          d="M7.178,20.9C1.124,12.126,0,11.226,0,8A8,8,0,1,1,16,8c0,3.226-1.124,4.126-7.178,12.9a1,1,0,0,1-1.644,0ZM8,11.333A3.333,3.333,0,1,0,4.667,8,3.333,3.333,0,0,0,8,11.333Z"
          transform="translate(662.123 223.703)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconLocation
