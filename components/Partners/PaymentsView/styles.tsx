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

const SectionsButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: -20px;
  margin-bottom: 10px;
`
export { Container, TableContainer, AmountOfPayments, SectionsButtons }
