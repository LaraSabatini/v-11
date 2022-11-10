import React, { useState, useContext } from "react"
import Checkbox from "components/UI/Checkbox"
import Icon from "components/UI/Assets/Icon"
import { AnnotationsContext } from "contexts/Annotations"
import {
  Item,
  ItemHeader,
  TodoDate,
  SubContent,
  TodoMenu,
  Description,
  TaskTitle,
  Menu,
} from "../../styles"

interface TodoItemInterface {
  id: number
  done: boolean
  title: string
  description: string
  date: string
}

function TodoItem({ id, title, done, date, description }: TodoItemInterface) {
  const { setWarningModal, setAnnotationSelected } = useContext(
    AnnotationsContext,
  )

  const [menu, setMenu] = useState<boolean>(false)

  return (
    <Item>
      <ItemHeader>
        <SubContent>
          <Checkbox checked={done} idParam="done" />
          <TaskTitle done={done}>{title}</TaskTitle>
        </SubContent>
        <SubContent>
          <TodoDate>{date}</TodoDate>
          <TodoMenu onClick={() => setMenu(!menu)}>
            <Icon icon="IconSeeMore" />
            {menu && (
              <Menu>
                <button type="button">Editar</button>
                <button
                  type="button"
                  onClick={() => {
                    setAnnotationSelected(id)
                    setWarningModal({
                      status: `alert`,
                      icon: `IconAlert`,
                      title:
                        "Estas seguro de que deseas eliminar la tarea/nota?",
                      content: "Se eliminara su registro de la base de datos.",
                    })
                  }}
                >
                  Eliminar
                </button>
              </Menu>
            )}
          </TodoMenu>
        </SubContent>
      </ItemHeader>
      <Description done={done}>{description}</Description>
    </Item>
  )
}

export default TodoItem
