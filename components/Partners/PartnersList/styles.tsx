import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  height: 80%;
  width: 750px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`

const ListItem = styled.div`
  box-shadow: 0px 0px 28px -5px rgba(83, 45, 117, 0.29);
  -webkit-box-shadow: 0px 0px 28px -5px rgba(83, 45, 117, 0.29);
  -moz-box-shadow: 0px 0px 28px -5px rgba(83, 45, 117, 0.29);
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
