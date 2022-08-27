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
    font-family: "Josefin Sans";
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
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.semiBold};
  cursor: pointer;
`

const EmptyDiv = styled.div`
  height: 11px;
`

const Shapes = styled.div`
  position: absolute;
  div {
    position: absolute;
  }

  .shape-1 {
    top: 100px;
    left: 50px;
  }

  .shape-2 {
    left: 500px;
    top: 20px;
  }

  .shape-3 {
    left: 1000px;
    top: 500px;
  }

  .shape-4 {
    left: 100px;
    top: 600px;
  }

  .shape-5 {
    left: 1100px;
    top: 150px;
  }

  .shape-6 {
    left: 250px;
    top: 300px;
  }

  .shape-7 {
    left: 1150px;
    top: 700px;
  }

  .shape-8 {
    left: 800px;
    top: 50px;
    transform: rotate(180deg);
  }

  .shape-9 {
    left: 650px;
    top: 700px;
    transform: rotate(90deg);
  }
`

export {
  FormContainer,
  MainContainer,
  InputContainer,
  LoginButton,
  EmptyDiv,
  Shapes,
}
