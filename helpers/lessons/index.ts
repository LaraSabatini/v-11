import {
  getLessonsByWeek,
  getLessonsByPartnerAndPaid,
  getLessonsByDateAndShift,
  createLessonPurchase,
  editLesson,
  deleteLessonPurchase,
} from "services/Trainers/LessonsPurchased.service"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"

export const getLessonsByWeekAction = async (weekNumberSelected: number) => {
  const getLessonData = await getLessonsByWeek(weekNumberSelected)

  return getLessonData.data
}

export const getLessonsByPartnerAndPaidAction = async (
  partnerId: number,
  paid: "SI" | "NO" | "",
) => {
  const getLessonData = await getLessonsByPartnerAndPaid(partnerId, paid)

  return getLessonData.data
}

export const getLessonsByDateAndShiftAction = async (
  date: string,
  shift: string,
) => {
  const getLessonData = await getLessonsByDateAndShift(date, shift)
  return getLessonData.data
}

export const createLessonPurchaseAction = async (
  body: ClasesPurchasedInterface,
) => {
  const createLesson = await createLessonPurchase(body)
  return createLesson.message
}

export const editLessonAction = async (body: ClasesPurchasedInterface) => {
  const handleEditLesson = await editLesson(body)
  return handleEditLesson.message === "Lesson purchase updated successfully"
}

export const deleteLessonAction = async (id: number) => {
  const handleDeleteLesson = await deleteLessonPurchase(id)
  return handleDeleteLesson.message === "purchase deleted successfully"
}
