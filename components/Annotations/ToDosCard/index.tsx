import React, { useContext } from "react"
import { AnnotationsContext } from "contexts/Annotations"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"
import annotationTexts from "strings/annotations.json"
import Card from "../Card"
import TodoItem from "./TodoItem"
import { NoInfoToShow } from "../styles"

function ToDosCard() {
  const { toDosPagination, setToDosPagination, todos } = useContext(
    AnnotationsContext,
  )

  const goNext = () => {
    if (toDosPagination.total > toDosPagination.current) {
      setToDosPagination({
        ...toDosPagination,
        current: toDosPagination.current + 1,
      })
    }
  }
  const goPrev = () => {
    if (toDosPagination.current > 1) {
      setToDosPagination({
        ...toDosPagination,
        current: toDosPagination.current - 1,
      })
    }
  }

  return (
    <Card
      title={annotationTexts.pending}
      type="todo"
      currentPage={toDosPagination.current}
      totalPages={toDosPagination.total}
      onClickNext={goNext}
      onClickBack={goPrev}
    >
      {todos.length ? (
        todos.map((todo: AnnotationsInterface) => (
          <TodoItem key={todo.id} annotation={todo} />
        ))
      ) : (
        <NoInfoToShow>
          No hay tareas para mostrar
          <span>Crea una tarea para empezar a visualizarlas</span>
        </NoInfoToShow>
      )}
    </Card>
  )
}

export default ToDosCard
