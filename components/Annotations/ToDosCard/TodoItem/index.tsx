import React, { useState } from "react"
import Checkbox from "components/UI/Checkbox"
import Icon from "components/UI/Assets/Icon"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"
import AnnotationMenu from "../../AnnotationMenu"

import {
  Item,
  ItemHeader,
  TodoDate,
  SubContent,
  TodoMenu,
  Description,
  TaskTitle,
} from "../../styles"

interface TodoItemInterface {
  annotation: AnnotationsInterface
}

function TodoItem({ annotation }: TodoItemInterface) {
  const [menu, setMenu] = useState<boolean>(false)

  return (
    <Item>
      <ItemHeader>
        <SubContent>
          <Checkbox checked={annotation.done === 1} idParam="done" />
          <TaskTitle done={annotation.done === 1}>{annotation.title}</TaskTitle>
        </SubContent>
        <SubContent>
          <TodoDate>{annotation.creation_date}</TodoDate>
          <TodoMenu onClick={() => setMenu(!menu)}>
            <Icon icon="IconSeeMore" />
            {menu && <AnnotationMenu annotation={annotation} />}
          </TodoMenu>
        </SubContent>
      </ItemHeader>
      <Description done={annotation.done === 1}>
        {annotation.description}
      </Description>
    </Item>
  )
}

export default TodoItem
