import React, { useState, useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import deletePartner from "services/Partners/DeletePartner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import texts from "strings/partners.json"
import ModalAlert from "components/UI/ModalAlert"
import { PartnerData, Details, RemoveButton } from "./styles"

interface DetailViewInterface {
  partnerInfo: PartnerInterface
  createdBy: string
}

const DetailsView = ({ partnerInfo, createdBy }: DetailViewInterface) => {
  const { setModalSuccess, setModalError } = useContext(PartnersContext)

  const [safeModal, setSafeModal] = useState<boolean>(false)

  const deletePartnerFunction = async () => {
    const deletion = await deletePartner(partnerInfo.id)

    if (deletion.message === "Product deleted successfully") {
      // modal success
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: "Excelente!",
        content: "El socio se ha eliminado correctamente",
      })
    } else {
      // modal error
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: "UPS!",
        content:
          "Ha ocurrido un error al eliminar el socio, por favor intentalo nuevamente o comunicate con el admin.",
      })
    }
  }

  return (
    <Details>
      {safeModal && (
        <ModalAlert
          success={false}
          message={{
            status: "alert",
            icon: "IconExclamation",
            title: "Estas seguro de que deseas eliminar al cliente?",
            content:
              "Si lo eliminas se borraran todos los registros de la base de datos",
          }}
          closeModal={() => setSafeModal(false)}
          closeRefresh={() => setSafeModal(false)}
          mainButtonContent="Borrar"
          secondButtonContent="Cancelar"
          mainAction={deletePartnerFunction}
          isNotice
        />
      )}
      <PartnerData>
        <p>{texts.full_name}</p>
        {partnerInfo?.name} {partnerInfo?.last_name}
      </PartnerData>
      <PartnerData>
        <p>{texts.email}</p>
        {partnerInfo?.email === "" ? "-" : partnerInfo?.email}
      </PartnerData>
      <PartnerData>
        <p>N° de telefono:</p>
        {partnerInfo?.phone === "" ? "-" : partnerInfo?.phone}
      </PartnerData>
      <PartnerData>
        <p>{texts.identification}</p>
        {partnerInfo?.identification_number === ""
          ? "-"
          : partnerInfo?.identification_number}
      </PartnerData>
      <PartnerData>
        <p>{texts.member_since}</p>
        {partnerInfo?.membership_start_date}
      </PartnerData>
      <PartnerData>
        <p>{texts.created_by}</p>@{createdBy}
      </PartnerData>
      <PartnerData>
        <p>{texts.trainer}</p>
        {partnerInfo?.is_student === "NO"
          ? `${texts.not_trainer}`
          : "Guillermo"}
      </PartnerData>

      <RemoveButton type="button" onClick={() => setSafeModal(true)}>
        Eliminar
      </RemoveButton>
    </Details>
  )
}

export default DetailsView
