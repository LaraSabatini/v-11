import { createContext, useState, useMemo } from "react"
import NotificationsInterface from "interfaces/notifications/notificationInterface"

export const NotificationsContext = createContext(null)

function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState<NotificationsInterface[]>(
    [],
  )

  const value = useMemo(
    () => ({
      notifications,
      setNotifications,
    }),
    [notifications],
  )

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider
