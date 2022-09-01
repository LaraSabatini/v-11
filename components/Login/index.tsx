import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import validateUser from "services/ValidateUser.service"
import theme from "theme/index"
import TextField from "components/UI/TextField"
import ErrorMessage from "components/UI/ErrorMessage"
import texts from "strings/loginPage.json"
import ShapeOne from "components/UI/Assets/images/ShapeOne"
import ShapeSix from "components/UI/Assets/images/ShapeSix"
import ShapeFive from "components/UI/Assets/images/ShapeFive"
import ShapeThree from "components/UI/Assets/images/ShapeThree"
import ShapeTwo from "components/UI/Assets/images/ShapeTwo"
import ShapeFour from "components/UI/Assets/images/ShapeFour"
import {
  MainContainer,
  FormContainer,
  InputContainer,
  LoginButton,
  EmptyDiv,
  Shapes,
} from "./styles"

function Login() {
  const router = useRouter()
  const [logged, setLogged] = useState(false)

  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(null)

  const userNameRef = useRef(null)
  const passwordRef = useRef(null)
  const submitRef = useRef(null)

  const handleUserName = (e: any) => {
    e.preventDefault()
    setUserName(e.target.value)
    setSuccess(null)
  }

  const handlePassword = (e: any) => {
    e.preventDefault()
    setPassword(e.target.value)
    setSuccess(null)
  }

  const submitLogin = async e => {
    e.preventDefault()
    await userNameRef.current?.focus()
    await passwordRef.current?.focus()
    await submitRef.current?.focus()

    if (
      passwordRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      userNameRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    ) {
      const data = { name: userName, password }
      const res = await validateUser(data)
      if (res.data.length) {
        setSuccess(true)
        localStorage.setItem("user", res.data[0].name)
        localStorage.setItem("id", res.data[0].id)
        localStorage.setItem("isLoggedIn", "true")
        router.push("home")
      } else {
        setSuccess(false)
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setLogged(true)
    } else {
      setLogged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <>
      {!logged && (
        <>
          <Shapes>
            <div className="shape-1">
              <ShapeOne color={theme.colors.secondary} />
            </div>
            <div className="shape-2">
              <ShapeTwo color={theme.colors.primary} />
            </div>
            <div className="shape-3">
              <ShapeThree color={theme.colors.primary} />
            </div>
            <div className="shape-4">
              <ShapeFour color={theme.colors.green} />
            </div>
            <div className="shape-5">
              <ShapeFive color={theme.colors.green} />
            </div>
            <div className="shape-6">
              <ShapeSix color={theme.colors.black} />
            </div>
            <div className="shape-7">
              <ShapeOne color={theme.colors.secondary} />
            </div>
            <div className="shape-8">
              <ShapeSix color={theme.colors.black} />
            </div>
            <div className="shape-9">
              <ShapeTwo color={theme.colors.primary} />
            </div>
          </Shapes>
          <MainContainer>
            <FormContainer>
              <h2>{texts.title}</h2>
              <InputContainer>
                <TextField
                  label={texts.userLabel}
                  required
                  width={290}
                  type="text"
                  value={userName}
                  onChange={e => handleUserName(e)}
                  reference={userNameRef}
                />
                <TextField
                  label={texts.passwordLabel}
                  required
                  width={290}
                  type="password"
                  value={password}
                  onChange={e => handlePassword(e)}
                  reference={passwordRef}
                />
                {!success && success !== null ? (
                  <ErrorMessage message={texts.errorMessage} />
                ) : (
                  <EmptyDiv />
                )}
                <LoginButton ref={submitRef} onClick={submitLogin}>
                  {texts.button}
                </LoginButton>
              </InputContainer>
            </FormContainer>
          </MainContainer>
        </>
      )}
    </>
  )
}

export default Login
