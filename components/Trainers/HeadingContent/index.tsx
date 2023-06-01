import React from "react"
import { useRouter } from "next/router"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import Filters from "./Filters"
import { Title, Divider } from "./styles"

function HeadingContent() {
  const router = useRouter()

  return (
    <div>
      <Title>
        <div>
          {generalTexts.sections.trainers} /{" "}
          <span>
            {router.query.agenda === "true" && "agenda"}
            {router.query.students === "true" &&
              `${trainerTexts.students.toLowerCase()}`}
            {router.query.calendar === "true" &&
              `${trainerTexts.calendar.toLowerCase()}`}
            {router.query.prices === "true" && "precios"}
          </span>
        </div>
      </Title>
      <Divider />
      <Filters routeIsStudents={router.query.students === "true"} />
    </div>
  )
}

export default HeadingContent
