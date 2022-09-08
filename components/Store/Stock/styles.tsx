import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  margin-top: -20px;
  position: relative;
`

const Content = styled.div`
  width: 1290px;
  padding-top: 40px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`

const AutocompleteContainer = styled.div`
  margin-top: 33px;
`

const ErrorMessage = styled.p`
  color: ${theme.colors.danger};
  position: absolute;
`

export {
  Container,
  Content,
  ButtonsContainer,
  AutocompleteContainer,
  ErrorMessage,
}
