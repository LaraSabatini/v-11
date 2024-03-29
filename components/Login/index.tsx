import React, { useState, useRef, useEffect, useContext } from "react"
import { useRouter } from "next/router"
// SERVICES
// DATA STORAGE & TYPES
import { GeneralContext } from "contexts/GeneralContext"
import texts from "strings/loginPage.json"
import { getUsersAction, validateUserAction } from "helpers/users"
// COMPONENTS & STYLING
import TextField from "components/UI/TextField"
import ErrorMessage from "components/UI/ErrorMessage"
import Background from "components/UI/Assets/background"
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

  const { setUsers } = useContext(GeneralContext)

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
    e?.preventDefault()
    await userNameRef.current?.focus()
    await passwordRef.current?.focus()
    await submitRef.current?.focus()

    if (
      passwordRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      userNameRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    ) {
      const res = await validateUserAction(userName, password)
      if (res.length) {
        setSuccess(true)
        localStorage.setItem("user", res[0].name)
        localStorage.setItem("id", res[0].id)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("permissions", res[0].permissions)

        const getUserData = await getUsersAction()

        const cleanedUserArray = getUserData.filter(user => user.admin === 1)
        setUsers(cleanedUserArray)

        router.push("home?clients=true")
        // eslint-disable-next-line no-restricted-globals
        location.reload()
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
    <div>
      {!logged && (
        <>
          <Shapes>
            <Background />
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
                  keyDown={submitLogin}
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
    </div>
  )
}

export default Login
