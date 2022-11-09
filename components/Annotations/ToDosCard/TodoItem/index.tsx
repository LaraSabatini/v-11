import React, { useState } from "react"
import Checkbox from "components/UI/Checkbox"
import Icon from "components/UI/Assets/Icon"
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
  done: boolean
  title: string
  description: string
  date: string
}

function TodoItem({ title, done, date, description }: TodoItemInterface) {
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
                <p>Editar</p>
                <p>Eliminar</p>
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
