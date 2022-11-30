import styled from "styled-components"
import theme from "theme/index"

const SearchContainer = styled.div`
  margin-top: -5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 438px;
  position: relative;
`

const PopOverContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 400px;
`

const SelectedClient = styled.div`
  height: 20px;
  padding: 9px 5px;
  width: 160px;
  border-radius: 5px;
  background-color: ${theme.colors.grey_lighter};
  align-items: center;
  justify-content: space-between;

  display: flex;
  p {
    font-weight: ${theme.fontWeights.light};
    font-size: 14px;
  }

  button {
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`

const IconContainer = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export { SearchContainer, PopOverContainer, SelectedClient, IconContainer }
