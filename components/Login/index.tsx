import React from "react"
import TextField from "components/UI/TextField"
import texts from "strings/loginPage.json"
import {
  MainContainer,
  FormContainer,
  InputContainer,
  LoginButton,
} from "./styles"

function Login() {
  return (
    <MainContainer>
      <FormContainer>
        <h2>{texts.title}</h2>
        <InputContainer>
          <TextField label={texts.userLabel} required width={290} type="text" />
          <TextField
            label={texts.passwordLabel}
            required
            width={290}
            type="password"
          />
          <LoginButton>{texts.button}</LoginButton>
        </InputContainer>
      </FormContainer>
    </MainContainer>
  )
}

export default Login
