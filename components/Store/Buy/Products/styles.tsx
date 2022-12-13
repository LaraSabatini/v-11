import styled from "styled-components"
import theme from "theme/index"

const Paginator = styled.div`
  font-family: ${theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  padding-right: 10px;
  margin-top: 20px;
`

const Navigate = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 840px;
  gap: 15px;
  padding: 10px 0 10px 10px;
`
export { ProductsContainer, Paginator, Navigate }
