import React from "react"
import ScrollView from "components/UI/ScrollView"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"

import {
  StudentsList,
  ScrollContainer,
  Scroll,
  LessonPurchased,
} from "../styles"

interface LessonPurchasedViewInterface {
  cleanedLessons: {
    am: ClasesPurchasedInterface[]
    pm: ClasesPurchasedInterface[]
  }
  purchaseSelected: ClasesPurchasedInterface
  selectPurchase: (arg: ClasesPurchasedInterface) => void
}

function LessonPurchasedView({
  cleanedLessons,
  purchaseSelected,
  selectPurchase,
}: LessonPurchasedViewInterface) {
  return (
    <>
      {Object.values(cleanedLessons).map(
        (lessonDay: ClasesPurchasedInterface[]) => (
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {lessonDay.map((lesson: ClasesPurchasedInterface) => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
        ),
      )}
    </>
  )
}

export default LessonPurchasedView
