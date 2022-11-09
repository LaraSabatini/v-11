import styled from "styled-components"
import theme from "theme/index"

const View = styled.div`
  width: 500px;
  font-family: ${theme.fonts.primary};
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  width: 220px;
  text-decoration: underline;
`

const Amount = styled.p`
  font-weight: ${theme.fontWeights.semiBold};
`

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .software {
    background-color: white;
  }
`

const DifferenceData = styled.p``

export { View, Title, Row, Amount, RowContainer, DifferenceData }
