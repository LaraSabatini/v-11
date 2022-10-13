import React, { useContext } from "react"
// DATA STORAGE & TYPES
import generalTexts from "strings/general.json"
import { PartnersContext } from "contexts/Partners"
// COMPONENTS & STYLING
import { SectionsButtons, Section } from "./styles"

const SectionButtons = () => {
  const {
    hasChanges,
    setModalHasChanges,
    setSectionSelected,
    sectionSelected,
  } = useContext(PartnersContext)
  return (
    <SectionsButtons>
      <Section
        onClick={() => {
          if (hasChanges) {
            setModalHasChanges(true)
          } else {
            setSectionSelected({
              section: `${generalTexts.sections.home}`,
              id: 1,
            })
          }
        }}
        selected={sectionSelected.id === 1}
      >
        {generalTexts.sections.home}
      </Section>

      <Section
        onClick={() => {
          if (hasChanges) {
            setModalHasChanges(true)
          } else {
            setSectionSelected({ section: "Precios", id: 3 })
          }
        }}
        selected={sectionSelected.id === 3}
      >
        Precios
      </Section>
      {/* <Section
        onClick={() => {
          if (hasChanges) {
            setModalHasChanges(true)
          } else {
            setSectionSelected({ section: "Historial de pagos", id: 4 })
          }
        }}
        selected={sectionSelected.id === 4}
      >
        Historial de pagos
      </Section> */}
    </SectionsButtons>
  )
}

export default SectionButtons
