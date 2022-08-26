import React from "react"
import { useRouter } from "next/router"
import texts from "strings/general.json"
import Tooltip from "components/UI/Tooltip"
import {
  HeaderContainer,
  ProfilePicture,
  HeaderContent,
  Sections,
  SectionTitle,
} from "./styles"

function Header() {
  const router = useRouter()

  const currentUser = localStorage.getItem("user")

  return (
    <HeaderContainer>
      <HeaderContent>
        <Sections>
          <SectionTitle bold={router.asPath.substring(1, 10) === "home"}>
            {texts.sections.home}
          </SectionTitle>
          <SectionTitle bold={router.asPath.substring(1, 10) === "trainers"}>
            {texts.sections.trainers}
          </SectionTitle>
          <SectionTitle bold={router.asPath.substring(1, 10) === "store"}>
            {texts.sections.store}
          </SectionTitle>
          <SectionTitle bold={router.asPath.substring(1, 10) === "finances"}>
            {texts.sections.finances}
          </SectionTitle>
        </Sections>
        <Tooltip title={currentUser} placement="bottom-end">
          <ProfilePicture>
            {currentUser.substring(0, 1).toUpperCase()}
          </ProfilePicture>
        </Tooltip>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
