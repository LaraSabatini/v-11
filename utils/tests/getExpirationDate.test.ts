import { getExpirationDate } from "../getExpirationDate"

describe("getExpirationDate", () => {
  it("Returns the expiration date calculated with paid time", () => {
    const date = "10-11-2022"
    const paidTime = 1
    const comboSelected = null
    expect(getExpirationDate(date, paidTime, comboSelected)).toEqual(
      "10-12-2022",
    )
  })

  it("Returns the expiration date calculated with combo", () => {
    const date = "10-11-2022"
    const paidTime = 1
    const comboSelected = 1
    expect(getExpirationDate(date, paidTime, comboSelected)).toEqual(
      "10-12-2022",
    )
  })

  it("Returns the expiration date with 0 when needed", () => {
    const date = "09-11-2022"
    const paidTime = 1
    const comboSelected = null
    expect(getExpirationDate(date, paidTime, comboSelected)).toEqual(
      "09-12-2022",
    )
  })
})
