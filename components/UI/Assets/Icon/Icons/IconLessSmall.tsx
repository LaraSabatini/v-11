import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconLessSmall({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width && 14.536}
      height={!height && 2.4}
    >
      <path
        data-name="Trazado 5372"
        d="M13.335 2.4H1.2a1.2 1.2 0 010-2.4h12.135a1.2 1.2 0 110 2.4z"
        fill={color || "#fff"}
      />
    </svg>
  )
}

export default IconLessSmall
