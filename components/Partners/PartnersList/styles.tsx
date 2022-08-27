import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  height: 80%;
  margin-top: 50px;
  width: 60%;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const ListItem = styled.div`
  border: 1px solid red;
  border-radius: 10px;
  background-color: ${theme.colors.white};
  padding: 0 15px;
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.primary};
`

const Name = styled.p`
  width: 120px;
`

const PaymentActive = styled.p<{ active: boolean }>`
  width: 100px;
  text-align: right;
  ${props =>
    props.active
      ? css`
          color: ${theme.colors.green};
        `
      : css`
          color: ${theme.colors.danger};
        `};
`

const PartnerNumber = styled.p`
  width: 100px;
`

const Tags = styled.div`
  width: 240px;
  display: flex;
  gap: 5px;
  p {
    margin: 0;
  }
`

const Student = styled.p`
  background-color: #c66a48c0;
  padding: 5px;
  border-radius: 5px;
`

const FreePass = styled.p`
  background-color: #48aba3ca;
  padding: 5px;
  border-radius: 5px;
`

const IconContainer = styled.div<{ active: boolean }>`
  margin-left: 100px;
  transform: rotate(90deg);

  ${props =>
    props.active &&
    css`
      transform: rotate(360deg);
    `};
`

export {
  ListContainer,
  ListItem,
  Name,
  Container,
  PaymentActive,
  PartnerNumber,
  Tags,
  Student,
  FreePass,
  IconContainer,
}
