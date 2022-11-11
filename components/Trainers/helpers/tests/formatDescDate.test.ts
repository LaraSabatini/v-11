import formatDescDate from "../formatDescDate"

describe("formatDescDate", () => {
  it("Returns the date formatted with slashes", () => {
    const date = "11/11/2022"
    expect(formatDescDate(date)).toMatch("2022-11-12")
  })
})
