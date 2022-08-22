/* eslint-disable prettier/prettier */
import React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconPaperClip({ width, height, color }: IconInterface) {
  return (
    <svg
      id="IconPapperClip"
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "14"}
      height={!height && "28"}
      viewBox="0 0 14 28"
    >
      <path
        id="Trazado_5591"
        data-name="Trazado 5591"
        d="M129.425,7.318V20.936A5.091,5.091,0,1,1,119.243,21V5.139a3.182,3.182,0,1,1,6.364-.048V18.455a1.273,1.273,0,0,1-2.545,0V7.318a.955.955,0,0,0-.955-.955h0a.954.954,0,0,0-.955.955V18.407a3.182,3.182,0,1,0,6.364.048V5.155a5.091,5.091,0,1,0-10.182-.064V21a7,7,0,1,0,14,0V7.318a.954.954,0,0,0-.955-.955h0A.955.955,0,0,0,129.425,7.318Z"
        transform="translate(-117.334 0)"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconPaperClip
