import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  position: relative;
  height: 90vh;
  margin-top: 40px;
`

const TableContainer = styled.div``

const AmountOfPayments = styled.p`
  font-family: ${theme.fonts.primary};
`

export { Container, TableContainer, AmountOfPayments }
