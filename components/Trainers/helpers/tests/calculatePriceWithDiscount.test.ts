import prices from "../../../../tests/mockData/prices"
import calculatePriceWithDiscount from "../calculatePriceWithDiscount"

describe("calculatePriceWithDiscount", () => {
  describe("Returns a price with a discount applied for 4 lessons", () => {
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
      const amountOfLessonsMock = 4
      const paymentMethodSelectedMock = 2

      expect(
        calculatePriceWithDiscount(
          amountOfLessonsMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(2400)
    })
  })

  it("Returns a price with a discount applied for 8 lessons in cash", () => {
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

  it("Returns a price with a discount applied for 8 lessons in digital payment", () => {
    const amountOfLessonsMock = 8
    const paymentMethodSelectedMock = 2

    expect(
      calculatePriceWithDiscount(
        amountOfLessonsMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(3800)
  })

  describe("Returns a price with a discount applied for other than 4 or 8 lessons", () => {
    it("Returns a price with a discount applied other than 4 or 8 lessons in cash", () => {
      const amountOfLessonsMock = 1
      const paymentMethodSelectedMock = 1

      expect(
        calculatePriceWithDiscount(
          amountOfLessonsMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(700)
    })

    it("Returns a price with a discount applied for other than 4 or 8 lessonss in digital payment", () => {
      const amountOfLessonsMock = 1
      const paymentMethodSelectedMock = 2

      expect(
        calculatePriceWithDiscount(
          amountOfLessonsMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(800)
    })
  })
})
