import React, { useState, useEffect, useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import NotificationsProvider from "contexts/Notifications"
import { useRouter } from "next/router"
import routes from "routes"
import Tooltip from "components/UI/Tooltip"
import NotificationPop from "components/UI/NotificationPop"
import LogOut from "./LogOut"
import Notifications from "./Notifications"

import {
  HeaderContainer,
  ProfilePicture,
  HeaderContent,
  Sections,
  SectionTitle,
  SubMenu,
  SubButton,
  List,
  RightSection,
} from "./styles"

function Header() {
  const { hasChanges, setModalHasChanges } = useContext(PartnersContext)

  const router = useRouter()
  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections

  const [currentUser, setCurrentUser] = useState<string>("")

  const [openLogOut, setOpenLogOut] = useState<boolean>(false)

  const [openPop, setOpenPop] = useState<boolean>(false)

  window.setInterval(() => {
    const date = new Date()
    if (date.getHours() === 20 && date.getMinutes() === 0) {
      setOpenPop(true)
    }
  }, 60000)

  const [menus, setMenus] = useState<
    {
      name: string
      value: boolean
    }[]
  >([])

  const setAmountOfMenus = () => {
    const finalMenuArray = []
    routes.map(route =>
      finalMenuArray.push({
        name: route.route,
        value: false,
      }),
    )

    setMenus(finalMenuArray)
  }

  useEffect(() => {
    setAmountOfMenus()
  }, [])

  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"))
  }, [])

  return (
    <HeaderContainer>
      {openPop ? <NotificationPop closePop={() => setOpenPop(false)} /> : <></>}
      <HeaderContent>
        <Sections>
          <img alt="logo" src="logo.png" />
          {menus.length &&
            routes.map((route, mayorIndex) => (
              <SectionTitle
                key={route.name}
                onClick={() => {
                  const newArrOfMenu = []
                  const filterMenu = menus.filter(
                    menu => menu.name === route.route,
                  )
                  filterMenu[0].value = !filterMenu[0].value
                  const otherMenus = menus.filter(
                    menu => menu.name !== route.route,
                  )
                  otherMenus.forEach(menu =>
                    newArrOfMenu.push({ name: menu.name, value: false }),
                  )
                  setMenus([...newArrOfMenu, filterMenu[0]])
                }}
                bold={router.asPath.includes(`${route.route}`)}
              >
                {route.name}
                {menus.filter(menu => menu.name === route.route)[0].value && (
                  <SubMenu>
                    {route.queries.map((query, minorIndex) => (
                      <List key={query.query}>
                        {permissions[mayorIndex].sub_sections[minorIndex]
                          .view && (
                          <SubButton
                            type="button"
                            selectedSection={
                              router.asPath === `/${route.route}${query.query}`
                            }
                            onClick={() => {
                              if (hasChanges && router.route === "/home") {
                                setModalHasChanges(true)
                              } else {
                                router.replace(`/${route.route}${query.query}`)
                              }
                            }}
                          >
                            <p>{query.name}</p>
                          </SubButton>
                        )}
                      </List>
                    ))}
                  </SubMenu>
                )}
              </SectionTitle>
            ))}
        </Sections>
        <RightSection>
          <NotificationsProvider>
            <Notifications />
          </NotificationsProvider>
          <Tooltip title={currentUser} placement="bottom-end">
            <ProfilePicture onClick={() => setOpenLogOut(!openLogOut)}>
              {currentUser.length && currentUser.substring(0, 1).toUpperCase()}
            </ProfilePicture>
          </Tooltip>
        </RightSection>
      </HeaderContent>

      {openLogOut && <LogOut currentUser={currentUser} />}
    </HeaderContainer>
  )
}

export default Header
