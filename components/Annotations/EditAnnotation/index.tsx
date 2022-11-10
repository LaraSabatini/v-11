import React, { useContext, useEffect } from "react"
import ModalForm from "components/UI/ModalForm"
import { AnnotationsContext } from "contexts/Annotations"
import TextField from "components/UI/TextField"
import Autocomplete from "components/UI/Autocomplete"
import { annotationTypes } from "const/annotations"
import HorizontalContainer from "../CreateAnnotation/styles"

interface EditAnnotationInterface {
  submitAction: () => void
  cancelAction: () => void
}

function EditAnnotation({
  submitAction,
  cancelAction,
}: EditAnnotationInterface) {
  const {
    annotationSelected,
    setNewAnnotation,
    newAnnotation,
    typeRef,
    titleRef,
    descriptionRef,
  } = useContext(AnnotationsContext)

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
        <HorizontalContainer>
          <TextField
            label="Titulo"
            required
            type="text"
            width={230}
            reference={titleRef}
            value={newAnnotation.title}
            onChange={e =>
              setNewAnnotation({ ...newAnnotation, title: e.target.value })
            }
          />
          <Autocomplete
            label="Tipo"
            required
            ref={typeRef}
            options={annotationTypes}
            width={140}
            onChangeProps={e =>
              setNewAnnotation({ ...newAnnotation, type: e.display_name })
            }
          />
        </HorizontalContainer>
        <TextField
          label="Descripcion"
          max={200}
          required
          type="textarea"
          width={380}
          reference={descriptionRef}
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
