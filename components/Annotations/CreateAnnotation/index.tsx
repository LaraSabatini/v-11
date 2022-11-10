import React, { useContext } from "react"
import ModalForm from "components/UI/ModalForm"
import { AnnotationsContext } from "contexts/Annotations"
import TextField from "components/UI/TextField"
import Autocomplete from "components/UI/Autocomplete"
import { annotationTypes } from "const/annotations"
import HorizontalContainer from "./styles"

interface CreateAnnotationInterface {
  submitAction: (arg?: any) => void
  cancelAction: () => void
}

function CreateAnnotation({
  submitAction,
  cancelAction,
}: CreateAnnotationInterface) {
  const {
    setNewAnnotation,
    newAnnotation,
    titleRef,
    descriptionRef,
    typeRef,
  } = useContext(AnnotationsContext)

  return (
    <ModalForm
      title="Crear Anotacion"
      cancelButtonContent="Cancelar"
      submitButtonContent="Crear"
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
          onChange={e =>
            setNewAnnotation({ ...newAnnotation, description: e.target.value })
          }
        />
      </>
    </ModalForm>
  )
}

export default CreateAnnotation
