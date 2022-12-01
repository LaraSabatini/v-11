import styled from "styled-components"
import theme from "theme/index"

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 25px;
  margin: 0;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  width: 98%;

  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`

export { Title, Container }
