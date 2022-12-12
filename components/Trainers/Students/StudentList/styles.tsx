import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  width: 600px;

  display: flex;
  flex-direction: column;
`

const ListContainer = styled.div`
  width: 600px;
  height: 350px;

  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  padding: 18px 0;
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

const Tab = styled.button`
  margin-left: 24px;
  font-family: ${theme.fonts.primary};
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.black};
`

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  padding-bottom: 10px;
  position: relative;
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

const Identification = styled.p`
  width: 120px;
`

const MemberSince = styled.p`
  width: 150px;
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

const ClientRow = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  height: 295px;
`

export {
  Container,
  ListContainer,
  ListItem,
  IconContainer,
  NoMore,
  Tab,
  PaginatorContainer,
  FiltersRow,
  InfoRow,
  FullName,
  PartnerNumber,
  Identification,
  MemberSince,
  ClientList,
  ClientRow,
}
