import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconFolder({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && "30"}
      height={!height && "30"}
    >
      <defs>
        <clipPath id="a">
          <path data-name="Rect\xE1ngulo 4364" fill="none" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
      <g data-name="Grupo 11199" clipPath="url(#a)">
        <path
          data-name="Trazado 5671"
          d="M26.529 7.256h-11.37L12.9 4.622a.351.351 0 0 0-.28-.122H3.471A2.47 2.47 0 0 0 1 6.945v16.114A2.468 2.468 0 0 0 3.471 25.5h23.058A2.468 2.468 0 0 0 29 23.059V9.7a2.468 2.468 0 0 0-2.471-2.441M11.589 19.74a.932.932 0 0 1-.942.922H5.636a.932.932 0 0 1-.942-.922v-.24a.932.932 0 0 1 .942-.921h5.011a.932.932 0 0 1 .942.921Zm13.717-4.515a.932.932 0 0 1-.942.921H5.636a.932.932 0 0 1-.942-.921v-.239a.932.932 0 0 1 .942-.921h18.728a.932.932 0 0 1 .942.921Z"
          fill={color || "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconFolder
