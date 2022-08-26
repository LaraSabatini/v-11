import styled from "styled-components"
import theme from "theme/index"

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  position: absolute;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 5px rgba(59, 0, 135, 0.1);
  padding: 20px;

  h2 {
    font-family: "Roboto";
    font-weight: 500;
    font-size: 20px;
    margin: 0;
    padding-bottom: 30px;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const LoginButton = styled.button`
  padding: 10px 0;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #0f006b;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.semiBold};
  cursor: pointer;
`

const EmptyDiv = styled.div`
  height: 11px;
`

export { FormContainer, MainContainer, InputContainer, LoginButton, EmptyDiv }
