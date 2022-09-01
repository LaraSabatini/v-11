import React from "react"
import ReactDOM from "react-dom"

import theme from "theme/index"
import {
  Overlay,
  Modal,
  ModalCard,
  CardContainer,
  Close,
  AlertContainer,
  AlertIcon,
  ContentWrapper,
  ButtonsWrapper,
} from "./styles"
import Icon from "../Assets/Icon"
import TextButton from "../TextButton"

interface ModalResponseInterface {
  success: boolean
  message: {
    status: string
    icon: string
    title: string
    content: string
  }
  isNotice?: boolean
  singleAction?: boolean
  isCta?: boolean
  singleButtonContent?: string
  mainButtonContent?: string
  secondButtonContent?: string
  closeModal?: (arg?: any) => void
  closeRefresh?: (arg?: any) => void
  mainAction?: (arg?: any) => void
}

const ModalAlert: React.FC<ModalResponseInterface> = ({
  success,
  message,
  isNotice,
  singleAction,
  isCta,
  singleButtonContent,
  mainButtonContent,
  secondButtonContent,
  closeModal,
  closeRefresh,
  mainAction,
}) => {
  return ReactDOM.createPortal(
    <>
      <Overlay />
      <Modal>
        <ModalCard>
          <CardContainer>
            {!isNotice && !singleAction && (
              <Close onClick={success ? closeRefresh : closeModal}>
                <Icon icon="IconMenuOff" color="#c8c8c8" />
              </Close>
            )}
            <AlertContainer status={message?.status}>
              <AlertIcon status={message?.status}>
                <Icon icon={message?.icon} color={theme.colors.white} />
              </AlertIcon>
            </AlertContainer>
            <ContentWrapper status={message?.status}>
              <h3>{message?.title}</h3>
              <div>
                <p>{message?.content}</p>
              </div>
            </ContentWrapper>
            {isNotice && (
              <ButtonsWrapper singleAction={singleAction}>
                <TextButton
                  content={secondButtonContent}
                  onClick={closeModal}
                />
                <TextButton
                  cta
                  content={mainButtonContent}
                  onClick={mainAction}
                />
              </ButtonsWrapper>
            )}
            {singleAction && (
              <ButtonsWrapper singleAction={singleAction}>
                {isCta ? (
                  <TextButton
                    cta
                    content={singleButtonContent}
                    onClick={mainAction}
                  />
                ) : (
                  <TextButton
                    content={singleButtonContent}
                    onClick={mainAction}
                  />
                )}
              </ButtonsWrapper>
            )}
          </CardContainer>
        </ModalCard>
      </Modal>
    </>,
    document.getElementById("overlay"),
  )
}

export default ModalAlert
