import React, { useState, useContext } from "react"
import { editAnnotation } from "services/Annotations/Annotations.service"
import Checkbox from "components/UI/Checkbox"
import { AnnotationsContext } from "contexts/Annotations"
import Icon from "components/UI/Assets/Icon"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"
import { day, month, year } from "const/time"
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
  const { setTriggerListUpdate, triggerListUpdate } = useContext(
    AnnotationsContext,
  )
  const [menu, setMenu] = useState<boolean>(false)

  const markAnnotationAsDone = async () => {
    const markDone = await editAnnotation({
      ...annotation,
      done: 1,
      done_date: `${day}-${month}-${year}`,
      done_by: parseInt(localStorage.getItem("id"), 10),
    })

    if (markDone.message === "Annotation updated successfully") {
      setTriggerListUpdate(triggerListUpdate + 1)
    }
  }

  return (
    <Item>
      <ItemHeader>
        <SubContent>
          <Checkbox
            onChange={markAnnotationAsDone}
            checked={annotation.done === 1}
            ownState
            idParam="done"
          />
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
