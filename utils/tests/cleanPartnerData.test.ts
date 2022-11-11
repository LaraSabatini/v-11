import { cleanPartnerData } from "../cleanPartnerData"

const result = "Juan"

describe("cleanPartnerData", () => {
  it("Returns a string formated in camelcase when lowercase", () => {
    const mockName = "juan"
    expect(cleanPartnerData(mockName)).toEqual(result)
  })

  it("Returns a string formated in camelcase when uppercase", () => {
    const mockName = "JUAN"
    expect(cleanPartnerData(mockName)).toEqual(result)
  })

  it("Returns a string formated in camelcase when random-case", () => {
    const mockName = "jUaN"
    expect(cleanPartnerData(mockName)).toEqual(result)
  })
})
