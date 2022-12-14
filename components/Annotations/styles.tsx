import styled, { css } from "styled-components"
import theme from "theme/index"

const CardsContainer = styled.div`
  display: flex;
  padding-top: 13px;
  width: 85%;
  margin: 0 auto;
  justify-content: space-between;
  position: relative;
`

const Item = styled.div`
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  width: 390px;
`

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
  }
`

const TaskTitle = styled.p<{ done?: boolean }>`
  ${({ done }) =>
    done &&
    `
    text-decoration: line-through;
  `}
`

const TodoDate = styled.p`
  font-size: 14px;
`

const SubContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const TodoMenu = styled.button`
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`

const Description = styled.p<{ done?: boolean }>`
  font-weight: ${theme.fontWeights.light};
  margin: 0;
  padding: 15px 0 10px 0;
  ${({ done }) =>
    done &&
    `
    text-decoration: line-through;
  `}
`

const Menu = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  padding: 10px;
  text-align: left;
  right: 0;
  top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
  font-size: 15px;
  width: 200%;

  button {
    border: none;
    cursor: pointer;
    text-align: left;
    background: none;
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fontWeights.light};

    &:hover {
      font-weight: ${theme.fontWeights.regular};
    }
  }
`

const NoInfoToShow = styled.p`
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.focus};
  margin-top: 30%;
  font-size: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  span {
    text-transform: none;
    font-size: 15px;
    font-weight: ${theme.fontWeights.medium};
    padding-top: 10px;
  }
`

const Add = styled.button<{ disabled: boolean }>`
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
  bottom: 0px;
  right: -100px;
  position: absolute;
  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};
`

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: rgba(83, 45, 117, 0.4);
  margin-top: 10px;
`

export {
  CardsContainer,
  Item,
  ItemHeader,
  TaskTitle,
  TodoDate,
  TodoMenu,
  Description,
  Menu,
  SubContent,
  NoInfoToShow,
  Add,
  Divider,
}
