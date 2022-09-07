import React from "react"
import InputStyled from "./styles"

interface InputInterface {
  value?: number | string
  onChange?: (arg?: any) => void
  reference?: any
  onBlur?: (arg?: any) => void
  width?: number
}

const Input = ({
  value,
  onChange,
  reference,
  onBlur,
  width,
}: InputInterface) => {
  return (
    <InputStyled
      value={value}
      width={width}
      onChange={e => onChange(e)}
      ref={reference}
      onBlur={e => {
        if (onBlur !== undefined) {
          onBlur(e)
        }
      }}
    />
  )
}

export default Input
