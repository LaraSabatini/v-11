import styled from "styled-components"
import theme from "theme/index"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 30px;
`

const HeadContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 83%;
`

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

export { MainContainer, Content, HeadContent, Title }
