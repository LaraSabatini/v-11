/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react"
// SERVICES
import { getAllTodos, getNotes } from "services/Annotations/Annotations.service"
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
import EditAnnotation from "./EditAnnotation"
import ToDosCard from "./ToDosCard"
import NotesCard from "./NotesCard"
import { CardsContainer } from "./styles"

function AnnotationsView() {
  const {
    warningModal,
    setWarningModal,
    setAnnotationSelected,
    editModal,
    setEditModal,
    toDosPagination,
    setToDosPagination,
    setNotesPagination,
    notesPagination,
    order,
    setTodos,
    setNotes,
  } = useContext(AnnotationsContext)

  const deleteAnnotation = () => {
    // annotationSelected
  }

  const editAnnotation = () => {
    // edit annotation
  }

  const cancelEdition = () => {
    setEditModal(false)
    setAnnotationSelected(null)
  }

  const fillDataForTodos = async () => {
    const getTodosCall = await getAllTodos(toDosPagination.current)
    setTodos(getTodosCall.data)

    setToDosPagination({
      ...toDosPagination,
      total: getTodosCall.meta.totalPages,
    })
  }

  const fillDataForNotes = async () => {
    const getNotesCall = await getNotes(notesPagination.current, order)
    setNotes(getNotesCall.data)
    setNotesPagination({
      ...notesPagination,
      total: getNotesCall.meta.totalPages,
    })
  }

  useEffect(() => {
    fillDataForTodos()
  }, [toDosPagination.current])

  useEffect(() => {
    fillDataForNotes()
  }, [notesPagination.current, order])

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
        {editModal && (
          <EditAnnotation
            submitAction={editAnnotation}
            cancelAction={cancelEdition}
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
