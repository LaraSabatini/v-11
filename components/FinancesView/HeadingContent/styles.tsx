import styled from "styled-components"
import theme from "theme/index"

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 25px;
  margin: 0;
  padding-top: 31px;
  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`
const HeadContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 83%;
`
export { Title, HeadContent }
