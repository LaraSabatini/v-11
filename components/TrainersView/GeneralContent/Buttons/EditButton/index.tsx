import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import Icon from "components/UI/Assets/Icon"
import Button from "./styles"

interface Permits {
  edit: boolean
}

function EditButton({ edit }: Permits) {
  const { setEditLessonDateView, purchaseSelected } = useContext(Lessons)

  return (
    <Button
      disabled={purchaseSelected === null || !edit}
      onClick={() => {
        if (purchaseSelected !== null && edit) {
          setEditLessonDateView(true)
        }
      }}
    >
      <Icon icon="IconEdit" color="#fff" />
    </Button>
  )
}

export default EditButton
