import prices from "../../../../tests/mockData/prices"
import calculatePriceWithoutDiscount from "../calculatePriceWithoutDiscount"

describe("calculatePriceWithoutDiscount", () => {
  it("Returns a price with a discount applied for 4 lessons in cash", () => {
    const amountOfLessonsMock = 4
    const paymentMethodSelectedMock = 1

    expect(
      calculatePriceWithoutDiscount(
        amountOfLessonsMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(5500)
  })

  it("Returns a price with a discount applied for 4 lessons in digital payment", () => {
    const amountOfLessonsMock = 8
    const paymentMethodSelectedMock = 1

    expect(
      calculatePriceWithoutDiscount(
        amountOfLessonsMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(10000)
  })
})
