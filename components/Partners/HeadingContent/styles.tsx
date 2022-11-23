import styled from "styled-components"
import theme from "theme/index"

const HeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 25px;
  margin: 0;
  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

export { HeadContent, Title }
