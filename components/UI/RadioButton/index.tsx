import React, { useState, useEffect } from "react"
import Radio from "./styles"

interface RadioInterface {
  value: number
  name?: string
  checked?: boolean
  className?: string
  onClick?: (arg: any) => void
  onChange?: (arg: any) => void
  disabled?: boolean
}

const RadioButton = (props: RadioInterface) => {
  const { value, name, checked, className, onClick, onChange, disabled } = props
  const [isChecked, setIsChecked] = useState<boolean>(checked || false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    if (onChange) {
      onChange(e.target.value)
    }
  }
  useEffect(() => {
    setIsChecked(checked)
  }, [checked])
  return (
    <Radio isChecked={isChecked} isDisabled={disabled}>
      <input
        className={className}
        type="radio"
        value={value}
        name={name}
        checked={isChecked}
        onClick={onClick}
        onChange={handleChange}
        disabled={disabled}
      />
    </Radio>
  )
}

export default RadioButton
