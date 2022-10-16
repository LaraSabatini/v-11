import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { PartnersContext } from "contexts/Partners"
import { StoreContext } from "contexts/Store"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import storeTexts from "strings/store.json"
import financeTexts from "strings/finances.json"
import Tooltip from "components/UI/Tooltip"
import LogOut from "./LogOut"
import {
  HeaderContainer,
  ProfilePicture,
  HeaderContent,
  Sections,
  SectionTitle,
  ClientsMenu,
  SubButton,
} from "./styles"

function Header() {
  const router = useRouter()
  const { hasChanges, setModalHasChanges, setDetailState } = useContext(
    PartnersContext,
  )
  const { setModalStockHasChanges, stockChanges } = useContext(StoreContext)
  const [currentUser, setCurrentUser] = useState<string>("")

  const [openLogOut, setOpenLogOut] = useState<boolean>(false)

  const [clientsMenuOpen, setClientsMenuOpen] = useState<boolean>(false)
  const [trainersMenuOpen, setTrainersMenuOpen] = useState<boolean>(false)
  const [storeMenuOpen, setStoreMenuOpen] = useState<boolean>(false)
  const [financesMenuOpen, setFinancesMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"))
  }, [])

  return (
    <HeaderContainer>
      <HeaderContent>
        <Sections>
          <SectionTitle
            onClick={() => {
              setClientsMenuOpen(!clientsMenuOpen)
              setTrainersMenuOpen(false)
              setStoreMenuOpen(false)
              setFinancesMenuOpen(false)
            }}
            bold={router.asPath.substring(1, 5) === "home"}
          >
            {generalTexts.sections.home}
            {clientsMenuOpen && (
              <ClientsMenu>
                <SubButton
                  type="button"
                  selectedSection={router.query.clients === "true"}
                  onClick={() => {
                    if (router.asPath.substring(1, 5) === "home") {
                      if (hasChanges) {
                        setModalHasChanges(true)
                      } else {
                        setDetailState("view")
                        router.replace("/home?clients=true")
                      }
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/home?clients=true")
                    }
                  }}
                >
                  {generalTexts.sections.home}
                </SubButton>
                <SubButton
                  selectedSection={router.query.prices === "true"}
                  type="button"
                  onClick={() => {
                    if (router.asPath.substring(1, 5) === "home") {
                      if (hasChanges) {
                        setModalHasChanges(true)
                      } else {
                        setDetailState("view")
                        router.replace("/home?prices=true")
                      }
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/home?prices=true")
                    }
                  }}
                >
                  {generalTexts.sections.prices}
                </SubButton>
              </ClientsMenu>
            )}
          </SectionTitle>
          <SectionTitle
            onClick={() => {
              setTrainersMenuOpen(!trainersMenuOpen)
              setClientsMenuOpen(false)
              setStoreMenuOpen(false)
              setFinancesMenuOpen(false)
            }}
            bold={router.asPath.substring(1, 9) === "trainers"}
          >
            {generalTexts.sections.trainers}
            {trainersMenuOpen && (
              <ClientsMenu>
                <SubButton
                  selectedSection={router.query.calendar === "true"}
                  type="button"
                  onClick={() => {
                    if (router.asPath === "/home" && hasChanges) {
                      setModalHasChanges(true)
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/trainers?calendar=true")
                    }
                  }}
                >
                  {trainerTexts.calendar}
                </SubButton>
              </ClientsMenu>
            )}
          </SectionTitle>
          <SectionTitle
            onClick={() => {
              setStoreMenuOpen(!storeMenuOpen)
              setTrainersMenuOpen(false)
              setClientsMenuOpen(false)
              setFinancesMenuOpen(false)
            }}
            bold={router.asPath.substring(1, 6) === "store"}
          >
            {generalTexts.sections.store}
            {storeMenuOpen && (
              <ClientsMenu>
                <SubButton
                  type="button"
                  selectedSection={router.query.store === "true"}
                  onClick={() => {
                    if (router.asPath === "/home" && hasChanges) {
                      setModalHasChanges(true)
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/store?store=true")
                    }
                  }}
                >
                  {generalTexts.sections.store}
                </SubButton>
                <SubButton
                  selectedSection={router.query.stock === "true"}
                  type="button"
                  onClick={() => {
                    if (router.asPath === "/home" && hasChanges) {
                      setModalHasChanges(true)
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/store?stock=true")
                    }
                  }}
                >
                  {storeTexts.stock}
                </SubButton>
              </ClientsMenu>
            )}
          </SectionTitle>
          <SectionTitle
            onClick={() => {
              setFinancesMenuOpen(!financesMenuOpen)
              setStoreMenuOpen(false)
              setTrainersMenuOpen(false)
              setClientsMenuOpen(false)
            }}
            bold={router.asPath.substring(1, 9) === "finances"}
          >
            {generalTexts.sections.finances}

            {financesMenuOpen && (
              <ClientsMenu>
                <SubButton
                  type="button"
                  selectedSection={router.query.billing === "true"}
                  onClick={() => {
                    if (router.asPath === "/home" && hasChanges) {
                      setModalHasChanges(true)
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/finances?billing=true")
                    }
                  }}
                >
                  {financeTexts.boulderEarnings}
                </SubButton>
                <SubButton
                  selectedSection={router.query.expenses === "true"}
                  type="button"
                  onClick={() => {
                    if (router.asPath === "/home" && hasChanges) {
                      setModalHasChanges(true)
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/finances?expenses=true")
                    }
                  }}
                >
                  {financeTexts.bills}
                </SubButton>
                <SubButton
                  selectedSection={router.query.workingHours === "true"}
                  type="button"
                  onClick={() => {
                    if (router.asPath === "/home" && hasChanges) {
                      setModalHasChanges(true)
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/finances?workingHours=true")
                    }
                  }}
                >
                  {financeTexts.workingHours}
                </SubButton>
                <SubButton
                  selectedSection={router.query.earnings === "true"}
                  type="button"
                  onClick={() => {
                    if (router.asPath === "/home" && hasChanges) {
                      setModalHasChanges(true)
                    } else if (router.asPath === "/store" && stockChanges) {
                      setModalStockHasChanges(true)
                    } else {
                      router.replace("/finances?earnings=true")
                    }
                  }}
                >
                  {financeTexts.earnings}
                </SubButton>
              </ClientsMenu>
            )}
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
