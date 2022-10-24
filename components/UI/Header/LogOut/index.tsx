import React from "react"
import { useRouter } from "next/router"
import texts from "strings/loginPage.json"
import { Container, Title, LogOutButton } from "./styles"

interface LogOutInterface {
  currentUser: string
}

function LogOut({ currentUser }: LogOutInterface) {
  const router = useRouter()

  const logOut = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    localStorage.removeItem("id")
    localStorage.removeItem("permissions")
    router.replace("/")
  }

  return (
    <Container>
      <Title>@{currentUser}</Title>
      <LogOutButton onClick={logOut}>{texts.logout}</LogOutButton>
    </Container>
  )
}

export default LogOut
