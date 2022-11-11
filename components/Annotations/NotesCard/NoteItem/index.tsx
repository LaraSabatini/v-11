import React, { useState } from "react"
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

interface NoteItemInterface {
  annotation: AnnotationsInterface
}

function NoteItem({ annotation }: NoteItemInterface) {
  const [menu, setMenu] = useState<boolean>(false)

  return (
    <Item>
      <ItemHeader>
        <SubContent>
          <TaskTitle>{annotation.title}</TaskTitle>
        </SubContent>
        <SubContent>
          <TodoDate>{annotation.creation_date}</TodoDate>
          <TodoMenu onClick={() => setMenu(!menu)}>
            <Icon icon="IconSeeMore" />
            {menu && <AnnotationMenu annotation={annotation} />}
          </TodoMenu>
        </SubContent>
      </ItemHeader>
      <Description>{annotation.description}</Description>
    </Item>
  )
}

export default NoteItem
