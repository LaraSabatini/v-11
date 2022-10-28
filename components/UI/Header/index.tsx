import React, { useState, useEffect, useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import { useRouter } from "next/router"
import routes from "routes"
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
  const { hasChanges, setModalHasChanges } = useContext(PartnersContext)

  const router = useRouter()
  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections

  const [currentUser, setCurrentUser] = useState<string>("")

  const [openLogOut, setOpenLogOut] = useState<boolean>(false)

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
      <HeaderContent>
        <Sections>
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
                  <ClientsMenu>
                    {route.queries.map((query, minorIndex) => (
                      <div>
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
                            {query.name}
                          </SubButton>
                        )}
                      </div>
                    ))}
                  </ClientsMenu>
                )}
              </SectionTitle>
            ))}
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
