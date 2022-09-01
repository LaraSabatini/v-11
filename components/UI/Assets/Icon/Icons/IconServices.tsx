/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconServices({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "28"}
      height={!height && "33.36"}
      viewBox="0 0 28 33.36"
    >
      <g id="IconServices" transform="translate(0 0)">
        <path
          id="Trazado_5882"
          data-name="Trazado 5882"
          d="M18.749,11.823a26.78,26.78,0,0,1-3.985.437c-.226.007-.452.01-.68.009h-.1a27.189,27.189,0,0,1-4.73-.451c-.68-.122-1.345-.264-2-.432A19.532,19.532,0,0,1,.5,8.36V32.416a.949.949,0,0,0,.954.944H26.547a.949.949,0,0,0,.953-.944V8.4a19.625,19.625,0,0,1-6.751,2.987c-.664.17-1.333.316-2,.438M5.265,17.12H13.55a1,1,0,1,1,0,2H5.265a1,1,0,0,1,0-2m0,4.277H9.749a1,1,0,1,1,0,2H5.265a1,1,0,0,1,0-2m18.47,5.278a1,1,0,0,1-1,1H5.265a1,1,0,0,1,0-2h17.47a1,1,0,0,1,1,1"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5883"
          data-name="Trazado 5883"
          d="M27.012,2.7H21.433l-.525-.32-.01-.005A12.962,12.962,0,0,0,14.018,0C10.886-.04,8.579,1.365,6.567,2.7H.988A.987.987,0,0,0,0,3.687V6a20.149,20.149,0,0,0,7,3.17c.679.176,1.373.325,2.075.454a28.218,28.218,0,0,0,4.9.472h.108c.236,0,.472,0,.706-.01a27.452,27.452,0,0,0,4.133-.458Q19.963,9.438,21,9.171a20.227,20.227,0,0,0,7-3.128V3.687a.987.987,0,0,0-.988-.987"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconServices
