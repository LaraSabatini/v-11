import React, { useContext, useEffect, useState } from "react"
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import ListView from "./ListView"
import DetailsView from "./DetailsView"
import ListAndDetailContainer from "./styles"

interface PartnerPermits {
  permits: {
    update: boolean
    delete: boolean
    edit: boolean
    create: boolean
  }
}

function ClientData({ permits }: PartnerPermits) {
  const {
    currentPage,
    setCurrentPage,
    partners,
    setPartnerSelected,
    partnerSelected,
  } = useContext(PartnersContext)

  const [partnerInfo, setPartnerInfo] = useState<PartnerInterface>()

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setPartnerSelected(null)
    }
  }

  const goNext = () => {
    if (partners.length > 0) {
      setCurrentPage(currentPage + 1)
      setPartnerSelected(null)
    }
  }

  useEffect(() => {
    const searchPartner = partners.filter(
      (partner: PartnerInterface) => partner.id === partnerSelected,
    )
    setPartnerInfo(searchPartner[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerSelected])

  return (
    <ListAndDetailContainer>
      <ListView goPrev={goPrev} goNext={goNext} />

      {partnerSelected !== null ? (
        <DetailsView
          partnerInfo={partnerInfo}
          edit={permits[0].actions.edit}
          update={permits[0].actions.update}
          canDelete={permits[0].actions.delete}
        />
      ) : (
        <div style={{ width: "440px" }} />
      )}
    </ListAndDetailContainer>
  )
}

export default ClientData
