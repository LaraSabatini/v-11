import React from "react"
import { useRouter } from "next/router"
import NotificationsInterface from "interfaces/notifications/notificationInterface"
import { Container, Name, Description } from "./styles"

interface NotificationInterface {
  notification: NotificationsInterface
}

function Notification({ notification }: NotificationInterface) {
  const router = useRouter()

  return (
    <Container
      onClick={() => {
        router.replace(`${notification.url}`)
      }}
    >
      <Name>{notification.title}</Name>
      <Description>{notification.description}</Description>
    </Container>
  )
}

export default Notification
