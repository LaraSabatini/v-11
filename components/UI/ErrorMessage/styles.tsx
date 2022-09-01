import styled from "styled-components"
import theme from "theme/index"

const Message = styled.span`
  color: ${theme.colors.danger};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  margin-left: 5px;
  display: flex;
  align-items: center;
  gap: 9px;
  line-height: 11px;
`

export default Message
