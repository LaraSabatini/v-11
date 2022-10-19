/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from "react"

import CheckboxContainer from "./styles"
import Icon from "../Assets/Icon"

interface ICheckbox {
  checked?: boolean
  iconCheck?: string
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
  idParam: string
  isDisabled?: boolean
  ownState?: boolean
  hasEvent?: boolean
}
// eslint-disable-next-line react/function-component-definition
const Checkbox: React.FC<ICheckbox> = ({
  checked,
  iconCheck = "IconCheck",
  idParam,
  onChange,
  isDisabled,
  ownState,
  hasEvent,
}) => {
  const [checkState, setcheckState] = useState(checked)
  const [init, setinit] = useState(false)
  useEffect(() => {
    if (init) {
      setcheckState(!checkState)
    } else {
      setinit(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])
  const handleChange = e => {
    if (onChange && ownState) {
      onChange(e)
      setcheckState(checked)
    } else if (onChange) {
      onChange(e)
      setcheckState(!checkState)
    } else if (!hasEvent) {
      setcheckState(checked)
    } else {
      setcheckState(!checkState)
    }
  }

  return (
    <CheckboxContainer>
      <input
        disabled={isDisabled}
        type="checkbox"
        id={idParam}
        checked={checkState}
        onChange={handleChange}
      />
      <label htmlFor={idParam}>
        <Icon icon={!iconCheck ? "IconCheck" : iconCheck} color="white" />
      </label>
    </CheckboxContainer>
  )
}

export default Checkbox
