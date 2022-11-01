import styled from "styled-components"
import theme from "theme/index"

const View = styled.div`
  width: 400px;
  font-family: ${theme.fonts.primary};
  display: flex;
  justify-content: space-between;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b2b9e25c;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
  p {
    margin: 0;
  }
`

const Title = styled.p`
  width: 170px;
  text-decoration: underline;
`

const Amount = styled.p`
  font-weight: ${theme.fontWeights.semiBold};
`

export { View, Title, Row, Amount }
