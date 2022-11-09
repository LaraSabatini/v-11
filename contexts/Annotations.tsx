import { createContext, useState, useMemo } from "react"
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
    }),
    [filterSelected, order, todos, notes, newAnnotation, setNewAnnotation],
  )

  return (
    <AnnotationsContext.Provider value={value}>
      {children}
    </AnnotationsContext.Provider>
  )
}

export default AnnotationsProvider
