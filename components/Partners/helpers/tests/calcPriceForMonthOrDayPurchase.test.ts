import calcPriceMonthOrDay from "../calcPriceForMonthOrDayPurchase"
import prices from "../../../../tests/mockData/prices"

describe("calcPriceMonthOrDay", () => {
  describe("Returns the price for day in cash", () => {
    const paymentMethodSelectedMock = 1

    it("Returns the price for 8 days in cash", () => {
      const paidTimeUnitMock = 1
      const paidTimeMock = 8

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(5000)
    })

    it("Returns the price for 4 days in cash", () => {
      const paidTimeUnitMock = 1
      const paidTimeMock = 4

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(2800)
    })

    it("Returns the price for other than 4/8 days in cash", () => {
      const paidTimeUnitMock = 1
      const paidTimeMock = 6

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(4800)
    })
  })

  describe("Returns the price for day in digital payment", () => {
    const paymentMethodSelectedMock = 2

    it("Returns the price for 8 days in digital payment", () => {
      const paidTimeUnitMock = 1
      const paidTimeMock = 8

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(6000)
    })

    it("Returns the price for 4 days in digital payment", () => {
      const paidTimeUnitMock = 1
      const paidTimeMock = 4

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(3200)
    })

    it("Returns the price for other than 4/8 days in digital payment", () => {
      const paidTimeUnitMock = 1
      const paidTimeMock = 6

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(5400)
    })
  })

  describe("Returns the price for day in cash", () => {
    it("Returns the price for 1 month in cash", () => {
      const paymentMethodSelectedMock = 1
      const paidTimeUnitMock = 2
      const paidTimeMock = 1

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(7000)
    })

    it("Returns the price for 1 month in digital payment", () => {
      const paymentMethodSelectedMock = 2
      const paidTimeUnitMock = 2
      const paidTimeMock = 1

      expect(
        calcPriceMonthOrDay(
          paidTimeUnitMock,
          paidTimeMock,
          paymentMethodSelectedMock,
          prices.data,
        ),
      ).toEqual(8000)
    })
  })

  // it("Returns the price for day in cash", () => {
  //   const paidTimeUnitMock = 1
  //   const paidTimeMock = 1
  //   const paymentMethodSelectedMock = 1

  //   expect(
  //     calcPriceMonthOrDay(
  //       paidTimeUnitMock,
  //       paidTimeMock,
  //       paymentMethodSelectedMock,
  //       prices.data,
  //     ),
  //   ).toEqual(800)
  // })

  // it("Returns the price for day in digitalPayment", () => {
  //   const paidTimeUnitMock = 1
  //   const paidTimeMock = 1
  //   const paymentMethodSelectedMock = 2

  //   expect(
  //     calcPriceMonthOrDay(
  //       paidTimeUnitMock,
  //       paidTimeMock,
  //       paymentMethodSelectedMock,
  //       prices.data,
  //     ),
  //   ).toEqual(900)
  // })

  // it("Returns the price for days", () => {
  //   const paidTimeUnitMock = 1
  //   const paidTimeMock = 4
  //   const paymentMethodSelectedMock = 1

  //   expect(
  //     calcPriceMonthOrDay(
  //       paidTimeUnitMock,
  //       paidTimeMock,
  //       paymentMethodSelectedMock,
  //       prices.data,
  //     ),
  //   ).toEqual(2800)
  // })

  // it("Returns the price for days in digital payment", () => {
  //   const paidTimeUnitMock = 1
  //   const paidTimeMock = 4
  //   const paymentMethodSelectedMock = 2

  //   expect(
  //     calcPriceMonthOrDay(
  //       paidTimeUnitMock,
  //       paidTimeMock,
  //       paymentMethodSelectedMock,
  //       prices.data,
  //     ),
  //   ).toEqual(3200)
  // })

  // it("Returns the price for month", () => {
  //   const paidTimeUnitMock = 2
  //   const paidTimeMock = 1
  //   const paymentMethodSelectedMock = 1

  //   expect(
  //     calcPriceMonthOrDay(
  //       paidTimeUnitMock,
  //       paidTimeMock,
  //       paymentMethodSelectedMock,
  //       prices.data,
  //     ),
  //   ).toEqual(7000)
  // })
})
