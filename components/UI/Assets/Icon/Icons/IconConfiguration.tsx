/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconConfiguration({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "29.806"}
      height={!height && "29.805"}
      viewBox="0 0 29.806 29.805"
    >
      <g id="icon-configuracion" transform="translate(-300.097 -41.203)">
        <path
          id="Trazado_5361"
          data-name="Trazado 5361"
          d="M1431.824,653.247l-3.487-.856a11.226,11.226,0,0,0-.734-1.781l1.782-2.969a.868.868,0,0,0-.123-1.065l-2.48-2.48a.868.868,0,0,0-1.065-.123l-2.969,1.782a11.228,11.228,0,0,0-1.781-.734l-.838-3.487a.9.9,0,0,0-.856-.663h-3.493a.9.9,0,0,0-.856.663l-.838,3.487a11.273,11.273,0,0,0-1.782.734l-2.968-1.782a.87.87,0,0,0-1.066.123l-2.48,2.48a.868.868,0,0,0-.122,1.065l1.781,2.969a11.313,11.313,0,0,0-.733,1.781l-3.371.856a.86.86,0,0,0-.663.838v3.493a.86.86,0,0,0,.663.838l3.371.856a11.363,11.363,0,0,0,.733,1.782l-1.781,2.968a.87.87,0,0,0,.122,1.066l2.48,2.48a.87.87,0,0,0,1.066.122l2.968-1.781a11.268,11.268,0,0,0,1.782.733l.838,3.371a.9.9,0,0,0,.856.663h3.493a.9.9,0,0,0,.856-.663l.838-3.371a11.224,11.224,0,0,0,1.781-.733l2.969,1.781a.868.868,0,0,0,1.065-.122l2.48-2.48a.87.87,0,0,0,.123-1.066l-1.782-2.968a11.275,11.275,0,0,0,.734-1.782l3.487-.856a.86.86,0,0,0,.664-.838v-3.493A.861.861,0,0,0,1431.824,653.247Zm-14.3,6.951a4.366,4.366,0,1,1,4.366-4.366A4.368,4.368,0,0,1,1417.526,660.2Z"
          transform="translate(-1102.585 -599.668)"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconConfiguration