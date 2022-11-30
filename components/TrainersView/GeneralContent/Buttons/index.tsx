import React from "react"
import { ButtonContainer } from "./styles"
import CreateButton from "./CreateButton"
import EditButton from "./EditButton"

interface ButtonsInterface {
  routeIsCalendar: boolean
  permits: {
    create: boolean
    update: boolean
  }
}

function Buttons({ routeIsCalendar, permits }: ButtonsInterface) {
  return (
    <ButtonContainer>
      {routeIsCalendar && <EditButton edit={permits.update} />}
      <CreateButton create={permits.create} />
    </ButtonContainer>
  )
}

export default Buttons
