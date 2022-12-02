export default interface NotificationsInterface {
  id: number
  title: string
  description: string
  type: "stock" | "todo" | "close till"
  url: string
  read: boolean
}
