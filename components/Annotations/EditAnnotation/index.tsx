import React, { useContext, useEffect } from "react"
import ModalForm from "components/UI/ModalForm"
import { AnnotationsContext } from "contexts/Annotations"
import TextField from "components/UI/TextField"

interface EditAnnotationInterface {
  submitAction: () => void
  cancelAction: () => void
}

function EditAnnotation({
  submitAction,
  cancelAction,
}: EditAnnotationInterface) {
  const { annotationSelected, setNewAnnotation, newAnnotation } = useContext(
    AnnotationsContext,
  )

  useEffect(() => {
    setNewAnnotation(annotationSelected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalForm
      title={
        annotationSelected.type === "note" ? "Editar Nota" : "Editar Tarea"
      }
      cancelButtonContent="Cancelar"
      submitButtonContent="Editar"
      submit={submitAction}
      cancelFunction={cancelAction}
    >
      <>
        <TextField
          label="Titulo"
          required
          type="text"
          width={230}
          value={newAnnotation.title}
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
          value={newAnnotation.description}
          onChange={e =>
            setNewAnnotation({ ...newAnnotation, description: e.target.value })
          }
        />
      </>
    </ModalForm>
  )
}

export default EditAnnotation
