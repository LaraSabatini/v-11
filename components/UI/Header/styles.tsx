import styled, { css } from "styled-components"
import theme from "theme/index"

const HeaderContainer = styled.div`
  width: 100vw;
  height: 30px;
  padding: 20px 0;
  position: relative;

  @media (max-width: 440px) {
    img {
      display: none;
    }
  }
`

const MobileMenu = styled.button`
  display: none;
  @media (max-width: 440px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: none;
    cursor: pointer;
    border: none;
    gap: 3px;
    div {
      width: 20px;
      height: 3px;
      background: ${theme.colors.primary};
      border-radius: 3px;
    }
  }
`

const HeaderContent = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 60px;
  }
`

const Sections = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 440px) {
    z-index: 500;
    display: none;

    ${props =>
      props.visible &&
      css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        top: 100%;
        background-color: ${theme.colors.white};
        box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
        border-radius: 0 0 10px 10px;
        padding: 10px 20px;
      `};
  }
`

const SectionTitle = styled.div<{ bold: boolean }>`
  position: relative;
  background: none;
  border: none;
  outline: none;
  margin: 0;
  font-family: ${theme.fonts.primary};
  cursor: pointer;
  font-weight: ${theme.fontWeights.light};
  font-size: 16px;
  color: ${theme.colors.primary};
  text-decoration: none;

  ${props =>
    props.bold &&
    css`
      font-weight: ${theme.fontWeights.medium};
      text-decoration: underline;
    `};
`

const ProfilePicture = styled.button`
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.regular};
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
`

const SubMenu = styled.div`
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px 10px 5px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 0 0 3px 3px;
  top: 20px;
  z-index: 150;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const SubButton = styled.button<{ selectedSection: boolean }>`
  font-family: ${theme.fonts.primary};
  border: none;
  cursor: pointer;
  background: none;
  text-align: left;
  font-size: 15px;
  font-weight: ${theme.fontWeights.light};
  &:hover {
    font-weight: ${theme.fontWeights.regular};
  }

  p {
    margin: 0;
  }

  ${props =>
    props.selectedSection &&
    css`
      font-weight: ${theme.fontWeights.regular};
    `};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;

  @media (max-width: 440px) {
    gap: 20px;
  }
`

export {
  HeaderContainer,
  ProfilePicture,
  HeaderContent,
  Sections,
  SectionTitle,
  SubMenu,
  SubButton,
  List,
  RightSection,
  MobileMenu,
}
