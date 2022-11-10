import React, { useContext, useEffect } from "react"
import ModalForm from "components/UI/ModalForm"
import { AnnotationsContext } from "contexts/Annotations"
import TextField from "components/UI/TextField"

interface CreateAnnotationInterface {
  title: string
  type: "todo" | "note"
  submitAction: (arg?: any) => void
  cancelAction: () => void
}

function CreateAnnotation({
  title,
  submitAction,
  cancelAction,
  type,
}: CreateAnnotationInterface) {
  const {
    setNewAnnotation,
    newAnnotation,
    titleRef,
    descriptionRef,
  } = useContext(AnnotationsContext)

  useEffect(() => {
    setNewAnnotation({ ...newAnnotation, type })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalForm
      title={title}
      cancelButtonContent="Cancelar"
      submitButtonContent="Crear"
      submit={submitAction}
      cancelFunction={cancelAction}
    >
      <>
        <TextField
          label="Titulo"
          required
          type="text"
          width={230}
          reference={titleRef}
          onChange={e =>
            setNewAnnotation({ ...newAnnotation, title: e.target.value })
          }
        />
        <TextField
          label="Descripcion"
          max={200}
          required
          type="textarea"
          width={380}
          reference={descriptionRef}
          onChange={e =>
            setNewAnnotation({ ...newAnnotation, description: e.target.value })
          }
        />
      </>
    </ModalForm>
  )
}

export default CreateAnnotation
