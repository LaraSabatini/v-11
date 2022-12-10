import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  /* height: 80%; */
  width: 600px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`

const ListItem = styled.div`
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  background-color: ${theme.colors.white};
  padding: 0 15px;
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.primary};

  .name {
    width: 200px;
  }

  .partnerNumber {
    width: 100px;
  }
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
  background-color: #c66948;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.light};
`

const FreePass = styled.p`
  background-color: #48aba2;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.light};
`

const IconContainer = styled.div<{ active: boolean }>`
  margin-left: 50px;
  transform: rotate(90deg);

  ${props =>
    props.active &&
    css`
      transform: rotate(360deg);
    `};
`

const Paginator = styled.div`
  font-family: ${theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  padding-right: 10px;
  margin-top: 10px;
`

const NoPartnersView = styled.h1`
  font-family: ${theme.fonts.primary};
  text-transform: uppercase;
  color: ${theme.colors.primary_light};
  text-align: center;
  margin-top: 100px;
  font-size: 25px;
`

const Day = styled.p`
  background-color: #764e9a;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.light};
`

export {
  ListContainer,
  ListItem,
  Container,
  Tags,
  Student,
  FreePass,
  IconContainer,
  Paginator,
  NoPartnersView,
  Day,
}
