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
  padding-top: 30px;
`

const HeadContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 83%;
`

const Title = styled.h4`
  font-size: 25px;
  margin: 0;
  padding-top: 31px;

  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

const ErrorPage = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.primary};

  img {
    width: 400px;
  }

  .text {
    display: flex;
    flex-direction: column;
    font-weight: ${theme.fontWeights.light};
    /* align-items: center; */
    justify-content: center;
  }
`

export { MainContainer, Content, HeadContent, Title, ErrorPage }
