import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  position: relative;
  font-family: ${theme.fonts.primary};
`

const NotificationList = styled.div`
  position: absolute;
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  z-index: 500;
  box-shadow: 0px 0px 20px 5px rgba(59, 0, 135, 0.1);
  top: 35px;
  padding: 15px;
  right: 0px;
`

const ButtonNotification = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`

const Dot = styled.div`
  background-color: #ff6363;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: absolute;
  right: 3px;
`

const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`

export {
  Container,
  NotificationList,
  ButtonNotification,
  Dot,
  NotificationsContainer,
}
