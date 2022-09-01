/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconProvisioners({ width, height, color }: IconInterface) {
  return (
    <svg
      id="icon-prestadores"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "28.346"}
      height={!height && "29.214"}
      viewBox="0 0 28.346 29.214"
    >
      <path
        id="Trazado_5389"
        data-name="Trazado 5389"
        d="M1313.364,619.181c-.683.177-1.372.329-2.058.456a27.3,27.3,0,0,1-4.1.454q-.348.011-.7.01c-.036,0-.072,0-.107,0a27.816,27.816,0,0,1-4.866-.469c-.7-.127-1.384-.275-2.058-.45a19.981,19.981,0,0,1-6.945-3.147v12.109a.981.981,0,0,0,.981.981h25.818a.981.981,0,0,0,.981-.981V616.075A20.07,20.07,0,0,1,1313.364,619.181Z"
        transform="translate(-1292.246 -599.908)"
        fill={color || "#70777c"}
      />
      <path
        id="Trazado_5390"
        data-name="Trazado 5390"
        d="M1319.592,605.3h-6.086v-2.241a3.153,3.153,0,0,0-3.15-3.15h-7.873a3.153,3.153,0,0,0-3.15,3.15V605.3h-6.086a1,1,0,0,0-1,1v7.346a20.38,20.38,0,0,0,7.087,3.211c.687.179,1.39.33,2.1.46a28.449,28.449,0,0,0,4.965.478c.036,0,.072,0,.109,0,.239,0,.478,0,.715-.01a27.786,27.786,0,0,0,4.184-.464c.7-.129,1.4-.284,2.1-.465a20.457,20.457,0,0,0,7.086-3.169V606.3A1,1,0,0,0,1319.592,605.3Zm-13.194,0h-4.965v-2.241a1.051,1.051,0,0,1,1.05-1.05h7.873a1.051,1.051,0,0,1,1.05,1.05V605.3Z"
        transform="translate(-1292.246 -599.908)"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconProvisioners
