import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div``

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 30px;
  height: 80vh;
  position: relative;
`

const HeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  margin-top: 25px;
  height: 38px;

  .btn-search {
    border: none;
    padding: 0;
    background: none;
  }
`

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

const IconContainer = styled.p`
  transform: rotate(270deg);
`

const SectionsButtons = styled.div`
  display: flex;
  gap: 10px;
`

const Section = styled.button<{ selected: boolean }>`
  font-family: ${theme.fonts.primary};
  border: 1px solid ${theme.colors.grey_lighter};
  background: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.semiBlack};
      border: 1px solid ${theme.colors.black};
    `};
`

const CreateProduct = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  cursor: pointer;
  box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
  -webkit-box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
  -moz-box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
`

const MainButton = styled.div`
  position: absolute;
  right: 0;
  bottom: -10px;
`

const ProductsAndReceiptContainer = styled.div`
  display: flex;
  gap: 20px;
`

const NoPermissionsViewContainer = styled.div`
  margin-top: -100px;
`

const HelpContainer = styled.div`
  position: relative;
  margin-top: 5px;
  cursor: pointer;
`

const SearchBarContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
`

export {
  Container,
  Content,
  HeadContent,
  FiltersContainer,
  Select,
  Selector,
  Option,
  IconContainer,
  SectionsButtons,
  Section,
  MainButton,
  CreateProduct,
  ProductsAndReceiptContainer,
  HelpContainer,
  NoPermissionsViewContainer,
  SearchBarContainer,
}
