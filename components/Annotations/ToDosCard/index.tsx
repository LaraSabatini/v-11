import React from "react"
import Card from "../Card"
import TodoItem from "./TodoItem"

function ToDosCard() {
  return (
    <Card title="Pendientes" type="todo">
      <TodoItem
        id={1}
        done={false}
        title="Nombre de tarea"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam magni
        voluptatibus perferendis dignissimos, unde dolore!"
        date="09/11/2022"
      />
      <TodoItem
        id={2}
        done
        title="Nombre de tarea"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam magni
        voluptatibus perferendis dignissimos, unde dolore!"
        date="09/11/2022"
      />
    </Card>
  )
}

export default ToDosCard
