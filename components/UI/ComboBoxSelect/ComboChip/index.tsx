import React from "react"
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import { ChipContainer, Close } from "./styles"

interface ComboChipInterface {
  display_name: string | JSX.Element
  onClick?: (arg?: any) => void
}

// eslint-disable-next-line react/function-component-definition
const ComboChip: React.FC<ComboChipInterface> = ({ display_name, onClick }) => {
  return (
    <ChipContainer>
      <p className="chip-display-name">{display_name}</p>
      {onClick && (
        <Close type="button" onClick={onClick}>
          <Icon icon="IconMenuOff" color={theme.colors.grey_light} />
        </Close>
      )}
    </ChipContainer>
  )
}

export default ComboChip
