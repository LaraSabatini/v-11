import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { PartnersContext } from "contexts/Partners"
import texts from "strings/general.json"
import Tooltip from "components/UI/Tooltip"
import LogOut from "./LogOut"
import {
  HeaderContainer,
  ProfilePicture,
  HeaderContent,
  Sections,
  SectionTitle,
} from "./styles"

function Header() {
  const router = useRouter()
  const { hasChanges, setModalHasChanges, setDetailState } = useContext(
    PartnersContext,
  )
  const [currentUser, setCurrentUser] = useState<string>("")

  const [openLogOut, setOpenLogOut] = useState<boolean>(false)

  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"))
  }, [])

  return (
    <HeaderContainer
      onClick={() => {
        if (hasChanges) {
          setModalHasChanges(true)
        } else if (router.asPath === "/home") {
          setDetailState("view")
        }
      }}
    >
      <HeaderContent>
        <Sections>
          <SectionTitle
            href="/home"
            bold={router.asPath.substring(1, 10) === "home"}
          >
            {texts.sections.home}
          </SectionTitle>
          <SectionTitle
            href="/trainers"
            bold={router.asPath.substring(1, 10) === "trainers"}
          >
            {texts.sections.trainers}
          </SectionTitle>
          <SectionTitle
            href="/store"
            bold={router.asPath.substring(1, 10) === "store"}
          >
            {texts.sections.store}
          </SectionTitle>
          <SectionTitle
            href="/finances"
            bold={router.asPath.substring(1, 10) === "finances"}
          >
            {texts.sections.finances}
          </SectionTitle>
        </Sections>
        <Tooltip title={currentUser} placement="bottom-end">
          <ProfilePicture onClick={() => setOpenLogOut(!openLogOut)}>
            {currentUser.length && currentUser.substring(0, 1).toUpperCase()}
          </ProfilePicture>
        </Tooltip>
      </HeaderContent>
      {openLogOut && <LogOut currentUser={currentUser} />}
    </HeaderContainer>
  )
}

export default Header
