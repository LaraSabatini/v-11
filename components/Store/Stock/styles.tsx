import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  margin-top: -20px;
  position: relative;
`

const EditButton = styled.button`
  border: none;
  background: ${theme.colors.primary};
  border-radius: 50%;
  /* padding: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 50px;
  height: 50px;
`

const Content = styled.div`
  width: 1290px;
  padding-top: 40px;
`

const MainButton = styled.div`
  position: absolute;
  top: -74px;
  right: 370px;
`

export { Container, EditButton, Content, MainButton }
