import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  /* border: 1px solid red; */
  /* height: 80%; */
  /* width: 600px; */
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

//

const ClientsContainer = styled.div`
  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  width: 800px;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.primary};
`

const FiltersRow = styled.div`
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
  font-size: 16px;
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
      left: 3%;
      width: 55px;
    `};

  ${props =>
    props.filterSelected === "students" &&
    css`
      left: 12%;
      width: 75px;
    `};

  ${props =>
    props.filterSelected === "free-pass" &&
    css`
      left: 23%;
      width: 100px;
    `};
`

const InfoRow = styled.div`
  display: flex;
  font-weight: ${theme.fontWeights.light};
  color: #747474;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
`

const ExpDate = styled.p`
  width: 144px;
  margin-left: 88px;
`
const FullName = styled.p`
  width: 200px;
  margin-left: 88px;
`
const PartnerNumber = styled.p`
  width: 60px;
`
const Type = styled.p`
  width: 125px;
`
const Identification = styled.p`
  width: 120px;
`

const MemberSince = styled.p`
  width: 150px;
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
  ClientsContainer,
  FiltersRow,
  Tab,
  Line,
  InfoRow,
  ExpDate,
  FullName,
  PartnerNumber,
  Type,
  Identification,
  MemberSince,
}
