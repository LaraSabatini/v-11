import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { PartnersContext } from "contexts/Partners"
import { StoreContext } from "contexts/Store"
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
  const { setModalStockHasChanges, stockChanges } = useContext(StoreContext)
  const [currentUser, setCurrentUser] = useState<string>("")

  const [openLogOut, setOpenLogOut] = useState<boolean>(false)

  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"))
  }, [])

  return (
    <HeaderContainer>
      <HeaderContent>
        <Sections>
          <SectionTitle
            onClick={() => {
              if (router.asPath === "/home") {
                if (hasChanges) {
                  setModalHasChanges(true)
                } else {
                  setDetailState("view")
                }
              } else if (router.asPath === "/store" && stockChanges) {
                setModalStockHasChanges(true)
              } else {
                router.replace("/home")
              }
            }}
            bold={router.asPath.substring(1, 10) === "home"}
          >
            {texts.sections.home}
          </SectionTitle>
          <SectionTitle
            onClick={() => {
              if (router.asPath === "/home" && hasChanges) {
                setModalHasChanges(true)
              } else if (router.asPath === "/store" && stockChanges) {
                setModalStockHasChanges(true)
              } else {
                router.replace("/trainers")
              }
            }}
            bold={router.asPath.substring(1, 10) === "trainers"}
          >
            {texts.sections.trainers}
          </SectionTitle>
          <SectionTitle
            onClick={() => {
              if (router.asPath === "/home" && hasChanges) {
                setModalHasChanges(true)
              } else if (router.asPath === "/store" && stockChanges) {
                setModalStockHasChanges(true)
              } else {
                router.replace("/store")
              }
            }}
            bold={router.asPath.substring(1, 10) === "store"}
          >
            {texts.sections.store}
          </SectionTitle>
          <SectionTitle
            onClick={() => {
              if (router.asPath === "/home" && hasChanges) {
                setModalHasChanges(true)
              } else if (router.asPath === "/store" && stockChanges) {
                setModalStockHasChanges(true)
              } else {
                router.replace("/finances")
              }
            }}
            bold={router.asPath.substring(1, 10) === "finances"}
          >
            {texts.sections.finances}
          </SectionTitle>
        </Sections>
        <Tooltip title={currentUser} placement="bottom-end">
          <ProfilePicture
            onClick={() => {
              if (hasChanges) {
                setModalHasChanges(true)
              } else if (stockChanges) {
                setModalStockHasChanges(true)
              } else {
                setOpenLogOut(!openLogOut)
              }
            }}
          >
            {currentUser.length && currentUser.substring(0, 1).toUpperCase()}
          </ProfilePicture>
        </Tooltip>
      </HeaderContent>
      {openLogOut && <LogOut currentUser={currentUser} />}
    </HeaderContainer>
  )
}

export default Header
