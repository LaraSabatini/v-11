import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import Icon from "components/UI/Assets/Icon"
import Button from "./styles"

interface Permits {
  create: boolean
}

function CreateButton({ create }: Permits) {
  const { setCreateLessonPurchaseView } = useContext(Lessons)

  return (
    <Button
      disabledButton={!create}
      onClick={() => {
        if (create) {
          setCreateLessonPurchaseView(true)
        }
      }}
    >
      <Icon icon="IconAdd" color="#fff" />
    </Button>
  )
}

export default CreateButton
