import prices from "../../../../tests/mockData/prices"
import calculatePriceWithDiscount from "../calculatePriceWithDiscount"

describe("calculatePriceWithDiscount", () => {
  it("Returns a price with a discount applied for 4 lessons in cash", () => {
    const amountOfLessonsMock = 4
    const paymentMethodSelectedMock = 1

    expect(
      calculatePriceWithDiscount(
        amountOfLessonsMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(2300)
  })

  it("Returns a price with a discount applied for 4 lessons in digital payment", () => {
    const amountOfLessonsMock = 8
    const paymentMethodSelectedMock = 1

    expect(
      calculatePriceWithDiscount(
        amountOfLessonsMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(3600)
  })
})
