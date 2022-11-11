import calcPriceMonthOrDay from "../calcPriceForMonthOrDayPurchase"
import prices from "../../../../tests/mockData/prices"

describe("calcPriceMonthOrDay", () => {
  it("Returns the price for day in cash", () => {
    const paidTimeUnitMock = 1
    const paidTimeMock = 1
    const paymentMethodSelectedMock = 1

    expect(
      calcPriceMonthOrDay(
        paidTimeUnitMock,
        paidTimeMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(800)
  })

  it("Returns the price for day in digitalPayment", () => {
    const paidTimeUnitMock = 1
    const paidTimeMock = 1
    const paymentMethodSelectedMock = 2

    expect(
      calcPriceMonthOrDay(
        paidTimeUnitMock,
        paidTimeMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(900)
  })

  it("Returns the price for days", () => {
    const paidTimeUnitMock = 1
    const paidTimeMock = 4
    const paymentMethodSelectedMock = 1

    expect(
      calcPriceMonthOrDay(
        paidTimeUnitMock,
        paidTimeMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(2800)
  })

  it("Returns the price for month", () => {
    const paidTimeUnitMock = 2
    const paidTimeMock = 1
    const paymentMethodSelectedMock = 1

    expect(
      calcPriceMonthOrDay(
        paidTimeUnitMock,
        paidTimeMock,
        paymentMethodSelectedMock,
        prices.data,
      ),
    ).toEqual(7000)
  })
})
