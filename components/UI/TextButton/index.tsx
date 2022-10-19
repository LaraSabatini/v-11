import React, { useState } from "react"

import { ButtonContainer, ButtonGlow, SButton } from "./styles"

export interface SButtonInterface {
  type?: "button" | "submit" | "reset"
  content: string
  onClick?: (arg?: any) => void
  cta?: boolean // cta (Call to Action)
  disabled?: boolean

  color?: string
  borderColor?: string
  bgColor?: string

  hoverColor?: string
  hoverBorderColor?: string
  hoverBgColor?: string
  reference?: React.MutableRefObject<any>
}

// eslint-disable-next-line react/function-component-definition
const TextButton: React.FC<SButtonInterface> = ({
  cta,
  type,
  content,
  onClick,
  disabled,
  color,
  borderColor,
  bgColor,
  hoverColor,
  hoverBorderColor,
  reference,
  hoverBgColor,
}) => {
  const [buttonWidth, setButtonWidth] = useState<number>()
  const [buttonHeight, setButtonHeight] = useState<number>()

  const getButtonDimensions = (e: any) => {
    setButtonWidth(e.currentTarget.offsetWidth)
    setButtonHeight(e.currentTarget.offsetHeight)
  }

  const resetButtonDimensions = () => {
    setButtonWidth(0)
    setButtonHeight(0)
  }

  const capitalContent = (contentWord: string) => {
    if (contentWord?.length) {
      return contentWord[0].toUpperCase() + contentWord.slice(1).toLowerCase()
    }

    return contentWord
  }

  return (
    <ButtonContainer>
      <ButtonGlow
        hoverBorderColor={hoverBorderColor}
        glowWidth={buttonWidth}
        glowHeight={buttonHeight}
        disabled={disabled}
        cta={cta}
      />
      <SButton
        onMouseEnter={getButtonDimensions}
        onMouseLeave={resetButtonDimensions}
        type={type}
        disabled={disabled}
        cta={cta}
        onClick={onClick}
        color={color}
        borderColor={borderColor}
        bgColor={bgColor}
        hoverColor={hoverColor}
        hoverBorderColor={hoverBorderColor}
        hoverBgColor={hoverBgColor}
        ref={reference}
      >
        {capitalContent(content)}
      </SButton>
    </ButtonContainer>
  )
}

export default TextButton
