import getDayOfWeek from "../getDayOfTheWeek"

describe("getDayOfWeek", () => {
  it("Returns the days of the week", () => {
    const week = 45
    const year = 2022

    const expectedOutcome = [
      new Date("2022-11-07T03:00:00.000Z"),
      new Date("2022-11-08T03:00:00.000Z"),
      new Date("2022-11-09T03:00:00.000Z"),
      new Date("2022-11-10T03:00:00.000Z"),
      new Date("2022-11-11T03:00:00.000Z"),
    ]

    expect(getDayOfWeek(week, year)).toEqual(
      expect.arrayContaining(expectedOutcome),
    )
  })
})
