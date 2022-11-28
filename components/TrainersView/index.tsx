import React from "react"
import { useRouter } from "next/router"
import Header from "components/UI/Header"
import PartnersProvider from "contexts/Partners"
import HeadingContent from "./HeadingContent"
import NoPermissionsView from "./GeneralContent/NoPermissionsView"
import Calendar from "./Calendar"
import Students from "./Students"
import Buttons from "./GeneralContent/Buttons"
import { Container } from "./styles"

function TrainersView() {
  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[1]
  const canViewCalendar = permissions.sub_sections[0].view
  const canViewStudents = permissions.sub_sections[1].view

  const routeIsCalendar = router.query.calendar === "true"
  const routeIsStudents = router.query.students === "true"
  const calendarActions = permissions.sub_sections[0].actions

  return (
    <div>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Container>
        <HeadingContent />

        {routeIsCalendar && canViewCalendar && <Calendar />}
        {routeIsStudents && canViewStudents && <Students />}

        {((routeIsStudents && !canViewStudents) ||
          (routeIsCalendar && !canViewCalendar)) && <NoPermissionsView />}

        {canViewCalendar && (
          <Buttons
            routeIsCalendar={routeIsCalendar}
            permits={{
              create: calendarActions.create,
              update: calendarActions.update,
            }}
          />
        )}
      </Container>
    </div>
  )
}

export default TrainersView
