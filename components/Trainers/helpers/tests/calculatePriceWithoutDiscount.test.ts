import prices from "../../../../tests/mockData/prices"
import calculatePriceWithoutDiscount from "../calculatePriceWithoutDiscount"

describe("calculatePriceWithoutDiscount", () => {
  describe("Returns a price with no discount applied for 4 lessons", () => {
    it("Returns price in cash", () => {
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

    it("Returns price in digital payment", () => {
      const amountOfLessonsMock = 4
      const paymentMethodSelectedMock = 2

      expect(
        calculatePriceWithoutDiscount(
          amountOfLessonsMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(6000)
    })
  })

  describe("Returns a price with no discount applied for 8 lessons", () => {
    it("Returns price in cash", () => {
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

    it("Returns price in digital payment", () => {
      const amountOfLessonsMock = 8
      const paymentMethodSelectedMock = 2

      expect(
        calculatePriceWithoutDiscount(
          amountOfLessonsMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(11000)
    })
  })

  describe("Returns a price with no discount applied for other lessons", () => {
    it("Returns price in cash", () => {
      const amountOfLessonsMock = 1
      const paymentMethodSelectedMock = 1

      expect(
        calculatePriceWithoutDiscount(
          amountOfLessonsMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(1500)
    })

    it("Returns price in digital payment", () => {
      const amountOfLessonsMock = 1
      const paymentMethodSelectedMock = 2

      expect(
        calculatePriceWithoutDiscount(
          amountOfLessonsMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(1700)
    })
  })

  // it("Returns a price with no discount applied for 4 lessons in digital payment", () => {
  //   const amountOfLessonsMock = 8
  //   const paymentMethodSelectedMock = 1

  //   expect(
  //     calculatePriceWithoutDiscount(
  //       amountOfLessonsMock,
  //       paymentMethodSelectedMock,
  //       prices.data,
  //     ),
  //   ).toEqual(10000)
  // })
})
