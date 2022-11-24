import styled from "styled-components"
import theme from "theme/index"

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  font-family: ${theme.fonts.primary};

  .other {
    display: flex;
    gap: 10px;
  }
`

const Select = styled.div`
  .select {
    margin: 0;
    padding: 10px 15px;
    display: flex;
    gap: 15px;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
    -webkit-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
    -moz-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
  }

  p {
    margin: 0;
  }
  cursor: pointer;
  position: relative;
`

const IconContainer = styled.p`
  transform: rotate(270deg);
`

const Selector = styled.div`
  background-color: white;
  box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.25);
  -webkit-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.25);
  -moz-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.25);
  position: absolute;
  z-index: 100;
  right: 0;
  top: 50px;
  padding: 10px 5px;
  width: 150px;
  border-radius: 0 0 5px 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Option = styled.div`
  background-color: white;
  font-weight: ${theme.fontWeights.light};
  margin-left: 5px;

  &:hover {
    font-weight: ${theme.fontWeights.regular};
  }
`

export { FiltersContainer, Select, IconContainer, Selector, Option }
