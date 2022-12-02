import React from "react"
import Icon from "components/UI/Assets/Icon"
import Container from "./styles"

interface PopInterface {
  closePop: (arg?: any) => void
}

function NotificationPop({ closePop }: PopInterface) {
  return (
    <Container>
      <button type="button" onClick={closePop}>
        <Icon icon="IconMenuOff" />
      </button>
      <p className="title">Recordatorio:</p>
      <p className="description">Recuerda cerrar la caja al final del turno.</p>
    </Container>
  )
}

export default NotificationPop
