import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div``

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 30px;
  height: 80vh;
  position: relative;
  font-family: ${theme.fonts.primary};
`

const Title = styled.h4`
  font-size: 25px;
  margin: 0;

  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

const HeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  margin-top: 25px;
  height: 38px;
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  font-family: ${theme.fonts.primary};
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
  box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.25);
  -webkit-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.25);
  -moz-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.25);
  position: absolute;
  background-color: white;
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

export {
  Container,
  Content,
  Title,
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
}
