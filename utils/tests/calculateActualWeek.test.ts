import { calculateActualWeek } from "../calculateActualWeek"

describe("calculateActualWeek", () => {
  it("Returns the week number", () => {
    const date = new Date("Thu Nov 10 2022 21:36:00 GMT-0300")
    expect(calculateActualWeek(date)).toEqual(45)
  })
})
