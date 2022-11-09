import React from "react"
// DATA STORAGE & TYPES
import PartnersProvider from "contexts/Partners"
import generalTexts from "strings/general.json"
import annotationTexts from "strings/annotations.json"
// COMPONENTS & STYLING
import Header from "components/UI/Header"
import {
  MainContainer,
  Content,
  HeadContent,
  Title,
} from "theme/globalComponentStyles"
import ToDosCard from "./ToDosCard"
import NotesCard from "./NotesCard"
import { CardsContainer } from "./styles"

function AnnotationsView() {
  return (
    <MainContainer>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Content>
        <HeadContent>
          <Title>
            {generalTexts.sections.annotations}
            <span>
              {" / "}
              {annotationTexts.notes}
            </span>
          </Title>
        </HeadContent>
        <CardsContainer>
          <ToDosCard />
          <NotesCard />
        </CardsContainer>
      </Content>
    </MainContainer>
  )
}

export default AnnotationsView