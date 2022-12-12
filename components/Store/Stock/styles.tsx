import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  position: relative;
`

const Content = styled.div`
  width: 1290px;
  padding-top: 10px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: -30px;
`

const AutocompleteContainer = styled.div`
  margin-top: 33px;
`

const TextFieldContainer = styled.div`
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
  TextFieldContainer,
}
