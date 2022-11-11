import { evaluateFinalTime } from "../evaluateFinalTime"

describe("evaluateFinalTime", () => {
  it("Returns the complete number when uses day is false", () => {
    const paidTimeMock = 8
    const usesDay = false
    expect(evaluateFinalTime(paidTimeMock, usesDay)).toEqual(8)
  })

  it("Returns the number minus one when uses day is true", () => {
    const paidTimeMock = 8
    const usesDay = true
    expect(evaluateFinalTime(paidTimeMock, usesDay)).toEqual(7)
  })
})
