import React, { useState, useRef, useContext } from "react"
import { createBrand } from "services/Store/brands.service"
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import { cleanPartnerData } from "utils"
import ModalForm from "components/UI/ModalForm"
import TextField from "components/UI/TextField"

interface CreateBrandFormInterface {
  cancelCreate: (arg?: any) => void
}

function CreateBrandForm({ cancelCreate }: CreateBrandFormInterface) {
  const {
    setModalSuccess,
    setModalError,
    updateData,
    setUpdateData,
  } = useContext(StoreContext)

  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [brandName, setBrandName] = useState<string>("")

  const brandRef = useRef(null)

  const handleCreate = async (e: any) => {
    e.preventDefault()

    if (brandName !== "") {
      setDisabledButton(true)

      const cleanedName = cleanPartnerData(brandName)
      const create = await createBrand({ id: 0, name: cleanedName })

      if (create.status === 200) {
        setUpdateData(updateData + 1)
        setModalSuccess(create.message)
        setDisabledButton(false)
      } else {
        setModalError(create.message)
        setDisabledButton(false)
      }
    } else {
      await brandRef.current?.focus()
    }
  }

  return (
    <ModalForm
      title={storeTexts.createBrand}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.create}
      submit={handleCreate}
      cancelFunction={cancelCreate}
      disabledButton={disabledButton}
    >
      <div>
        <TextField
          value={brandName}
          required
          width={250}
          label={storeTexts.brand}
          type="text"
          onChange={e => setBrandName(e.target.value)}
          reference={brandRef}
        />
      </div>
    </ModalForm>
  )
}

export default CreateBrandForm
