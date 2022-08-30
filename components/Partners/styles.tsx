import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div``

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 50px;
  height: 80vh;
  position: relative;
`

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 25px;
  margin: 0;
`

const HeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const Filter = styled.button<{ selected: boolean }>`
  border: none;
  font-family: ${theme.fonts.primary};
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  -webkit-box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  -moz-box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  cursor: pointer;

  ${props =>
    props.selected &&
    css`
      background-color: ${theme.colors.black};
      color: ${theme.colors.white};
    `};
`

const AddPartner = styled.button`
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
  right: -20px;
  bottom: 0;
`

const ListAndDetailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`

const SearchBarContainer = styled.div`
  margin-top: 30px;
`

export {
  Container,
  Title,
  Content,
  FiltersContainer,
  Filter,
  HeadContent,
  AddPartner,
  MainButton,
  ListAndDetailContainer,
  SearchBarContainer,
}
