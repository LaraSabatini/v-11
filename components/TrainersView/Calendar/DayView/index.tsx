import React from "react"
import ScrollView from "components/UI/ScrollView"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import { StudentsList, Scroll, LessonPurchased } from "./styles"

interface DayViewInterface {
  cleanedLessons: {
    am: ClasesPurchasedInterface[]
    pm: ClasesPurchasedInterface[]
  }
  purchaseSelected: ClasesPurchasedInterface
  selectPurchase: (arg: ClasesPurchasedInterface) => void
}

function DayView({
  cleanedLessons,
  purchaseSelected,
  selectPurchase,
}: DayViewInterface) {
  return (
    <>
      {Object.values(cleanedLessons).map(
        (lessonDay: ClasesPurchasedInterface[]) => (
          <StudentsList>
            <div>
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
            </div>
          </StudentsList>
        ),
      )}
    </>
  )
}

export default DayView
