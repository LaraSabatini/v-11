import cleanMargin from "../cleanMargin"

describe("cleanMargin", () => {
  it("Returns a string number with two decimals when nessesary", () => {
    const marginMock = ["4", "3333"]
    expect(cleanMargin(marginMock)).toEqual("4.33")
  })

  it("Returns a string number without decimals", () => {
    const marginMock = ["4"]
    expect(cleanMargin(marginMock)).toEqual("4")
  })
})
