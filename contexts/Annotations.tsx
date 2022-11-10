import { createContext, useState, useMemo, useRef } from "react"
import DefaultInterface from "interfaces/components/DefaultInterface"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"

export const AnnotationsContext = createContext(null)

function AnnotationsProvider({ children }) {
  const [filterSelected, setFilterSelected] = useState<DefaultInterface>({
    id: 3,
    display_name: "All",
  })
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC")

  const [todos, setTodos] = useState<AnnotationsInterface[]>([])
  const [notes, setNotes] = useState<AnnotationsInterface[]>([])

  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(0)

  const [
    annotationSelected,
    setAnnotationSelected,
  ] = useState<AnnotationsInterface>(null)

  const [newAnnotation, setNewAnnotation] = useState<AnnotationsInterface>({
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

  const [warningModal, setWarningModal] = useState<{
    status: string
    icon: string
    title: string
    content: string
  } | null>(null)

  const [editModal, setEditModal] = useState<boolean>(false)

  const [toDosPagination, setToDosPagination] = useState<{
    current: number
    total: number
  }>({
    current: 1,
    total: 1,
  })
  const [notesPagination, setNotesPagination] = useState<{
    current: number
    total: number
  }>({
    current: 1,
    total: 1,
  })

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const typeRef = useRef(null)

  const [modalResponse, setModalResponse] = useState<{
    success: boolean
    message: { status: string; icon: string; title: string; content: string }
  } | null>(null)

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cleanStates = () => {
    setModalResponse(null)
    setTriggerListUpdate(triggerListUpdate + 1)
    setEditModal(null)
    setOpenCreateModal(null)
  }

  const value = useMemo(
    () => ({
      filterSelected,
      setFilterSelected,
      order,
      setOrder,
      todos,
      setTodos,
      notes,
      setNotes,
      newAnnotation,
      setNewAnnotation,
      warningModal,
      setWarningModal,
      annotationSelected,
      setAnnotationSelected,
      editModal,
      setEditModal,
      toDosPagination,
      setToDosPagination,
      notesPagination,
      setNotesPagination,
      titleRef,
      descriptionRef,
      modalResponse,
      setModalResponse,
      cleanStates,
      triggerListUpdate,
      setTriggerListUpdate,
      openCreateModal,
      setOpenCreateModal,
      typeRef,
    }),
    [
      filterSelected,
      order,
      todos,
      notes,
      newAnnotation,
      setNewAnnotation,
      warningModal,
      annotationSelected,
      editModal,
      toDosPagination,
      notesPagination,
      modalResponse,
      triggerListUpdate,
      cleanStates,
      openCreateModal,
    ],
  )

  return (
    <AnnotationsContext.Provider value={value}>
      {children}
    </AnnotationsContext.Provider>
  )
}

export default AnnotationsProvider
