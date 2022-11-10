import React, { useContext } from "react"
import { AnnotationsContext } from "contexts/Annotations"
import Card from "../Card"
import TodoItem from "./TodoItem"

function ToDosCard() {
  const { toDosPagination, setToDosPagination } = useContext(AnnotationsContext)

  const goNext = () => {
    if (toDosPagination.total < toDosPagination.current) {
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
      title="Pendientes"
      type="todo"
      currentPage={toDosPagination.current}
      totalPages={toDosPagination.total}
      onClickNext={goNext}
      onClickBack={goPrev}
    >
      <TodoItem
        annotation={{
          id: 1,
          title: "Tarea",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam magni voluptatibus perferendis dignissimos, unde dolore!",
          creation_date: "11-20-2022",
          type: "todo",
          done: 0,
          done_date: "09-11-2022",
          created_by: 0,
          done_by: 0,
        }}
      />
      <TodoItem
        annotation={{
          id: 1,
          title: "Tarea",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam magni voluptatibus perferendis dignissimos, unde dolore!",
          creation_date: "11-20-2022",
          type: "todo",
          done: 1,
          done_date: "09-11-2022",
          created_by: 0,
          done_by: 0,
        }}
      />
    </Card>
  )
}

export default ToDosCard
