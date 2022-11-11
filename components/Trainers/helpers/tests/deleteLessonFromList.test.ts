import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"
import deleteLessonFromList from "../deleteLessonFromList"

describe("deleteLessonFromList", () => {
  it("removes the lesson selected from a list of lessons", () => {
    const lessonMock = {
      id: 0,
      date: "10-11-2022",
      shift: "AM",
    }
    const lessonsMock: LessonsSelectedInterface[] = [
      {
        id: 0,
        date: "10-11-2022",
        shift: "AM",
      },
      {
        id: 1,
        date: "14-11-2022",
        shift: "AM",
      },
      {
        id: 2,
        date: "10-12-2022",
        shift: "AM",
      },
    ]

    expect(deleteLessonFromList(lessonMock, lessonsMock)).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          date: "14-11-2022",
          shift: "AM",
        },
        {
          id: 2,
          date: "10-12-2022",
          shift: "AM",
        },
      ]),
    )
  })
})
