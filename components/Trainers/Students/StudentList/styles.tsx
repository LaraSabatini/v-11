import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  width: 50%;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0 10px 20px;
`

const ListItem = styled.div`
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 5px;
  background-color: ${theme.colors.white};
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const IconContainer = styled.div<{ active: boolean }>`
  margin-right: 30px;
  transform: rotate(90deg);

  ${props =>
    props.active &&
    css`
      transform: rotate(360deg);
    `};
`

const NoMore = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.focus};
  text-align: center;
  margin-top: 25%;
`

const PaginatorContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`

export {
  Container,
  ListContainer,
  ListItem,
  IconContainer,
  NoMore,
  PaginatorContainer,
}
