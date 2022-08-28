import ReactDOM from "react-dom"
import React, { RefObject } from "react"
import TextButton from "components/UI/TextButton"
import {
  Overlay,
  Modal,
  ModalCard,
  CardContainer,
  Title,
  Content,
  FormMessage,
  ButtonContainer,
} from "./styles"

interface ModalResponseInterface {
  title: string
  dynamicContent?: string
  isRequired?: string
  disabledButton?: boolean
  cancelFunction?: () => void
  submit?: (arg?: any) => void
  submitButtonContent?: string
  cancelButtonContent?: string
  children: JSX.Element[] | JSX.Element
  reference?: RefObject<HTMLButtonElement>
}

const ModalForm: React.FC<ModalResponseInterface> = ({
  title,
  dynamicContent,
  disabledButton,
  isRequired,
  cancelFunction,
  submit,
  cancelButtonContent,
  submitButtonContent,
  children,
  reference,
}) => {
  return ReactDOM.createPortal(
    <>
      <Overlay />
      <Modal>
        <ModalCard>
          <CardContainer>
            <Title>{title}</Title>
            <Content>{dynamicContent}</Content>
            <FormMessage>{isRequired}</FormMessage>
            <form>
              {children}
              <ButtonContainer>
                <TextButton
                  content={cancelButtonContent}
                  onClick={cancelFunction}
                />
                <TextButton
                  content={submitButtonContent}
                  cta
                  onClick={submit}
                  disabled={disabledButton}
                  reference={reference}
                />
              </ButtonContainer>
            </form>
          </CardContainer>
        </ModalCard>
      </Modal>
    </>,
    document.getElementById("overlay"),
  )
}

export default ModalForm
