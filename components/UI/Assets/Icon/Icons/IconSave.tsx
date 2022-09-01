/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconSave({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "20.862"}
      height={!height && "20.863"}
      viewBox="0 0 20.862 20.863"
    >
      <g id="icon-guardar" transform="translate(-1361.633 -707.693)">
        <path
          id="Trazado_5485"
          data-name="Trazado 5485"
          d="M1368.169,711.546h7.791a.422.422,0,0,0,.421-.421v-3.432h-8.635v3.432A.423.423,0,0,0,1368.169,711.546Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5486"
          data-name="Trazado 5486"
          d="M1382.169,712.941l-4.4-4.416v2.6a1.815,1.815,0,0,1-1.813,1.813h-7.791a1.815,1.815,0,0,1-1.813-1.813v-3.432h-2.809a1.914,1.914,0,0,0-1.914,1.914v17.035a1.915,1.915,0,0,0,1.914,1.914h17.034a1.915,1.915,0,0,0,1.914-1.914V713.729A1.113,1.113,0,0,0,1382.169,712.941Zm-2.919,11.225a1.118,1.118,0,0,1-1.118,1.117h-12.137a1.118,1.118,0,0,1-1.117-1.117v-5.825a1.117,1.117,0,0,1,1.117-1.117h12.137a1.118,1.118,0,0,1,1.118,1.117Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5487"
          data-name="Trazado 5487"
          d="M1376.859,719.017h-9.591a.7.7,0,1,0,0,1.391h9.591a.7.7,0,1,0,0-1.391Z"
          fill={color || "#70777c"}
        />
        <path
          id="Trazado_5488"
          data-name="Trazado 5488"
          d="M1375.469,721.8h-6.81a.7.7,0,0,0,0,1.391h6.81a.7.7,0,0,0,0-1.391Z"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconSave
