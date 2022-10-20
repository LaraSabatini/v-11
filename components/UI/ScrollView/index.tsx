import React from "react"
import ScrollViewStyled from "./styles"

function ScrollView(props: {
  height: number
  horizontal?: boolean
  children: JSX.Element | JSX.Element[]
  id?: string
}) {
  const { height, horizontal, children, id } = props

  return (
    <ScrollViewStyled height={height} horizontal={horizontal} id={id}>
      {children}
    </ScrollViewStyled>
  )
}

export default ScrollView
