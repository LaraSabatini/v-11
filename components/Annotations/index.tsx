/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
// SERVICES
import {
  getAllTodos,
  getNotes,
  createAnnotation,
  getTodosByDone,
  editAnnotation,
  deleteAnnotation,
} from "services/Annotations/Annotations.service"
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
import { day, month, year } from "const/time"
import Icon from "components/UI/Assets/Icon"
import CreateAnnotation from "./CreateAnnotation"
import EditAnnotation from "./EditAnnotation"
import ToDosCard from "./ToDosCard"
import NotesCard from "./NotesCard"
import { CardsContainer, Add, Divider } from "./styles"

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
    modalResponse,
    cleanStates,
    triggerListUpdate,
    openCreateModal,
    setOpenCreateModal,
    setNewAnnotation,
    titleRef,
    descriptionRef,
    newAnnotation,
    setModalResponse,
    filterSelected,
    typeRef,
    annotationSelected,
  } = useContext(AnnotationsContext)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[4].sub_sections[0]

  const [disableCreateButton, setDisableCreateButton] = useState<boolean>(false)
  const [disableEditButton, setDisableEditButton] = useState<boolean>(false)

  const validateInputs = async () => {
    await titleRef.current?.focus()
    await descriptionRef.current?.focus()
    await typeRef.current?.focus()
    await titleRef.current?.focus()

    return (
      titleRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      descriptionRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      typeRef.current.attributes.getNamedItem("data-error").value === "false"
    )
  }

  const deleteAnnotationFunction = async () => {
    const deleteAnn = await deleteAnnotation(annotationSelected.id)

    const success = deleteAnn.message === "Annotation deleted successfully"

    setModalResponse({
      success,
      message: {
        status: success ? "success" : "alert",
        icon: success ? "IconCheckModal" : "IconExclamation",
        title: success
          ? `${annotationTexts.modals.successDelete.title}`
          : `${annotationTexts.modals.errorDelete.title}`,
        content: success
          ? `${annotationTexts.modals.successDelete.content}`
          : `${annotationTexts.modals.errorDelete.content}`,
      },
    })
  }

  const editAnnotationFunction = async e => {
    e.preventDefault()
    setDisableEditButton(true)

    const validate = await validateInputs()

    if (validate) {
      const edit = await editAnnotation(newAnnotation)

      const success = edit.message === "Annotation updated successfully"

      setModalResponse({
        success,
        message: {
          status: success ? "success" : "alert",
          icon: success ? "IconCheckModal" : "IconExclamation",
          title: success
            ? `${annotationTexts.modals.successEdit.title}`
            : `${annotationTexts.modals.errorEdit.title}`,
          content: success
            ? `${annotationTexts.modals.successEdit.content}`
            : `${annotationTexts.modals.errorEdit.content}`,
        },
      })
      setDisableEditButton(false)
    }
  }

  const cancelEdition = () => {
    setEditModal(false)
    setAnnotationSelected(null)
  }

  const createAnnotationFunction = async e => {
    e.preventDefault()
    setDisableCreateButton(true)

    const validate = await validateInputs()

    if (validate) {
      const newAnnotationBody = {
        ...newAnnotation,
        creation_date: `${day}-${month}-${year}`,
        done_date: "",
        done_by: 0,
      }
      const create = await createAnnotation(newAnnotationBody)

      const success = create.message === "Annotation created successfully"

      setModalResponse({
        success,
        message: {
          status: success ? "success" : "alert",
          icon: success ? "IconCheckModal" : "IconExclamation",
          title: success
            ? `${annotationTexts.modals.successCreate.title}`
            : `${annotationTexts.modals.errorCreate.title}`,
          content: success
            ? `${annotationTexts.modals.successCreate.content}`
            : `${annotationTexts.modals.errorCreate.content}`,
        },
      })
      setDisableCreateButton(false)
    }
  }

  const fillDataForTodos = async () => {
    if (filterSelected.id === 3) {
      const getTodosCall = await getAllTodos(toDosPagination.current)
      setTodos(getTodosCall.data)

      setToDosPagination({
        ...toDosPagination,
        total: getTodosCall.meta.totalPages,
      })
    } else {
      const getTodosCall = await getTodosByDone(
        toDosPagination.current,
        filterSelected.id === 1 ? 1 : 0,
      )
      setTodos(getTodosCall.data)

      setToDosPagination({
        ...toDosPagination,
        total: getTodosCall.meta.totalPages,
      })
    }
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
  }, [toDosPagination.current, filterSelected, triggerListUpdate])

  useEffect(() => {
    fillDataForNotes()
  }, [notesPagination.current, order, triggerListUpdate])

  const cancelCreateAnnotation = () => {
    setOpenCreateModal(false)
    setNewAnnotation({
      id: 0,
      title: "",
      description: "",
      creation_date: "",
      type: "todo",
      done: 0,
      done_date: "",
      created_by: parseInt(localStorage.getItem("id"), 10),
      done_by: 0,
    })
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
            mainAction={deleteAnnotationFunction}
            isNotice
          />
        )}
        {editModal && (
          <EditAnnotation
            submitAction={editAnnotationFunction}
            cancelAction={cancelEdition}
            disabledButton={disableEditButton}
          />
        )}
        {modalResponse !== null && (
          <ModalAlert
            success={modalResponse.success}
            message={modalResponse.message}
            closeModal={() => {
              cleanStates()
            }}
            closeRefresh={() => {
              cleanStates()
            }}
          />
        )}
        <HeadContent>
          <Title>
            {generalTexts.sections.annotations}
            {" / "}
            <span>{annotationTexts.notes}</span>
          </Title>
        </HeadContent>
        <Divider />
        <CardsContainer>
          <ToDosCard />
          <NotesCard />
          <Add
            disabled={!permissions.actions.create}
            onClick={() => {
              setOpenCreateModal(true)
            }}
          >
            <Icon icon="IconAdd" color="#fff" />
          </Add>
        </CardsContainer>
      </Content>
      {openCreateModal && (
        <CreateAnnotation
          submitAction={createAnnotationFunction}
          cancelAction={cancelCreateAnnotation}
          disabledButton={disableCreateButton}
        />
      )}
    </MainContainer>
  )
}

export default AnnotationsView
