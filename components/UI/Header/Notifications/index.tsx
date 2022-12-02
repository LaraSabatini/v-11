/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react"
import { NotificationsContext } from "contexts/Notifications"
import NotificationsInterface from "interfaces/notifications/notificationInterface"
import { getTodosByDone } from "services/Annotations/Annotations.service"
import { getProductsWithLowStock } from "services/Store/Products.service"
import Icon from "components/UI/Assets/Icon"
import ScrollView from "components/UI/ScrollView"
import Notification from "./Notification"
import {
  Container,
  NotificationList,
  ButtonNotification,
  Dot,
  NotificationsContainer,
} from "./styles"

function Notifications() {
  const { setNotifications, notifications } = useContext(NotificationsContext)

  const [openNotifications, setOpenNotifications] = useState<boolean>(false)

  const formatData = (type: "stock" | "todo", content: any[]) => {
    const notificationsList: NotificationsInterface[] = []
    if (type === "stock") {
      content.map((item, index) =>
        notificationsList.push({
          id: index * 2,
          type,
          title: "Stock Bajo",
          description: `El producto: ${item.name} tiene un stock de ${item.stock}.`,
          url: "/store?stock=true",
          read: false,
        }),
      )
    } else {
      notificationsList.push({
        id: 100,
        type,
        title: "Pendientes",
        description: `Hay ${content.length} tareas pendientes.`,
        url: "/annotations?notes=true",
        read: false,
      })
    }
    return notificationsList
  }

  const setNotificationsData = async () => {
    const products = await getProductsWithLowStock(10, 1)
    const stockNotifications =
      products.data.length > 0 ? formatData("stock", products.data) : []

    const todos = await getTodosByDone(1, 0)
    const todosNotifications =
      todos.data.length > 0 ? formatData("todo", todos.data) : []

    setNotifications(stockNotifications.concat(todosNotifications))
  }

  useEffect(() => {
    setNotificationsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {notifications.length ? <Dot /> : <></>}
      <ButtonNotification
        type="button"
        onClick={() => setOpenNotifications(!openNotifications)}
      >
        <Icon icon="IconNotifications" color="#fff" />
      </ButtonNotification>
      {openNotifications && (
        <NotificationList>
          <ScrollView height={200}>
            <NotificationsContainer>
              {notifications.map((notification: NotificationsInterface) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </NotificationsContainer>
          </ScrollView>
        </NotificationList>
      )}
    </Container>
  )
}

export default Notifications
