import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div``

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

const ClientsContainer = styled.div`
  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  width: 800px;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.primary};
  height: 350px;
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
  font-size: 15px;
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
      left: 11%;
      width: 75px;
    `};

  ${props =>
    props.filterSelected === "free-pass" &&
    css`
      left: 22%;
      width: 90px;
    `};
`

const InfoRow = styled.div`
  display: flex;
  font-weight: ${theme.fontWeights.light};
  color: #747474;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  font-size: 14px;
`

const FullName = styled.p`
  width: 200px;
  margin-left: 88px;
`
const PartnerNumber = styled.p`
  width: 60px;
`
const Type = styled.p<{ type: string }>`
  width: 125px;

  ${props =>
    props.type === "day" &&
    css`
      color: ${theme.colors.primary};
      font-weight: ${theme.fontWeights.regular};
    `};

  ${props =>
    props.type === "student" &&
    css`
      color: ${theme.colors.secondary};
      font-weight: ${theme.fontWeights.regular};
    `};

  ${props =>
    props.type === "free-pass" &&
    css`
      color: ${theme.colors.green};
      font-weight: ${theme.fontWeights.regular};
    `};
`
const Identification = styled.p`
  width: 120px;
`

const MemberSince = styled.p`
  width: 150px;
`

const ClientRow = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  height: 350px;
`

const ClientList = styled.div<{ isSelected: boolean }>`
  display: flex;
  font-weight: ${theme.fontWeights.light};
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${props =>
    props.isSelected &&
    css`
      background-color: rgba(0, 0, 0, 0.05);
    `};
`

export {
  Container,
  Paginator,
  NoPartnersView,
  ClientsContainer,
  FiltersRow,
  Tab,
  Line,
  InfoRow,
  FullName,
  PartnerNumber,
  Type,
  Identification,
  MemberSince,
  ClientList,
  ClientRow,
}
