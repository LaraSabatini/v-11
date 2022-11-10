import React, { useState } from "react"
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

interface NoteItemInterface {
  title: string
  description: string
  date: string
}

function NoteItem({ title, date, description }: NoteItemInterface) {
  const [menu, setMenu] = useState<boolean>(false)

  return (
    <Item>
      <ItemHeader>
        <SubContent>
          <TaskTitle>{title}</TaskTitle>
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
      <Description>{description}</Description>
    </Item>
  )
}

export default NoteItem
