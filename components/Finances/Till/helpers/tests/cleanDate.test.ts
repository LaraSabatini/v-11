import cleanDate from "../cleanDate"

describe("cleanDate", () => {
  it("Returns a string date separated with dashes", () => {
    const dateMock = "11/12/2022"
    expect(cleanDate(dateMock)).toEqual("11-12-2022")
  })
})
