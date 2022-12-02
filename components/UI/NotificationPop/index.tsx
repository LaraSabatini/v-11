import React from "react"
import notificationTexts from "strings/notifications.json"
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
      <p className="title">{notificationTexts.notificationPop.title}</p>
      <p className="description">
        {notificationTexts.notificationPop.description}
      </p>
    </Container>
  )
}

export default NotificationPop
