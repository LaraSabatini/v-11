import formatCalendarDate from "../formatCalendarDate"

describe("formatCalendarDate", () => {
  it("Returns the date formatted with slashes", () => {
    const date = new Date("Thu Nov 10 2022 21:36:00 GMT-0300")
    expect(formatCalendarDate(date)).toMatch("10/11/2022")
  })
})
