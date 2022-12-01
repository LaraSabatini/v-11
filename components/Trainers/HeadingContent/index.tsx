import React from "react"
import { useRouter } from "next/router"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import Filters from "./Filters"
import { Title, Container } from "./styles"

function HeadingContent() {
  const router = useRouter()

  return (
    <Container>
      <Title>
        <div>
          {generalTexts.sections.trainers}
          <span>
            {" "}
            /{" "}
            {router.query.students === "true"
              ? `${trainerTexts.students}`
              : `${trainerTexts.calendar}`}
          </span>
        </div>
      </Title>
      <Filters routeIsStudents={router.query.students === "true"} />
    </Container>
  )
}

export default HeadingContent
