import React, { useState } from "react"
import texts from "strings/store.json"
import Icon from "components/UI/Assets/Icon"
import Header from "components/UI/Header"
// import Product from "./Product"
import {
  Container,
  Content,
  Title,
  HeadContent,
  FiltersContainer,
  Select,
  Selector,
  Option,
  IconContainer,
  SectionsButtons,
  Section,
  // ProductsContainer,
} from "./styles"

function StoreView() {
  const [openTypeMenu, setOpenTypeMenu] = useState<boolean>(false)
  const [openBrandMenu, setOpenBrandMenu] = useState<boolean>(false)

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: `${texts.sells}`,
    id: 1,
  })

  return (
    <Container>
      <Header />
      <Content>
        <SectionsButtons>
          <Section
            onClick={() =>
              setSectionSelected({ section: `${texts.sells}`, id: 1 })
            }
            selected={sectionSelected.id === 1}
          >
            {texts.sells}
          </Section>
          <Section
            onClick={() =>
              setSectionSelected({ section: `${texts.purchases}`, id: 2 })
            }
            selected={sectionSelected.id === 2}
          >
            {texts.purchases}
          </Section>
          <Section
            onClick={() =>
              setSectionSelected({ section: `${texts.stock}`, id: 3 })
            }
            selected={sectionSelected.id === 3}
          >
            {texts.stock}
          </Section>
        </SectionsButtons>
        <HeadContent>
          <Title>
            {texts.title} <span> / {sectionSelected.section}</span>
          </Title>
          {sectionSelected.id === 1 && (
            <FiltersContainer>
              <Select
                onClick={() => {
                  setOpenTypeMenu(!openTypeMenu)
                  setOpenBrandMenu(false)
                }}
              >
                <p>
                  {texts.type}
                  <IconContainer>
                    <Icon icon="IconArrowLeft" />
                  </IconContainer>
                </p>
                {openTypeMenu && (
                  <Selector>
                    <Option>Bebidas</Option>
                    <Option>Magnesio</Option>
                    <Option>Zapatillas</Option>
                    <Option>Merch</Option>
                  </Selector>
                )}
              </Select>
              <Select
                onClick={() => {
                  setOpenBrandMenu(!openBrandMenu)
                  setOpenTypeMenu(false)
                }}
              >
                <p>
                  {texts.brand}
                  <IconContainer>
                    <Icon icon="IconArrowLeft" />
                  </IconContainer>
                </p>
                {openBrandMenu && (
                  <Selector>
                    <Option>Depende del tipo seleccionado</Option>
                  </Selector>
                )}
              </Select>
            </FiltersContainer>
          )}
        </HeadContent>
      </Content>
    </Container>
  )
}

export default StoreView
