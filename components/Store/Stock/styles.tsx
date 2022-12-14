import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  position: relative;
`

const Content = styled.div`
  padding-top: 10px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
`

const AutocompleteContainer = styled.div`
  height: 40px;
`

const TextFieldContainer = styled.div`
  height: 40px;
`

const ErrorMessage = styled.p`
  color: ${theme.colors.danger};
  position: absolute;
`

const Table = styled.div`
  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  width: 100%;
  /* height: 100px; */
  padding: 18px 0;
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  padding-bottom: 10px;
  position: relative;
`

const Tab = styled.button<{ selected: boolean }>`
  &:first-child {
    margin-left: 24px;
  }
  font-family: ${theme.fonts.primary};
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: ${theme.fontWeights.light};
  color: rgba(0, 0, 0, 0.65);

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.black};
    `};
`

const Line = styled.div<{ filterSelected: string }>`
  height: 1px;
  background-color: ${theme.colors.primary};
  position: absolute;
  bottom: 0;

  ${props =>
    props.filterSelected === "all" &&
    css`
      left: 1.7%;
      width: 55px;
    `};

  ${props =>
    props.filterSelected === "drinks" &&
    css`
      left: 7.2%;
      width: 70px;
    `};

  ${props =>
    props.filterSelected === "magnesium" &&
    css`
      left: 14%;
      width: 85px;
    `};

  ${props =>
    props.filterSelected === "shoes" &&
    css`
      left: 21.5%;
      width: 90px;
    `};

  ${props =>
    props.filterSelected === "energy-drinks" &&
    css`
      left: 29.5%;
      width: 100px;
    `};

  ${props =>
    props.filterSelected === "climbing-day" &&
    css`
      left: 38.2%;
      width: 110px;
    `};
`

const InfoRow = styled.div`
  display: flex;
  font-weight: ${theme.fontWeights.light};
  color: #747474;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  font-size: 14px;

  .item {
    width: 160px;
    margin-left: 60px;
  }

  .brand {
    width: 140px;
  }

  .stock {
    width: 80px;
  }

  .earning {
    width: 100px;
  }
`

const ProductsRow = styled.div`
  padding: 14px 25px;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  display: flex;
  align-items: center;
  font-weight: ${theme.fontWeights.light};
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  p {
    margin: 0;
  }

  .item {
    width: 160px;
    margin-left: 25px;
  }

  .brand {
    width: 140px;
  }

  .stock {
    width: 80px;
  }

  .earning {
    width: 100px;
  }

  .input-stock {
    width: 80px;
    margin-top: -4px;
  }

  .input-name {
    width: 160px;
    margin-left: 25px;
    margin-top: -4px;
  }

  .input-brand {
    width: 140px;
  }

  .input-margin {
    width: 100px;
    margin-top: -4px;
  }

  .input-cost {
    width: 80px;
    margin-top: -4px;
  }

  .input-provider {
    margin-top: -4px;
    width: 140px;
  }
`

const Status = styled.div<{ status: "green" | "yellow" | "red" }>`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;

  ${props =>
    props.status === "red" &&
    css`
      background-color: #ff6363;
    `};

  ${props =>
    props.status === "green" &&
    css`
      background-color: #48aba2;
    `};

  ${props =>
    props.status === "yellow" &&
    css`
      background-color: #d2bf59;
    `};
`

const Products = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  height: 290px;
`

const EnableButton = styled.button`
  border: none;
  background-color: transparent;
`

export {
  Container,
  Content,
  ButtonsContainer,
  AutocompleteContainer,
  ErrorMessage,
  TextFieldContainer,
  Table,
  FilterRow,
  Tab,
  Line,
  InfoRow,
  ProductsRow,
  Status,
  Products,
  EnableButton,
}
