import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div``

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 80px;
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

export { Container, Title, Content, FiltersContainer, Filter, HeadContent }
