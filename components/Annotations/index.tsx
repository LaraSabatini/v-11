import React, { useContext } from "react"
// DATA STORAGE & TYPES
import PartnersProvider from "contexts/Partners"
import generalTexts from "strings/general.json"
import annotationTexts from "strings/annotations.json"
import { AnnotationsContext } from "contexts/Annotations"
// COMPONENTS & STYLING
import ModalAlert from "components/UI/ModalAlert"
import Header from "components/UI/Header"
import {
  MainContainer,
  Content,
  HeadContent,
  Title,
} from "theme/globalComponentStyles"
import ToDosCard from "./ToDosCard"
import NotesCard from "./NotesCard"
import { CardsContainer } from "./styles"

function AnnotationsView() {
  const {
    warningModal,
    setWarningModal,
    // annotationSelected
  } = useContext(AnnotationsContext)

  const deleteAnnotation = () => {
    // annotationSelected
  }

  return (
    <MainContainer>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Content>
        {warningModal !== null && (
          <ModalAlert
            success={false}
            message={warningModal}
            closeModal={() => setWarningModal(null)}
            closeRefresh={() => setWarningModal(null)}
            mainButtonContent={generalTexts.actions.confirm}
            secondButtonContent={generalTexts.actions.cancel}
            mainAction={deleteAnnotation}
            isNotice
          />
        )}
        <HeadContent>
          <Title>
            {generalTexts.sections.annotations}
            <span>
              {" / "}
              {annotationTexts.notes}
            </span>
          </Title>
        </HeadContent>
        <CardsContainer>
          <ToDosCard />
          <NotesCard />
        </CardsContainer>
      </Content>
    </MainContainer>
  )
}

export default AnnotationsView
