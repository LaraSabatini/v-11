import React, { useState } from "react"
import { TooltipContainer, TooltipItem } from "./styles"

export interface TooltipInterface {
  title: string | number | JSX.Element | JSX.Element[]
  bgcolor?: string
  color?: string
  opacity?: string
  children?: JSX.Element[] | JSX.Element
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "sidebar"
}

function Tooltip({
  title,
  children,
  placement,
  bgcolor,
  color,
  opacity,
}: TooltipInterface) {
  const [sidebarWidth, setSidebarWidth] = useState<number>()

  const handlePlacement = e => {
    setSidebarWidth(e.currentTarget.offsetWidth)
  }
  return title ? (
    <TooltipContainer onMouseOver={handlePlacement}>
      <TooltipItem
        placement={placement}
        bgcolor={bgcolor}
        color={color}
        opacity={opacity}
        changePadding={sidebarWidth}
        className="tooltip-item"
      >
        {title}
      </TooltipItem>
      <div>{children}</div>
    </TooltipContainer>
  ) : (
    <div>{children}</div>
  )
}

export default Tooltip
