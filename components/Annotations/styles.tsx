import styled from "styled-components"
import theme from "theme/index"

const CardsContainer = styled.div`
  display: flex;
  padding-top: 30px;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
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
}
