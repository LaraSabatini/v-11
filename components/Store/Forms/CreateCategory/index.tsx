import React, { useState, useRef, useContext } from "react"
import { createCategory } from "services/Store/categories.service"
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import { cleanPartnerData } from "utils"
import generalTexts from "strings/general.json"
import ModalForm from "components/UI/ModalForm"
import TextField from "components/UI/TextField"

interface CreateCategoryFormInterface {
  cancelCreate: (arg?: any) => void
}

function CreateCategoryForm({ cancelCreate }: CreateCategoryFormInterface) {
  const {
    setModalSuccess,
    setModalError,
    updateData,
    setUpdateData,
  } = useContext(StoreContext)

  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [categoryName, setBrandName] = useState<string>("")

  const categoryRef = useRef(null)

  const handleCreate = async (e: any) => {
    e.preventDefault()

    if (categoryName !== "") {
      setDisabledButton(true)

      const cleanedName = cleanPartnerData(categoryName)
      const create = await createCategory({ id: 0, name: cleanedName })

      if (create.status === 200) {
        setUpdateData(updateData + 1)
        setModalSuccess(create.message)
        setDisabledButton(false)
      } else {
        setModalError(create.message)
        setDisabledButton(false)
      }
    } else {
      await categoryRef.current?.focus()
    }
  }

  return (
    <ModalForm
      title={storeTexts.createCategory}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.create}
      submit={handleCreate}
      cancelFunction={cancelCreate}
      disabledButton={disabledButton}
    >
      <div>
        <TextField
          value={categoryName}
          required
          width={250}
          label="Categoria"
          type="text"
          onChange={e => setBrandName(e.target.value)}
          reference={categoryRef}
        />
      </div>
    </ModalForm>
  )
}

export default CreateCategoryForm
