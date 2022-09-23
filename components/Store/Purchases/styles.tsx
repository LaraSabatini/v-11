import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  margin-top: -25px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  position: absolute;
  top: -57px;
  right: 0;
`
const FilterButton = styled.button`
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.semiBold};
  margin-top: -6px;
  cursor: pointer;
`

const TableContainer = styled.div`
  width: 70%;
  padding-top: 50px;
`

const Details = styled.div`
  padding: 25px;
  height: 400px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 5px rgba(59, 0, 135, 0.1);
`

const Caja = styled.div`
  margin-top: -40px;
  padding-bottom: 40px;
  font-size: 18px;

  display: flex;
  gap: 20px;

  span {
    text-decoration: underline;
    background-color: ${theme.colors.success_light};
    padding: 5px;
    margin-right: 10px;
  }
`

export {
  Container,
  FiltersContainer,
  FilterButton,
  TableContainer,
  Details,
  Caja,
}
