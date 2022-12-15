import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  position: absolute;
  background-color: ${theme.colors.white};
  border-radius: 5px;
  width: 150px;
  box-shadow: 0px 0px 20px 5px rgba(59, 0, 135, 0.1);
  right: 70px;
  top: 60px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 200;

  @media (max-width: 440px) {
    right: 0px;
  }
`

const Title = styled.h5`
  font-family: ${theme.fonts.primary};
  margin: 0;
`

const LogOutButton = styled.button`
  border: none;
  font-family: ${theme.fonts.primary};
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  cursor: pointer;
`

export { Container, Title, LogOutButton }
