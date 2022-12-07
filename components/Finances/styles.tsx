import styled from "styled-components"
import theme from "theme/index"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.primary};
`

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  margin-top: 27px;
`

export { MainContainer, Content }
