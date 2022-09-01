import styled, { css } from "styled-components"
import theme from "theme/index"

const HeaderContainer = styled.div`
  width: 100vw;
  height: 30px;
  padding: 20px 0;
  background-color: ${theme.colors.primary};
  position: relative;
`

const HeaderContent = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Sections = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const SectionTitle = styled.a<{ bold: boolean }>`
  margin: 0;
  font-family: ${theme.fonts.primary};
  cursor: pointer;
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.white};
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

export {
  HeaderContainer,
  ProfilePicture,
  HeaderContent,
  Sections,
  SectionTitle,
}
